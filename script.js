const movideIds = [502356, 603692, 39514, 677179, 19995, 857, 405775, 4247, 315162, 12162]

get1.addEventListener('click', async () => {
    let num = document.getElementById("options").selectedIndex;
    let response = axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
            api_key: "a75766149f058c94cbde1356c3161786",
            include_adult: "false",
            query: getOption(),
        }
    });
    response = response.then((moviesData) => {  
    for (let movie of moviesData.data.results) {   
        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: {
            api_key: "a75766149f058c94cbde1356c3161786",
            append_to_response: "videos",
        }
        }).then((extraData) => {
            console.log(extraData)
            if (`${movie.id}` == movideIds[num]) {
                const img = document.getElementById('poster');
                const iframe = document.getElementById('trailer');
                const trailers = extraData.data.videos.results.filter((trailer) => trailer.type === "Trailer");
                let genre = "genre";

                for (let data of extraData.data.genres) {
                    genre = data.name;
                }

                iframe.src = `https://www.youtube.com/embed/${trailers.at(0).key}`
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                document.getElementById("title").innerHTML = `${movie.title}`;
                document.getElementById("ov_label").innerHTML = "Overview";
                document.getElementById("overview").innerHTML = `${movie.overview}`;
                document.getElementById("basicInfo").innerHTML = `Release Date: ${movie.release_date} | Popularity: ${movie.popularity} | Runtime: ${extraData.data.runtime} | Genre: ${genre}`;
                document.getElementById("info").innerHTML = `Tagline: ${extraData.data.tagline} | Budget: $${extraData.data.budget} | Revenue: $${extraData.data.revenue}`;
                document.getElementById("vote").innerHTML = `Vote Average: ${movie.vote_average} | Vote Count: ${movie.vote_count}`;
                document.getElementById("production").innerHTML = `Production Companies: ${extraData.data.production_companies[0].name}`;







            }
        });
    }
    });
});

function getOption() {
    for (let x = 0; x < 10; x++){
        if (document.getElementById("options").selectedIndex == x) {
            return document.getElementById("options").value
        } 
    }
};