const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song Title in array, as similar to our song album
const songs = ['hey', 'summer', 'ukulele']

// keep track of songs
let songIndex = 2

// initially load song info into the Document Onject Module (DOM)
loadSong(songs[songIndex])

// Update song detials
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src =`images/${song}.jpg`
}

function playSong() {
    musicContainer.classList.add('play')
    // change the icon
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    // change the icon
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong() {
    // decrease the song by one
    songIndex--
    // check the song index, if it less than 0, then loop back to begining
    if(songIndex < 0) {
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    // increment the song by one
    songIndex++
    // check the song index, if it greater than the index, then loop back to begining
    if(songIndex > songs.length -1 ) {
        songIndex = 0
    }
    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e) {
    const {duration, currentTime}= e.srcElement
    const progressPercent =(currentTime / duration) * 100
    // add the percentage width based on progressPercent
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    // get the width
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX /width) * duration
}


// event listeners
playBtn.addEventListener('click', ()=> {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// update the progress bar

audio.addEventListener('timeupdate',updateProgress)

// set the progress bar clickable to change the songs duration
progressContainer.addEventListener('click', setProgress)

// when the songs end, it would go to next one
// audio API has eventListener call ended that would check if the songs ends
audio.addEventListener('ended', nextSong)