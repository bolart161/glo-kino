const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(e) {
	e.preventDefault();
	const searchText = document.querySelector('.form-control').value;
	if (searchText.trim() !== '') {
		const server = 'https://api.themoviedb.org/3/search/multi?api_key=fc80ddabdf82d0b07ef9f66b40290b39&language=ru&query=' + searchText;
		requestApi('GET', server);
	}
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
	const request = new XMLHttpRequest();
	request.open(method, url);
	request.send();

	request.addEventListener('readystatechange', () => {
		if (request.readyState !== 4) return;

		if (request.status !== 200) {
			console.log('error: ' + request.status);
			return;
		}

		const output = JSON.parse(request.responseText);

		let inner = '';
		output.results.forEach(function (item) {
			let nameItem = item.name || item.title,
			 releaseDate = item.release_date || item.first_air_date || "Неизвестно",
			 imgSrc = item.poster_path ? ("https://image.tmdb.org/t/p/w185" + item.poster_path) : "./assets/unknow.jpg",
			 description = item.overview,
			 rate = item.vote_average,
			 href = "https://www.themoviedb.org/" + item.media_type + "/" + item.id;

			inner += '<div class="movie-item">'
				+ '<a href="' + href + '" target="_blank" class="movie-href">'
				+ '<img class="poster-film float-letf" src="' + imgSrc + '"  alt=""/>'
				+ '<h4 class="text-left">' + nameItem + '</h4>'
				+ '<strong>(' + releaseDate + ')</strong>'
				+ '<p>' + description + '</p>'
				+ '<span class="badge badge-info" style="font-size: large">'+ rate +'</span>'
				+ '</a>'
				+ '</div>';
		});
		if (inner !== '') {
			movie.innerHTML = inner;
		}
		document.querySelector('.form-control').value = '';
	});

}
