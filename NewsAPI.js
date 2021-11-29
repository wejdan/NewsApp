class NewsAPI{
    constructor(){
        this.page=1;
        this.pageSize=5;
        this.key='8fd303713beb43499ec10b40309d341d';
        this.url='';
        this.proxy='http://afternoon-cove-82097.herokuapp.com/'
        this.url = '';
        this.results=0;
        this.numberOfPages=1;

    
    }
    fetchByCategory(cat,callback){
        this.url = 'https://newsapi.org/v2/top-headlines?category='+cat+'&pageSize='+this.pageSize+'&apiKey='+this.key;
        this.fetchNews(callback);
    
    }
    fetchByCountry(Country,callback){
        this.url = 'https://newsapi.org/v2/top-headlines?country='+Country+'&pageSize='+this.pageSize+'&apiKey='+this.key;
   
        this.fetchNews(callback);
    
    }
    fetchByWord(word,callback){
        this.url='https://newsapi.org/v2/everything?q='+word+'&pageSize='+this.pageSize+'&sortBy=popularity&apiKey='+this.key;
        this.fetchNews(callback);
    
    }
    
    GotoNextPage(callback){
        this.page=this.page+1;
        this.fetchNews(callback);
    
    }
    
    GotoPrevPage(callback){
        this.page=this.page-1;
        this.fetchNews(callback);
    
    }
    
    fetchNews(callback){
    
        var req = new Request(this.url+'&page='+this.page);
    
        fetch(req)
            .then(function(response) {
                callback(response);
            })
    
    }
    }