// API The Movie Data Base
const API_KEY = 'api_key=333c22bc8c2af4460c103a6291a19f5e';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort+_by= popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

pegaFilmes(API_URL);

function pegaFilmes(url) {
    fetch(url).then(resposta => resposta.json()).then(data => {
        console.log(data.results)
        mostraFilme(data.results);
    })
}

function mostraFilme(data) {
    main.innerHTML = '';
    
    console.log(main)
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}"
                srcset="">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>${title}</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl);
    })
}

function getColor(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit',(e)=> {
    e.preventDefault();

    const searchTxt = search.value;

    if(searchTxt){
        pegaFilmes(SEARCH_URL + '&query=' + searchTxt)
    }else{
        pegaFilmes(API_URL);
    }
})