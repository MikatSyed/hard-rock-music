const handleSearchSong = ()=>{
    const searchSong = document.getElementById('search-input').value;
    //load data
    // toggleSpinner(true);
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchSong}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6b16b0d3bemshc23d50ca0c04dbbp135a19jsn43386888765f",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })

    .then(response => response.json())
    .then(data => displaySong(data.data))

    .catch(err => {
        console.error(err);
    });
}


const displaySong = songs =>{
    console.log(songs);
    const songContainer = document.getElementById('song-container')
    songContainer.className = 'search-result col-md-8 mx-auto py-4'

   songs.forEach(song =>{
   const songDiv = document.createElement('div');
   songDiv.innerHTML = `
   <div class="single-result row align-items-center my-3 p-3">
   <div class="col-md-9">
       <h3 class="lyrics-name">${song.title}</h3>
       <p class="author lead">Album by <span>${song.artist.name}</span></p>
       <audio controls>
       <source src="${song.preview}" type="audio/mpeg">
       </audio>
   </div>
   <div class="col-md-3 text-md-right text-center">
       <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
   </div>
</div> `
   songContainer.appendChild(songDiv);
//    toggleSpinner(false);
       
   
   })
}

//load lyrics data
const getLyrics = (artist,title)=>{
    console.log(artist,title);
    const api = '6b16b0d3bemshc23d50ca0c04dbbp135a19jsn43386888765f'
    fetch(`https://songmeanings.p.rapidapi.com/?key=${api}&sm_lid=%3CREQUIRED%3E&lyric_title=${title}&artist_name=${artist}format=%3CREQUIRED%3E&method=lyrics.get`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6b16b0d3bemshc23d50ca0c04dbbp135a19jsn43386888765f",
            "x-rapidapi-host": "songmeanings.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => {
        console.error(err);
    });
}
getLyrics();



//loadSpinner
// const toggleSpinner = (show) =>{
//     const spinner = document.getElementById("load-spinner");
//     console.log(spinner.classList);
//     if(show){
    
//         spinner.classList.add('d-none');
    
//     }
//     else{
//         spinner.classList.remove('d-none');
//     }
   
// }