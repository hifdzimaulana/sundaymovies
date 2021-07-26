
// fetch with vanilla javascript
const searchbutton = document.querySelector('.search-button')
searchbutton.addEventListener('click', function() {
    
    const query = document.querySelector('.input-keyword').value;
    fetch(`http://www.omdbapi.com/?apikey=c8252c4f&s=${query}`)

        .then(response => {
            if (!response.ok) {
                document.querySelector('.error-page').innerHTML = errorJumbotron(response.status, response.statusText);
                throw new Error(response.statusText)
            } else {
                return response.json()
            }
        })
        .then(function(results) {
            let cards = ''

            // if movies is exist
            if (results.Response != "False"){
                const movies = results.Search;
                document.querySelector('.error-page').innerHTML = '';
                movies.forEach(element => cards += getCard(element));
                document.querySelector('.movies-container').innerHTML = cards;

                // detail button event listener
                const detailbutton = document.querySelectorAll('.modal-detail-button');
                detailbutton.forEach(button => {
                    button.addEventListener('click', function() {
                        fetch(`http://www.omdbapi.com/?apikey=c8252c4f&i=${this.dataset.imdbid}`)
                            .then(response => response.json())
                            .then(response => {
                                const modal_details = getMovieDetails(response)
                                document.querySelector('.modal-body').innerHTML = modal_details
                            })
                    })
                })
            }

            else {
                const jumbotron = errorJumbotron('Error!', `"${query}" is not found.`);
                document.querySelector('.error-page').innerHTML = jumbotron;
                throw new Error(results.Error)
            }
        });

})


function getCard(element) {
    return `<div class="col-md-4 my-5">
                <div class="card">
                    <img class="card-img-top" src="${element.Poster}" alt="${element.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${element.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${element.Year}</h6>
                        <p class="card-text"></p>
                        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${element.imdbID}">Details</a>
                    </div>
                </div>
            </div>`;
}

function getMovieDetails(element) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${element.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                        <li class="list-group-item"><h4>${element.Title}</h4></li>
                        <li class="list-group-item"><strong>Released : </strong>${element.Released}</li>
                        <li class="list-group-item"><strong>Duration : </strong>${element.Runtime}</li>
                        <li class="list-group-item"><strong>Genre : </strong>${element.Genre}</li>
                        <li class="list-group-item"><strong>Director : </strong>${element.Director}</li>
                        <li class="list-group-item"><strong>Writer : </strong>${element.Writer}</li>
                        <li class="list-group-item"><strong>Actors : </strong>${element.Actors}</li>
                        <li class="list-group-item"><strong>Synopsis : </strong><br>${element.Plot}</li>
                        <li class="list-group-item"><strong>IMDb : </strong>${element.imdbRating}/10</li>
                        <li class="list-group-item"><strong>Box Office : </strong>${element.BoxOffice || 'Unknown'}</li>
                        <li class="list-group-item"><strong>Production : </strong>${element.Production || 'Unknown'}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}

function errorJumbotron(header, message) {
    document.querySelector('.movies-container').innerHTML = '';
    return `<div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">${header}</h1>
                    <p class="lead">${message}</p>
                </div>
            </div>`;
}

new XMLHttpRequest().setRequestHeader