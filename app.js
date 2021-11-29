let News= new NewsAPI();
let Weather=new WeatherAPI();



function populateCountry(){
    let select_city_menu=document.querySelector('.select-country .menu');
    let html='';
    for (let index = 0; index < country.length; index++) {
        const element = country[index];
       html=html+`<option id="co" class="item" data-value="${element['id'].toLowerCase()}">${element['name']}</option>`;


 
        
    }
    select_city_menu.innerHTML=html

}

function populateCity(){
    let select_city_menu=document.querySelector('.select-city .menu');
    let html='';
    for (let index = 0; index < cities.length; index++) {
        const element = cities[index];

        html=html+`<option id="city" class="item" data-value="${element['id']}">${element['name']}</option>`;


  

        
    }
    select_city_menu.innerHTML=html

}
$(function() {
    $('.select-country').dropdown({   
         onChange: function (val) {
    
        loading();
        News.page=1;
        document.querySelector('#searchWord').value='';

        News.fetchByCountry(val,renderNews);
    }});
});


$(function() {
    $('.select-city').dropdown({   
        });
});

function changeCityId(){
    weather_load();
    let City_id=$('.select-city').dropdown('get value');
    Weather.city_id=City_id;

    Weather.fetchWeather(renderWeather)

}
function weather_load(){

    $('.city-name').html('---');
    $('.weather-desc').html('');
    $('.weather-pic img').attr("src",``);
    $('.temp').html('--°');

    $('.wind-text').html("-- hm/wind");
    $('.precipitation-text').html('precipitation:');

}
function loading(){
    let loader=`      <div class="ui segment">
    <div class="ui active loader">
        
    </div>
    <p></p>
   </div>`;
   var newsitems=document.querySelector('.news-list');
   newsitems.innerHTML=loader;



}
async function renderWeather(response){
    if(response['statusText']=='OK'){


        let weatherCards=document.querySelectorAll('.weather');
        
        var result=await response.json();
        let weather_data=result['data'][0];
        console.log(weather_data);
       $('.city-name').html(weather_data['city_name']);
        $('.weather-desc').html(weather_data['weather']['description']);
        console.log(`https://www.weatherbit.io/static/img/icons/${weather_data['weather']['icon']}.png`);
        $('.weather-pic img').attr("src",`https://www.weatherbit.io/static/img/icons/${weather_data['weather']['icon']}.png`);
        $('.temp').html(weather_data['app_temp']+'°');

        $('.wind-text').html(weather_data['wind_spd']+" hm/wind");
        $('.precipitation-text').html('precipitation:'+weather_data['precip']);


 

    }
    
    

    

}
async function renderNews(response){
    var prev=document.querySelector('.prev-button');
    var next=document.querySelector('.next-button');

   var newsitems=document.querySelector('.news-list');
   var newsNav=document.querySelector('.news-nav');
   var result=await response.json();
   console.log(result);
   var totalResults=result['totalResults'];
   var  articles=result['articles']
   News.numberOfPages=Math.ceil(totalResults/News.pageSize) ;
    console.log(articles,News.page);
    console.log(totalResults);
    let html=``;
    
    
    for (let index = 0; index < articles.length; index++) {
        const element = articles[index];
        let author=element.author?element.author:'---';
        html=html+`<div class="news-item">
        <div class="news-img">
       <img src="${element.urlToImage}" alt="">
    
        </div>
        <div class="news-text">
            <div class="news-title">
               <a href='${element.url}' target="_blank" > <h2>${element.title}</h2></a>
            </div>
            <div class="news-paragraph">
            ${element.description}
            </div>
            <div class="news-author ">
            ${author}
              <div class="news-date">
              ${element.publishedAt}
                 </div>
            </div>
        </div>
    </div>`
        

        
        
    }
    if(News.page < News.numberOfPages){
        if(next.classList.contains('disabled')){
            next.classList.remove('disabled');
        }
        

    }else{
        if(!next.classList.contains('disabled')){
            next.classList.add('disabled');
        }


    }
    if(News.page!=1){
        if(prev.classList.contains('disabled')){
            prev.classList.remove('disabled');
        }

    }else{
        if(!prev.classList.contains('disabled')){
            prev.classList.add('disabled');
        }


    }

    newsitems.innerHTML=html;




}
function onCategoryClick(e){
    var cat = e.target.getAttribute("data-value");
    News.page=1;
    document.querySelector('#searchWord').value='';
    $('.select-country').dropdown('clear');

    loading();
    News.fetchByCategory(cat,renderNews);

    


}
function GoBack(){
    loading();
    News.GotoPrevPage(renderNews);
}

function GoNext(){
    loading();
    News.GotoNextPage(renderNews);

}
function onFormSubmit(e){
    e.preventDefault();
    var word=document.querySelector('#searchWord').value;
    if(word){
        News.page=1;
        loading();
        News.fetchByWord(word,renderNews);
        $('.select-country').dropdown('clear');
   
    }
    

}
function cityChange(e){
    $('.ui.mini.modal').modal({onApprove : function(){changeCityId()}})
    .modal('show')
  ;
}
function AddEventListeners(){
    var prev=document.querySelector('.prev-button');
    var next=document.querySelector('.next-button');
    var searchForm=document.querySelector('.search-form');
    var categorys = document.querySelectorAll('.category');
    var changeCity=document.querySelectorAll('.change-city');
    for (var i = 0; i < categorys.length; i++) {
        categorys[i].addEventListener('click', onCategoryClick);
    }

    searchForm.addEventListener('submit',onFormSubmit);
    prev.addEventListener('click',GoBack)
    next.addEventListener('click',GoNext)

    for (var i = 0; i < changeCity.length; i++) {
        changeCity[i].addEventListener('click', cityChange);
    }



}



AddEventListeners();
document.querySelector('#searchWord').value='';

populateCountry();
populateCity();



News.fetchByCountry('sa',renderNews);
Weather.fetchWeather(renderWeather);
$('.select-country').dropdown('refresh');
$('.select-country').dropdown("set selected", "sa");



$('.select-city').dropdown('refresh');
$('.select-city').dropdown("set selected", "108410");

