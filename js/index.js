//using  TMDB
const API = "api_key=9b4f453b0310c8435d59f7e0153d3834";
const baseURL='https://api.themoviedb.org/3';
const firstAPI= baseURL+'/discover/movie?sort_by=popularity.desc&'+API; 
const imgURL='https://images.tmdb.org/t/p/w500'; 

const searchURL= baseURL+'/search/movie?'+API;

getMovies(firstAPI);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
       //console.log(data.results);
        showMovies(data.results);
    
    })
}

const main=document.getElementById("main");
const form =document.getElementById("form");
const  search= document.getElementById("search");

function showMovies(data){
    main.innerHTML=" ";
data.forEach(movie => {
    var {title,poster_path,vote_average,overview}=movie;
 vote_average =Math.round(vote_average * 10)/10;
    const movieElement=document.createElement('div');
    movieElement.classList.add('movie')
    movieElement.innerHTML=
    `    <img src="${imgURL+poster_path}" alt="image"> 
    <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getColor(vote_average)}">${vote_average}</span>
    </div> 
    <div class="overview">
    <h3>Overview</h3>
    ${overview}
    </div>
    `
    main.appendChild(movieElement);
});

}


form.addEventListener('submit',event=>{
    event.preventDefault(); 
    const searchString=search.value;
    if(searchString!=""){
        getMovies(searchURL+'&query='+searchString)
    }
    else{

    }
})
function getColor(vote){
if (vote>=8)
{
    return "green"
}
else if(vote>=5){
    return "orange"
}
else {
    return "red"
}
}