function getSongLyrics(){
   const getSongName=  document.getElementById('getSongName').value;
    fetch('https://api.lyrics.ovh/suggest/'+getSongName)
    .then(res=>res.json())
    .then(data => {
        const colData = data.data;
        const songList = document.getElementById('songList');
        songList.innerHTML="";
        for(let i=0;i<10;i++){
            const singleData = colData[i].title;
            const singleDataAlbum = colData[i].album.title;
            const arsitsName = colData[i].artist.name;
            console.log(arsitsName,singleData)
            const songDiv = document.createElement('div');
            songDiv.className='single-result row align-items-center my-3 p-3'
            songDiv.innerHTML = `
                <div class="col-md-9">
                    <h3 class="lyrics-name">${singleData}</h3>
                    <p class="author lead">Album by <span>${singleDataAlbum}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="getLyrics('${arsitsName}','${singleData}')" class="btn btn-success">Get Lyrics</button>
            </div>`;
            songList.appendChild(songDiv);

        }

    

    });
    const displayData = (data)=>{
        const songLyrics = document.getElementById('songLyrics');
        songLyrics.innerText=data.lyrics;
    }
    
    const getLyrics = async (artistName, title) =>{
        const res = await fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`);
        const data = await res.json();
        displayData(data);
    }
   
    

}



getSongLyrics();