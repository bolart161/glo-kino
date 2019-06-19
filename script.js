const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
	event.preventDefault();
	const searchText = document.querySelector('.form-control').value;
	if (searchText.trim() === '') {
		movie.innerHTML = "Упс, что-то пошло не так...";
		return;
	}

	const server = 'https://api.themoviedb.org/3/search/multi?api_key=fc80ddabdf82d0b07ef9f66b40290b39&language=ru&query=' + searchText;

	movie.innerHTML = "Загрузка...";

	fetch(server)
		.then((value) => {
			if (value.status !== 200) {
				return Promise.reject(value.status);
			}
			return value.json();
		})
		.then((output) => {
			let inner = '';
			output.results.forEach(function (item) {
				let nameItem = item.name || item.title,
					releaseDate = item.release_date || item.first_air_date || "Неизвестно",
					imgSrc = item.poster_path ? ("https://image.tmdb.org/t/p/w185" + item.poster_path) : "./assets/unknow.jpg",
					description = item.overview || "",
					rate = item.vote_average || "Неизвестно",
					href = "https://www.themoviedb.org/" + item.media_type + "/" + item.id;

				inner += `
					<div class="movie-item">
						<a href="${href}" target="_blank" class="movie-href">
							<img class="poster-film float-letf" src="${imgSrc}" alt=""/>
							<div style="text-align: right; width: 100%;">
								<span class="badge badge-dark" style="font-size: large">Rate: ${rate}</span>
							</div>
							<h4 class="text-left">${nameItem}</h4>
							<strong>(${releaseDate})</strong>
							<p>${description}</p>
						</a>
					</div>`;
			});
			if (inner !== '') {
				movie.innerHTML = inner;
			} else {
				movie.innerHTML = 'По вашему запросу ничего не найдено';
			}
			document.querySelector('.form-control').value = '';
		})
		.catch((reason) => {
			movie.innerHTML = 'Упс, что-то пошло не так...';
			console.error(reason);
		})
}

searchForm.addEventListener('submit', apiSearch);
