'use strict';
(function(){
	//DOM
	const app = document.getElementById('app');
	const appForm = document.getElementById('app-form');
	const appSelect = document.getElementById('app-select');
	const appRank = document.getElementById('app-rank');
	const check = document.getElementById('check');
	const loadingBars = document.querySelector('.equlizer');

	let appSelectVal;
	let appRankVal;

	let initURL;
	let requestURL;


	//Store
	function store(e){
		if (e.target.id === "app-name") {
			appSelectVal = e.target.value;
		} else {
			appRankVal = parseInt(e.target.value)
		}
		initURL = `http://localhost:4000/api/ninja?name=${appSelectVal}&rank=${appRankVal}`;
		requestURL = initURL;
	}

	//Fetch
	function fetching(e) {
		loadingBars.style.display = 'block';
		e.preventDefault();
		fetch(requestURL).then(data => data.json()).then(result => result.map(success)).catch(error);
	}


	//Checkbox 
	function checkbox() {
		if(this.checked){
			appSelect.setAttribute('disabled', 'disabled');
			appRank.setAttribute('disabled', 'disabled');
			requestURL = `http://localhost:4000/api/ninja`;
			appSelect.value = '';
			appRank.value = '';
			app.innerHTML = '';
		}else {
			appSelect.removeAttribute('disabled');
			appRank.removeAttribute('disabled');
			requestURL = initURL ;
			app.innerHTML = '';
		}
	}

	//Success
	function success(result) {
		loadingBars.style.display = 'none';
		app.style.padding = 0;
		app.innerHTML += `<li><span><strong>Name:</strong> ${result.name}</span>, <span><strong>Rank:</strong> ${result.rank}</span> <span class='${result.available} state' ></span></li>`
	}


	//Error
	function error(err) {
		loadingBars.style.display = 'none';
		app.style.padding = 0;
		app.innerHTML = `<li style="background-color: red;color: white">So Bad, you must engage the serve first heheh!</li>`
	}

	//Events
	appSelect.addEventListener('keyup', store);
	appRank.addEventListener('keyup', store);

	appForm.addEventListener('submit', fetching);
	check.addEventListener('click', checkbox)

})()