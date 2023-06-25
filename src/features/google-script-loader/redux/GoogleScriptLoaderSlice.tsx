import { createSlice, current } from "@reduxjs/toolkit";

const initialState: any = {
    isLoaded: false
}

export const googleScriptLoaderSlice = createSlice({
    name: 'googleScriptLoaderSlice',
    initialState,
    reducers: {
        setSriptLoaded: (state) => {
            return state = { ...state, isLoaded: true }
        },
    }
})

export const { setSriptLoaded } = googleScriptLoaderSlice.actions

export default googleScriptLoaderSlice.reducer;