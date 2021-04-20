function initVue(){

    new Vue ({

        el: '#app',

        data: {

            search: 'ritorno al futuro',
            movies: [],
            series: [],

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

            printFlag: function(index, array){
                
                for (let i = 0; i < this.countries.length; i++){

                    if (array[index].original_language == this.countries[i].language){

                        return `img/${this.countries[i].flag}`
                    }
                }
            },

            getPoster: function(item, size){

                const path = `https://image.tmdb.org/t/p/${size}${item.poster_path}`
                return path
            },

            printVote: function(vote, index){

                const roundedVote = parseInt(Math.ceil(vote / 2));
                const stars = [];

                for (let i = 0; i < roundedVote; i++){
                    
                    stars.push(i);
                    
                }   
                
                console.log(stars, `index = ${index}`);
                return stars

            }
            
        },

        mounted(){

            const startSearch = document.getElementById('start-search');
            startSearch.addEventListener('click', ()=>{

                this.movies = []; // questa cosa qui serve davvero?
                this.series = [];

                axios.get('https://api.themoviedb.org/3/search/movie', {

                    params: {
                        'api_key': '82c1ff6f50a1c9a2281be84e79f97059',
                        'query': this.search
                    }

                }).then(data => {

                    data.data.results.forEach(item => { this.movies.push(item) })

                });
                
                axios.get('https://api.themoviedb.org/3/search/tv', {
                    
                    params: {
                        'api_key': '82c1ff6f50a1c9a2281be84e79f97059',
                        'query': this.search
                    }

                }).then(data => {

                    data.data.results.forEach(item => { this.series.push(item) })
                })

                // this.printVote(7.85)
                
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