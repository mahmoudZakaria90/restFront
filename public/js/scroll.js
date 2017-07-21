'use strict';
(function(){
	//DOM
	const app = document.getElementById('app');
	const appForm = document.getElementById('app-form');
	const loadingBars = document.querySelector('.equlizer');

	let size = 0;
	let offset = 0;
	let requestURL;

	function calcSize(i) {
		return i * 10;
	}

	function calcOffset() {
		return offset * 10;
	}

	function calcScroll() {
		let bodyHeight = app.offsetHeight;
		let offset = window.pageYOffset + window.innerHeight
		if(offset >= bodyHeight){
			return fetching();
		}
		console.log(offset)
		console.log(bodyHeight)
	}


	//Fetch
	function fetching() {
		size++
		requestURL = `http://localhost:4000/api/one?size=${calcSize(size)}&offset=${calcOffset()}`;
		offset++;	
		console.log(requestURL);
		loadingBars.style.display = 'block';
		fetch(requestURL).then(data => data.json()).then(result => result.map(success)).catch(error);
	}


	//Success
	function success(result, i, arr) {
		console.log(arr.length)
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
	window.addEventListener('load', fetching);
	window.addEventListener('scroll', calcScroll)


})()