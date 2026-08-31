export type PlayListJSON = {
    name : string
    musiques: Musique[]
}


export type MusiqueMetaData = {
    pictureURL : string
    title : string
    artist : string
    playListe ?: string
}

export type Musique = {
    url : string
    metadata : MusiqueMetaData
}


export class PlayListe {
    name : string = ""
    musiques: Musique[] = []
    

    hydrate( data : PlayListJSON ) {
        this.name = data.name;
        data.musiques.forEach((musique : Musique) => {
            this.musiques.push(musique)
        })

    }

}