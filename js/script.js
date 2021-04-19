function initVue(){

    new Vue ({

        el: '#app',

        data: {

            search: 'ritorno al futuro',
            searchResults: [],

            countries: [
                {
                    language: 'it',
                    flag: 'it.webp'
                },
                {
                    language: 'en',
                    flag: 'en.webp'
                },
            ],


        },

        methods: {

            printFlag: function(index){
                
                for (let i = 0; i < this.countries.length; i++){

                    if (this.searchResults[index].original_language == this.countries[i].language){

                        return `img/${this.countries[i].flag}`

                    }
                }
            }
            
        },

        mounted(){

            const startSearch = document.getElementById('start-search');
            startSearch.addEventListener('click', ()=>{

                this.searchResults = []

                axios.get('https://api.themoviedb.org/3/search/movie', {

                    params: {
                        'api_key': '82c1ff6f50a1c9a2281be84e79f97059',
                        'query': this.search
                    }

                }).then(data => {


                    for (let i = 0; i < data.data.results.length; i++){
                        
                        this.searchResults.push(data.data.results[i])
                    }

                    axios.get('https://api.themoviedb.org/3/search/tv', {
                        
                        params: {
                            'api_key': '82c1ff6f50a1c9a2281be84e79f97059',
                            'query': this.search
                        }
    
                    }).then(data => {
    
                        for (let i = 0; i < data.data.results.length; i++){
    
                            this.searchResults.push(data.data.results[i])
                        }
    
                    })
                });

                
            });

        }
    })
}

document.addEventListener('DOMContentLoaded', initVue) 




// Promise.all(axios.get('https://api.themoviedb.org/3/search/movie', {

//                         params: {
//                             'api_key': '82c1ff6f50a1c9a2281be84e79f97059',
//                             'query': this.search
//                         }
                    
//                     }),
//                     axios.get('https://api.themoviedb.org/3/search/tv', {
    
//                         params: {
//                             'api_key': '82c1ff6f50a1c9a2281be84e79f97059',
//                             'query': this.search
//                         }
//                     })

//                 ).then(data => console.log(data))