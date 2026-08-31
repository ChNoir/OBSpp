import { PlayListe, PlayListJSON } from "./PlayListe.front";

export class PlayListeManager {

    playListes : PlayListe[] = []

    async loadPlayListe() {
        const response = await fetch("/api/playliste");
        if (!response.ok) {
            throw new Error("Failed to fetch playliste");
        }
        const data = await response.json() as PlayListJSON[];
        return data;
    }

    async init() {
        const data = await this.loadPlayListe();
        data.forEach((playListeData) => {
            const playListe = new PlayListe();
            playListe.hydrate(playListeData);
            this.playListes.push(playListe);
        });
    }

    

}