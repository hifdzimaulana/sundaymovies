$('.search-button').on('click', function() {

    $.ajax({
        url : `http://www.omdbapi.com/?apikey=c8252c4f&s=${$('.input-keyword').val()}`,
    
        success : results => {
            const movies = results.Search;
            if (movies != undefined) {
                let cards = '';
                movies.forEach(element => {
                    cards += getCards(element);
                })
                $('.movies-container').html(cards)
        
                // detail button click
                $('.modal-detail-button').on('click', function () {
                    $.ajax({
                        url : `http://www.omdbapi.com/?apikey=c8252c4f&i=${$(this).data('imdbid')}`,
                        success : element => {
                            const movie_details = getMovieDetails(element)
                            $('.modal-body').html(movie_details);
                        },
                        error : message => {
                            console.log(message);
                        }
                    })
                })
            } else {
                const jumbotron = errorJumbotron(`"${$('.input-keyword').val()}" is not found.`)
                $('.error-page').html(jumbotron)
            }
        },
    
        error : e => {
            const jumbotron = errorJumbotron(e)
            $('.error-page').html(jumbotron)
        }
    });

})


function getCards(element) {
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

function errorJumbotron(message) {
    return `<div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">Error!</h1>
                    <p class="lead">${message}</p>
                </div>
            </div>`;
}