window.onload = function () {

	var arrayOfWorkers = [];
	var arrSalary = [];
	var numOfIndustry;
	var indOfWorkerChanged;
	var jsonStringOfArray = '';
	var arrayOfProps = [];
  
	var defaultArrayOfForm = ['Павел','Хапалюк','Александрович','мужской',25,2,10000,'Бел АЭС','машинист'];
  
	drawDefaultForm();
  
	//добавление объекта(персонажа)
	document.getElementById('addPerson').onclick = function () {
	  document.getElementById('myForm').style.display='block'
	  document.getElementById('addPerson').style.display='none'
	  document.getElementById('table').style.display='none'
	  document.getElementById('button-submit').style.display='block'
	}
  
	//выбор определенного типа организации(компании)
	$('#myForm input').on('change', function() {
	  if($('input[name=radioName]:checked', '#myForm').val() === '1'){
		numOfIndustry = 1;
		document.getElementById("name-org").innerHTML='Название индустриальной организации';
	  }
	  else{
		numOfIndustry = 2;
		document.getElementById("name-org").innerHTML='Название транспортной организации';
	  }
	});
  
	//форма 
	$('#myForm').submit(function(event){
  
	  if(this.checkValidity())
	  {
		//отображение нужных элементов
		document.getElementById('addPerson').style.display='block'
		document.getElementById('table').style.display='table'
		document.getElementById('myForm').style.display='none'
  
		var masOfParametrs = [];
		var typeOrganization = "";
  
		var name = document.getElementsByTagName("input")[0].value;
		var surname = document.getElementsByTagName("input")[1].value;
		var patronymic = document.getElementsByTagName("input")[2].value;
		var sex = document.getElementsByTagName("input")[3].value;
		var age = document.getElementsByTagName("input")[4].value;
		var experience = document.getElementsByTagName("input")[5].value;
		var salary = document.getElementsByTagName("input")[6].value;
		var organization = document.getElementsByTagName("input")[9].value;
		var position = document.getElementsByTagName("input")[10].value;
  		
  		
		if(numOfIndustry == 1){
		  typeOrganization = "Индустриальная";
		}
		else{
		  typeOrganization = "Транспортная";
		}
  
		//проверка есть ли кнопка редактирования тогда новый объект не создаем, а применяем сеттеры
		if(document.getElementById('button-edit').style.display == 'block') {
  
		  document.getElementById('button-edit').style.display='none'
  
		
		  arrayOfWorkers[indOfWorkerChanged].setParameters(organization, position);
		  arrayOfWorkers[indOfWorkerChanged].setWorkerParameters(name, surname, patronymic, sex, age, experience, salary);
  
		  masOfParametrs.push(name, surname, age, position, typeOrganization);
  
		  updateTable(masOfParametrs, indOfWorkerChanged + 1);
		}
		// иначе создание нового
		else{
			//создание рабочего(объекта)
		  var workerOfTransportCompany = new TransportWorker(name, surname, patronymic, sex, age, experience, salary, organization, position);
		  arrayOfWorkers.push(workerOfTransportCompany);
		  masOfParametrs.push(name, surname, age, position, typeOrganization, organization); //*Изменил, чтобы корректно отображалась информация
		  console.log(arrayOfWorkers);
		  drawTable(masOfParametrs, arrayOfWorkers.length);
		  serializationJSON();
		}
	  }
	});
  
	// обновление таблицы
	function updateTable(masOfParametrs, numOfRow) {
	  var tr = document.getElementById('tr'+numOfRow);
  
	  for (var i = 0; i < masOfParametrs.length; i++) {
		tr.getElementsByTagName('td').item(i).innerText = masOfParametrs[i];
	  }
	}
  
	//отрисовка таблицы
	function drawTable(masOfParametrs, numId) {
  
	  var table = document.getElementById('table');
	  var tr = document.createElement('tr');
	  tr.id = 'tr' + numId;  //создание ID
  	  var i = 0;
	  for (i = 0; i < masOfParametrs.length + 2; i++){ //*Почему здесь i < .length +1 если можно сделать i<= .lenght просто?
		var td = document.createElement('td')  //создание td

		
		if(i == masOfParametrs.length){
  
		  var btnEdit = document.createElement("BUTTON");
		  var btnDel = document.createElement("BUTTON");
		  var btnOut = document.createElement("BUTTON");
  
		  btnEdit.className = 'edit';
		  btnDel.className = 'delete';
		  btnOut.className = 'output';
  
		  //создаем (формируем) ID для кнопок
		  btnEdit.id = 'edit' + numId;
		  btnDel.id = 'delete' + numId;
		  btnOut.id = 'output' + numId;
  
		  btnEdit.innerText = 'Редактировать';
		  btnDel.innerText = 'Удалить';
		  btnOut.innerText = 'Вывод';
  
		  td.appendChild(btnEdit);
		  td.appendChild(btnDel);
		  td.appendChild(btnOut);
  
		  tr.appendChild(td);
		  
		
		
		} else if (i == masOfParametrs.length+1){	
		//запись кнопки "подробнее"	
  			var btnMore = document.createElement("BUTTON");
  			var link = document.createElement("a");
  			link.id = 'link'+numId;
  			link.className = 'linkMore';
  			link.innerText = 'Подробнее';
  			link.href = 'page2.html';
  			link.target = '_blank';
  			btnMore.className = 'more';
  			btnMore.id = 'more'+numId;
  			btnMore.appendChild(link);
  			td.appendChild(btnMore);
  			tr.appendChild(td);
  			break;
  		} else {
  			//Запись текста в них
		td.innerHTML = masOfParametrs[i]; 
		tr.appendChild(td); 
		} 
  		 
  	   
	  }
  
	  table.appendChild(tr);
  
	  //Отслеживание клика по кнопкам(при нажатии)
	  eventClickedButton();
	}
  
  
	function eventClickedButton() {
  	  //кнопка подробнее
  	  $('.more').on('click', function(event) {
  	  	event.stopPropagation();
		event.stopImmediatePropagation();
		  var idLine = 'more' + event.target.id[4];
		  var numId = event.target.id[4] - 1;
		  console.log(arrayOfWorkers);
		  jsonStringOfArray = JSON.stringify(arrayOfWorkers[numId]);
		  var client = new XMLHttpRequest();
		  client.open("POST", "http://localhost:2403/worker", false);
		  client.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		  client.send(jsonStringOfArray);
  	  });

	  // Редактирование строки(edit)
	  $('.edit').on('click', function(event) {
  		document.querySelector('#table').style.display = 'none';
		//Отслежка(чтобы событие вызывалось не на все кнопки данного класса)
		event.stopPropagation();
		event.stopImmediatePropagation();
  
		// ID edit[1..2..3..4..5.....]
		var idLine = 'edit' + event.target.id[4];
		var numId = event.target.id[4] - 1;
  
		document.getElementById('myForm').style.display='block'
		document.getElementById('addPerson').style.display='none'
  
		// присваение значения рабочего в классы
		arrayOfPropsWorker = arrayOfWorkers[numId].getAllPropsOfWorker();
		arrayOfProps = arrayOfWorkers[numId].getProps();
  
		
		for(var i = 0; i < 6; i++){
		  document.getElementsByTagName("input")[i].value = arrayOfPropsWorker[i];
		}
		document.getElementsByTagName("input")[9].value = arrayOfWorkers[numId].getOrganization();
		document.getElementsByTagName("input")[10].value = arrayOfWorkers[numId].getPost();
  
		document.getElementById('button-submit').style.display='none';
		document.getElementById('button-edit').style.display='block';
  
		// ID 
		indOfWorkerChanged = numId;
	  });
  
  
	  //Вывод подробной информации
	  $('.output').on('click', function(event) {
  
		event.stopPropagation();
		event.stopImmediatePropagation();
  
		document.getElementById('table-output').style.display='table';
		document.getElementById('table').style.display='none';
  
		var idLine = 'output' + event.target.id[6];
		var indOfObject = event.target.id[6] - 1;
		console.log(event.target.id[6]);
  
		// создание массива из параметров рабочего для дальнейшего вывода в цикле
		arrayOfProps = arrayOfWorkers[indOfObject].getAllPropsOfWorker();
		arrayOfProps.push(arrayOfWorkers[indOfObject].getOrganization(), arrayOfWorkers[indOfObject].getPost());
  
		for(var i = 1; i < 10; i++){
		  document.getElementById('tr-'+i).getElementsByTagName('td').item(1).innerText = arrayOfProps[i-1];
		}
  
  
		// Отслежка по клику
		document.getElementById('button-table').onclick = function () {
		  document.getElementById('table-output').style.display='none';
		  document.getElementById('table').style.display='table';
		}
	  });
  
  
	  	//Удаление рабочего (доделать)
	  $('.delete').on('click', function(event) {
  
		event.stopPropagation();
		event.stopImmediatePropagation();
  
		var idLine = 'delete' + event.target.id[6]; //* почему именно 6??
		result = confirm('Вы действительно хотите удалить данного рабочего?');
		if (result == true) {
		document.querySelector('#table').removeChild(document.querySelector('#tr'+event.target.id[6]));}
		console.log(result);
  
	  });
	}
  
	function drawDefaultForm() {
	  for(var i = 0; i < 7; i++){
		document.getElementsByTagName("input")[i].value = defaultArrayOfForm[i];
	  }
	  document.getElementsByTagName("input")[9].value = defaultArrayOfForm[7];
	  document.getElementsByTagName("input")[10].value = defaultArrayOfForm[8];
	}
	/*DELETE*/ 
	
	function serializationJSON() {
	  jsonStringOfArray = JSON.stringify(arrayOfWorkers[0]);
	  console.log(jsonStringOfArray); 
	  console.log(arrayOfWorkers[0]);  
  }
  
  
  
  
  
  
  
  
  
  
  //Конструкторы классов
  
  function Worker(name, surname, patronymic, sex, age, experience, salary){
  	this.sex = sex;
	this.name = name;
	this.surname = surname;
	this.patronymic = patronymic;
	this.age = age;
	this.experience = experience;
	this.salary = salary;
  
	this.setWorkerParameters = function (name, surname, patronymic, sex, age, experience, salary) {
	  this.sex = sex;
	  this.name = name;
	  this.surname = surname;
	  this.patronymic = patronymic;
	  this.age = age;
	  this.experience = experience;
	  this.salary = salary;
	}
  
	this.getName = function () {
	  return this.name;
	}
   
	this.getSurname = function () {
		return this.surname;
	}

	this.getPatronymic = function () {
	  return this.patronymic;
	}
  
	this.getSex = function () {
		return this.sex;
	}

	this.getAge = function () {
	  return this.age;
	}
  
	this.getExperience = function () {
	  return this.experience;
	}
  
	this.getSalary = function () {
	  return this.salary
	}
  
	this.getAllPropsOfWorker = function () {
	  var arrayParams = [this.name, this.surname, this.patronymic, this.sex, this.age, this.experience, this.salary];
	  return arrayParams;
	}
  
  }
  
  function IndustryWorker(name, surname, patronymic, sex, age, experience, salary, nameIndustryOrganization, position) {
  
	Worker.apply(this, arguments); 
  
	this.nameIndustryOrganization = nameIndustryOrganization;
	this.position = position;
  
	this.setParameters = function (name, post) {
	  this.nameIndustryOrganization = name;
	  this.position = post;
	}
  
	this.getOrganization = function () {
	  return this.nameIndustryOrganization;
	}
  
	this.getPost = function () {
	  return this.position;
	}
  
	this.getProps = function () {
	  var array = [this.nameIndustryOrganization, this.position];
	  return array;
	}
  
  }
  
  function TransportWorker(name, surname, patronymic, sex, age, experience, salary, nameTransportOrganization, position) {
  
	Worker.apply(this, arguments); 
  
	this.nameTransportOrganization = nameTransportOrganization;
	this.position = position;
  
	this.setParameters = function (name, post) {
	  this.nameTransportOrganization = name;
	  this.position = post;
	}
  
	this.getOrganization = function () {
	  return this.nameTransportOrganization;
	}
  
	this.getPost = function () {
	  return this.position;
	}
  
	this.getProps = function () {
	  var array = [this.nameTransportOrganization, this.position];
	  return array;
	}
  }



 /*var arrayRowsAll = [];
 var arrRows = [];
 var arrTd = [];
function sortColumn(colNum,type) {
	var table = document.querySelector('#table');
	arrayRowsAll = table.children;
 	arrRows = table.querySelectorAll(':scope > tr');
 	function () {
 		for (var i=1; i < arrRows.length; i++) {
 			arrDbTd.push(arrRows[i]);
 		} break;
 	}
 	console.log(arrayRowsAll);
 
 	}*/





  
 /*function find(array,value) {
  	this.array = array;
  	this.value = value;
  	this.getResult = function () {
  	
  	
  	for (var i=0; i<array.length; i++) {
  		if (array[i] == value) {
  			return i;
  		} 
  		} return -1;

	}
  	}
 

  var arrayMusic = ['rap','rock','sex'];
  var myHome = ['comp', 'tv', 'phone','badroom','captur'];

var sexsex = new find(myHome,'phone');
sexsex.getResult();
var bad = new find(myHome, 'badroom');
console.log(bad.getResult());
*/
}