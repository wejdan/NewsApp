class WeatherAPI{
    constructor(){

        this.key='6881814ad3584df192a1f1605f1c21f9'
        this.city_id='108410'
    }

    fetchWeather(callback){
        var url='https://api.weatherbit.io/v2.0/current?city_id='+this.city_id+'&key='+this.key;
        console.log(url);
        var req = new Request(url);
        fetch(req)
.then(function(response) {

    callback(response);
})    



    }
}


