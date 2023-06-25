import { GOOGLE_MAP_API_KEY } from "@env"

const GooglePlaceService = {

    async search(query: string, signal: any = null) {

        //harcoded the apikey temporaryly
        return await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_MAP_API_KEY}`, {
            signal: signal,
        })
    }

}

export default GooglePlaceService;