const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(e) {
	e.preventDefault();
	const searchText = document.querySelector('.form-control').value,
	server = 'https://api.themoviedb.org/3/search/multi?api_key=fc80ddabdf82d0b07ef9f66b40290b39&language=ru&query=' + searchText;
	requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
	const request = new XMLHttpRequest();
	request.open(method, url);
	request.send();

	request.addEventListener('readystatechange', () => {
		if (request.readyState !== 4) return;

		if (request.status !== 200) {
			console.error('error: ' + request.status);
			return;
		}

		const output = JSON.parse(request.responseText);

		let inner = '';
		output.results.forEach(function (item) {
			let nameItem = item.name || item.title;
			let releaseDate = item.release_date || item.first_air_date;
			inner += '<li class="list-group-item d-flex justify-content-between align-items-center">' +  nameItem + '<span class="badge badge-primary badge-pill">'+ releaseDate + '</span>' + '</li>';
		});
		movie.innerHTML = inner;
	});

}
