/*window.onload = function() {



	
	var data  {"_sex":"мужской","_name":"Павел","_surname":"Хапалюк","_patronymic":"Александрович","_age":"25","_experience":"2","_salary":"10000","_nameTransportOrganization":"Бел АЭС","_position":"машинист"};
	let dataSan = ['Павел','Хапалюк','Александрович','мужксой','25','2','1100','БелАЭС','машинист'];
	console.log(data)
	let trAll = document.querySelectorAll('tr');
	console.log(trAll);
	var i = 0;
	for (i = 0; i < trAll.length; i++) {
		let td = document.createElement('td');
		td.id = 'td'+(i+1);
		trAll[i].appendChild(td);
		let tdAll = document.querySelectorAll('td');
		let arrrr = [data.name, data.surname, data.patronymic, data.sex, data.age, data.experience, data.salary, data.nameTransportOrganization, data.position];
		if (i < trAll.length) {
		tdAll[i].innerHTML = arrrr[i];		
	    } else {
	    	break;
	    };
	}
	
	
	
}*/

window.onload = function() {
	
var request = new XMLHttpRequest();
request.open('GET','http://localhost:2403/worker');
request.onload = function() {
	var ourData = request.responseText;
	ourData = JSON.parse(ourData);
	console.log(ourData[0]);
	renderHTML(ourData[ourData.length-1]);
};
request.send();

function renderHTML(data) {
	let trAll = document.querySelectorAll('tr');
	var i = 0;
	for (i = 0; i < trAll.length; i++) {
		let td = document.createElement('td');
		td.id = 'td'+(i+1);
		trAll[i].appendChild(td);
		let tdAll = document.querySelectorAll('td');
		let arrrr = [data.name, data.surname, data.patronymic, data.sex, data.age, data.experience, data.salary, data.nameTransportOrganization, data.position];
		if (i < trAll.length) {
		tdAll[i].innerHTML = arrrr[i];		
	    } else {
	    	break;
	    };
	}
};

};