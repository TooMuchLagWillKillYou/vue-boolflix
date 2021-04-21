function initVue(){

    new Vue({

        el: '#app',

        data: {

            search: 'matrix',

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

                    data.data.results.forEach(movie => {
                        
                        movie.actors = '';
                        
                        // Movies Cast API
                        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits`, {
                            
                            params: {
                                'api_key': '82c1ff6f50a1c9a2281be84e79f97059'
                            }

                        }).then(data => {
                            
                            for (let i = 0; i < data.data.cast.length && i < 5; i++){
                                
                                movie.actors += `${data.data.cast[i].name}, `
                            }
                            
                        });
                        
                        this.movies.push(movie);

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

                    data.data.results.forEach(serie => {

                        serie.actors = '';
                        
                        // TV Series Cast API
                        axios.get(`https://api.themoviedb.org/3/tv/${serie.id}/credits`, {
                            
                            params: {
                                'api_key': '82c1ff6f50a1c9a2281be84e79f97059'
                            }

                        }).then(data => {
                            
                            for (let i = 0; i < data.data.cast.length && i < 5; i++){
                                
                                serie.actors += `${data.data.cast[i].name}, `
                            }

                        })

                        this.series.push(serie)

                    });
                });



            },

        },
        
        computed: {
            
            printMovies: function(){
                
                // Dove posso creare una funzione per automatizzare le flags?
                // È giusto mettere tutto in un unico ciclo?
                this.movies.forEach(movie => {

                    this.flags.forEach(flag => {

                        if (movie.original_language == flag){

                            movie.flag = `img/${flag}.webp`
                        }
                    })

                    movie.original_language = movie.original_language.toUpperCase();
                    movie.vote_average = Math.ceil(movie.vote_average / 2);

                    // Movies ID API
                    axios.get('https://api.themoviedb.org/3/genre/movie/list', {

                        params: {
                            'api_key': '82c1ff6f50a1c9a2281be84e79f97059'
                        }
                        
                    }).then(data => {

                        movie.genre_names = '';

                        movie.genre_ids.forEach((id, i) => {

                            data.data.genres.forEach(genre =>{
                                
                                if (genre.id == id){
                                    
                                    movie.genre_ids.splice(i, 1, genre.name);
                                    movie.genre_names += `${movie.genre_ids[i]}, `;
                                }
                                
                            })
                        })
                    })

                });    
                

                return this.movies
            },

            printSeries: function(){

                this.series.forEach(serie => {

                    this.flags.forEach(flag => {

                        if (serie.original_language == flag){

                            serie.flag = `img/${flag}.webp`
                        }
                    })

                    serie.original_language = serie.original_language.toUpperCase();
                    serie.vote_average = Math.ceil(serie.vote_average / 2);

                    // TV Series ID API
                    axios.get('https://api.themoviedb.org/3/genre/tv/list', {

                        params: {
                            'api_key': '82c1ff6f50a1c9a2281be84e79f97059'
                        }
                        
                    }).then(data => {

                        serie.genre_names = '';

                        serie.genre_ids.forEach((id, i) => {

                            data.data.genres.forEach(genre =>{
                                
                                if (genre.id == id){
                                    
                                    serie.genre_ids.splice(i, 1, genre.name);
                                    serie.genre_names += `${serie.genre_ids[i]}, `
                                }
                                
                            })
                        })
                    })
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

// axios.get('https://api.themoviedb.org/3/genre/movie/list', {

//     params: {
//         'api_key': '82c1ff6f50a1c9a2281be84e79f97059'
//     }
    
// }).then(data => {
    
//     data.data.genres.forEach(genre =>{
        
//         movie.genre_ids.forEach(id => {

//             if (id == genre.id){
//                 id = genre.name
//             }
//         })
        
//     })
// })