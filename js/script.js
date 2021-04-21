function initVue(){

    new Vue({

        el: '#app',

        data: {

            search: 'grande bellezza',

            movies: [],
            series: [],

            flags: ['it', 'en']
        },

        methods: {

            startSearch: function(){

                this.movies = [];

                // Movies API
                axios.get('https://api.themoviedb.org/3/search/movie', {

                    params: {
                        'api_key': '82c1ff6f50a1c9a2281be84e79f97059',
                        'query': this.search
                    }

                }).then(data => {

                    data.data.results.forEach(item => {
                        
                        item.actors = '';
                        
                        // Cast API
                        axios.get(`https://api.themoviedb.org/3/movie/${item.id}/credits`, {
                            
                            params: {
                                'api_key': '82c1ff6f50a1c9a2281be84e79f97059'
                            }

                        }).then(data => {
                            
                            for (let i = 0; i < data.data.cast.length && i < 5; i++){
                                
                                // console.log(data.data.cast[i].name);
                                item.actors += `${data.data.cast[i].name}, `
                            }
                            
                        });
                        
                        // console.log(this.movies);
                        this.movies.push(item);

                    });

                });


                this.series = [];

                // TV Series API
                axios.get('https://api.themoviedb.org/3/search/tv', {
                    
                    params: {
                        'api_key': '82c1ff6f50a1c9a2281be84e79f97059',
                        'query': this.search
                    }

                }).then(data => {

                    data.data.results.forEach(item => {

                        item.actors = '';
                        
                        // Cast API
                        axios.get(`https://api.themoviedb.org/3/tv/${item.id}/credits`, {
                            
                            params: {
                                'api_key': '82c1ff6f50a1c9a2281be84e79f97059'
                            }

                        }).then(data => {
                            
                            for (let i = 0; i < data.data.cast.length && i < 5; i++){
                                
                                // console.log(data.data.cast[i].name);
                                item.actors += `${data.data.cast[i].name}, `
                            }

                        })

                        // console.log(this.series);
                        this.series.push(item)

                    });
                });

            },

        },
        
        computed: {
            
            printMovies: function(){
                
                // Dove posso creare una funzione per automatizzare le flags?
                // È giusto mettere tutto in un unico ciclo?
                this.movies.forEach(item => {

                    this.flags.forEach(flag => {

                        if (item.original_language == flag){

                            item.flag = `img/${flag}.webp`
                        }
                    })

                    item.original_language = item.original_language.toUpperCase();
                    item.vote_average = Math.ceil(item.vote_average / 2);
                });         

                return this.movies
            },

            printSeries: function(){

                this.series.forEach(item => {

                    this.flags.forEach(flag => {

                        if (item.original_language == flag){

                            item.flag = `img/${flag}.webp`
                        }
                    })

                    item.original_language = item.original_language.toUpperCase();
                    item.vote_average = Math.ceil(item.vote_average / 2);
                })

                return this.series
            },

        },

        updated(){
            
            // console.log('updated');
        },
        
        mounted(){
            
            // console.log('mounted');
        }

    })
}

document.addEventListener('DOMContentLoaded', initVue)