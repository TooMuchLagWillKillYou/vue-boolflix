function initVue(){

    new Vue({

        el: '#app',

        data: {

            search: 'ritorno al futuro',

            movies: [],
            series: [],

            flags: ['it', 'en']
        },

        methods: {

            startSearch: function(){

                this.movies = [];
                this.series = [];

                axios.get('https://api.themoviedb.org/3/search/movie', {

                    params: {
                        'api_key': '82c1ff6f50a1c9a2281be84e79f97059',
                        'query': this.search
                    }

                }).then(data => {

                    data.data.results.forEach(item => { this.movies.push(item) });
                    // console.log(this.movies);
                    
                });
                
                axios.get('https://api.themoviedb.org/3/search/tv', {
                    
                    params: {
                        'api_key': '82c1ff6f50a1c9a2281be84e79f97059',
                        'query': this.search
                    }

                }).then(data => {

                    data.data.results.forEach(item => { this.series.push(item) });
                    // console.log(this.series);

                });

            },

        },
        
        computed: {
            
            printMovies: function(){
                
                // Dove posso creare una funzione per automatizzare le flags?
                this.movies.forEach(item => {

                    this.flags.forEach(flag => {

                        if (item.original_language == flag){

                            item.flag = `img/${flag}.webp`
                        }
                    })
                })
                
                return this.movies
            },

            printSeries: function(){

                this.series.forEach(item => {

                    this.flags.forEach(flag => {

                        if (item.original_language == flag){

                            item.flag = `img/${flag}.webp`
                        }
                    })
                })

                return this.series
            },

        },

        updated(){
            console.log('updated');
            
        },
        
        mounted(){
            // console.log('mounted');

        }

    })
}

document.addEventListener('DOMContentLoaded', initVue)