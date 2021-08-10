const handleSearchSong = () => {
    const searchSong = document.getElementById('search-input').value;
    //load data
    // toggleSpinner(true);
    toggleSpinner();

    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchSong}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6b16b0d3bemshc23d50ca0c04dbbp135a19jsn43386888765f",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })
        .then(res => res.json())
        .then(data => {
            displaySong(data.data)
        })

        .catch(error => {
            displayError('No result found!! Please search by a name!')
            toggleSpinner();
        });
}


const displaySong = songs => {



    console.log(songs);
    const songContainer = document.getElementById('song-container')
    songContainer.innerHTML = ''
    // songContainer.className = 'search-result col-md-8 mx-auto py-4'
    if (songs.length) {
        songs.forEach(song => {
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
            toggleSpinner()

        })
    }
    else {
        displayError('Something went wrong,please try again later!')
        toggleSpinner()
    }

}

//load lyrics data
const getLyrics = async (artist, title) => {
    console.log(artist, title);
    try {
        const url = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        const data = await url.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Sorry  failed to load lyrics,Please try again later!');
    }
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}



//loadSpinner
const toggleSpinner = (show) => {
    const spinner = document.getElementById("load-spinner");
    const songs = document.getElementById("song-container");
    console.log(spinner.classList);
    console.log(songs.classList);
    // if(show){

    // spinner.classList.remove('hidden'); 
    // }
    // else{
    //     spinner.classList.add('hidden');
    // }

    spinner.classList.toggle('hidden');
    songs.classList.toggle('hidden');
}

const displayError = error => {
    const errorTag = document.getElementById("error-message");
    errorTag.innerText = error;
}

//use keyboard to search
window.addEventListener('keydown', (key) => {
    if (key.key === "Enter") {
        handleSearchSong();
    }
})