'use strict';
(function(){
	//DOM
	const app = document.getElementById('app');
	const appForm = document.getElementById('app-form');
	const appSelect = document.getElementById('app-select');
	const loadingBars = document.querySelector('.equlizer');

	let appSelectVal;
	let requestURL;


	//Store
	function store(e){
		appSelectVal = e.target.value;
		requestURL = `http://localhost:4000/api/ninja?available=${appSelectVal}`;
	}

	//Fetch
	function fetching(e) {
		app.innerHTML = '';
		loadingBars.style.display = 'block';
		e.preventDefault();
		fetch(requestURL).then(data => data.json()).then(result => result.map(success)).catch(error);
	}


	//Success
	function success(result) {
		console.log(result)
		loadingBars.style.display = 'none';
		app.style.padding = 0;
		app.innerHTML += `<li><span><strong>Name:</strong> ${result.name}</span> <span><strong>Rank:</strong> ${result.rank}</span> <span class='${result.available} state' ></span></li>`
	}


	//Error
	function error(err) {
		loadingBars.style.display = 'none';
		app.style.padding = 0;
		app.innerHTML = `<li style="background-color: red;color: white">So Bad, you must engage the serve first heheh!</li>`
	}

	//Events
	appSelect.addEventListener('change', store);
	appForm.addEventListener('submit', fetching);


})()