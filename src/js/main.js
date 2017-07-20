'use strict';
(function(){
	//DOM
	const app = document.getElementById('app');
	const appForm = document.getElementById('app-form');
	const appName = document.getElementById('app-name');
	const appRank = document.getElementById('app-rank');
	const check = document.getElementById('check');
	const loadingBars = document.querySelector('.equlizer');

	let appNameVal;
	let appRankVal;

	let initURL;
	let requestURL;


	//Store
	function store(e){
		if (e.target.id === "app-name") {
			appNameVal = e.target.value;
		} else {
			appRankVal = parseInt(e.target.value)
		}
		initURL = `http://localhost:4000/api/ninja?name=${appNameVal}&rank=${appRankVal}`;
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
			appName.setAttribute('disabled', 'disabled');
			appRank.setAttribute('disabled', 'disabled');
			requestURL = `http://localhost:4000/api/ninja`;
			appName.value = '';
			appRank.value = '';
			app.innerHTML = '';
		}else {
			appName.removeAttribute('disabled');
			appRank.removeAttribute('disabled');
			requestURL = initURL ;
			app.innerHTML = '';
		}
	}

	//Success
	function success(result) {
		loadingBars.style.display = 'none';
		app.innerHTML += `<li><span><strong>Name:</strong> ${result.name}</span>, <span><strong>Rank:</strong> ${result.rank}</span> <span class='${result.available} state' ></span></li>`
	}


	//Error
	function error(err) {
		app.innerHTML = `<li style="background-color: red">So Bad, heheh!</li>`
	}

	//Events
	appName.addEventListener('keyup', store);
	appRank.addEventListener('keyup', store);

	appForm.addEventListener('submit', fetching);
	check.addEventListener('click', checkbox)

})()