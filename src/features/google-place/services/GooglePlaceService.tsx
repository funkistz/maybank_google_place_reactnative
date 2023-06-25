
const GooglePlaceService = {

    async search(query: string, signal: any = null) {

        return await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=AIzaSyA7Ti7iPa3PlLR0wboLK1ZtfjsiAGib0ks`, {
            signal: signal,
        })
    }

}

export default GooglePlaceService;