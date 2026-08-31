import { DOMStyleEmitter } from "../DOMStyleEmitter/DOMStyleEmitter.front"
import { InitsClass } from "../InitsClass.shared"

export class AudioPlayer  {

    static audioElement : HTMLAudioElement
    static infini : boolean = false
    static random : boolean = false
    static play : boolean = false
    static event : DOMStyleEmitter<AudioPlayer_eventMap> = new DOMStyleEmitter('AudioPlayer')

    static playlist : PlayList | undefined = undefined
    static currentIndexPlaylist : number = 0

    static _init () {
        const audio = document.createElement("audio")
        audio.style.display = "none"
        document.body.appendChild(audio)
        AudioPlayer.audioElement = audio


        audio.addEventListener("timeupdate", () => {

            const cT = AudioPlayer.audioElement.currentTime
            const d = AudioPlayer.audioElement.duration

            const percent = (cT / d);
            const current = AudioPlayer.formatTime(cT);
            const total = AudioPlayer.formatTime(d);
            AudioPlayer.event.dispatchEvent("AudioRun", { percent, current, total });
        })

        audio.addEventListener("ended", () => {
            AudioPlayer.next()
        })

    }

    static { InitsClass.register(AudioPlayer._init)}


    static RunPlayList( pl : PlayList) {
        AudioPlayer.playlist = pl
        AudioPlayer.currentIndexPlaylist = 0
        AudioPlayer.loadMusic( pl.musiques[0] , pl.name)
    }

    static RunMusique(musique : Musique) {
        AudioPlayer.loadMusic(musique)
        if (AudioPlayer.playlist) { AudioPlayer.playlist = undefined}
    }


    static loadMusic( musique : Musique  , namePlayListe ?: string) {
        AudioPlayer.audioElement.src = musique.url
        AudioPlayer.event.dispatchEvent("AudioMetaData", {
            ...musique.metadata,
            playListe : namePlayListe
        });
        AudioPlayer.audioElement.play(); 
    }


    static next() {
        if (!AudioPlayer.playlist)  {
            if (AudioPlayer.infini) {
                AudioPlayer.audioElement.currentTime = 0;
                AudioPlayer.audioElement.play();
            }
            return
        }
        if (AudioPlayer.random) {
            const index = Math.round( Math.random() * 100 * (AudioPlayer.playlist.musiques.length -1))
            AudioPlayer.currentIndexPlaylist = index
            AudioPlayer.loadMusic(AudioPlayer.playlist.musiques[AudioPlayer.currentIndexPlaylist])
            return
        }
        if (AudioPlayer.infini) {
            AudioPlayer.currentIndexPlaylist++
            if (AudioPlayer.currentIndexPlaylist > AudioPlayer.playlist.musiques.length -1 ) AudioPlayer.currentIndexPlaylist = 0
            AudioPlayer.loadMusic(AudioPlayer.playlist.musiques[AudioPlayer.currentIndexPlaylist])
            return
        }
       
        AudioPlayer.play = false;

        AudioPlayer.event.dispatchEvent("Play", {
            status: false
        });


    }

    static prev() {
        if (AudioPlayer.audioElement.currentTime > 5) {
            AudioPlayer.audioElement.currentTime = 0;
            AudioPlayer.audioElement.play();
            return;
        }
        else {

            if (!AudioPlayer.playlist) return

            if (AudioPlayer.random) {
                const index = Math.round( Math.random() * AudioPlayer.playlist.musiques.length -1)
                AudioPlayer.currentIndexPlaylist = index
                AudioPlayer.loadMusic(AudioPlayer.playlist.musiques[AudioPlayer.currentIndexPlaylist])
                return
            }
            if (AudioPlayer.infini) {
                AudioPlayer.currentIndexPlaylist--
                if (AudioPlayer.currentIndexPlaylist < 0) AudioPlayer.currentIndexPlaylist = AudioPlayer.playlist.musiques.length -1
                AudioPlayer.loadMusic(AudioPlayer.playlist.musiques[AudioPlayer.currentIndexPlaylist])
                return
            }

        }
    }


    static togglePlay() {
        if (AudioPlayer.audioElement.paused) {
            AudioPlayer.audioElement.play();
            AudioPlayer.play = true;
        } else {
            AudioPlayer.audioElement.pause();
            AudioPlayer.play = false;
        }

        AudioPlayer.event.dispatchEvent("Play", {
            status: AudioPlayer.play
        });
    }

    static toggleInfini() {
        AudioPlayer.infini = !AudioPlayer.infini
        AudioPlayer.event.dispatchEvent("Infini" , { status : AudioPlayer.infini })

    }

    static toggleRandom() {
        AudioPlayer.random = !AudioPlayer.random
        AudioPlayer.event.dispatchEvent("Random" , { status : AudioPlayer.random })
    }


    static formatTime( sec :  number) {
        if (isNaN(sec)) return "0:00";
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    }


    
    static setVolume(volume: number) {
        AudioPlayer.audioElement.volume = volume;
    }

    static mute() {
        AudioPlayer.audioElement.muted = true;
    }

    static unmute() {
        AudioPlayer.audioElement.muted = false;
    }
    

}


type AudioPlayer_eventMap = {

    Random : { status : boolean },
    Infini : { status : boolean },
    Play : { status : boolean },
    AudioRun :  { percent: number; current: string; total: string; }
    AudioMetaData : MusiqueMetaData
}


type PlayList = {
    name : string
    musiques: Musique[]
}


export type Musique = {
    url : string
    metadata : MusiqueMetaData
}

type MusiqueMetaData = {
    pictureURL : string
    title : string
    artist : string
    playListe ?: string
}