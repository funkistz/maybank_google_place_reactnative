import { createSlice, current } from "@reduxjs/toolkit";
import { GooglePlaceState } from "./GooglePlaceTypes";
import { getGooglePlaces } from "./GooglePlaceAction";

const initialState: GooglePlaceState = {
    data: [],
    selected: null,
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
}

export const googlePlaceSlice = createSlice({
    name: 'googlePlace',
    initialState,
    reducers: {
        selectPlace: (state, action) => {

            const selectedPlace: any = current(state.data).find((data: any) => {
                return data.place_id == action.payload
            });

            return state = { ...state, selected: selectedPlace }
        },
    },
    extraReducers: {
        [getGooglePlaces.pending]: (state: GooglePlaceState) => {
            state.isLoading = true;

            state.data = [];
        },
        [getGooglePlaces.fulfilled]: (state: GooglePlaceState, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            console.log('getGooglePlaces payload', payload);

            state.data = payload;
        },
        [getGooglePlaces.rejected]: (state: GooglePlaceState, { payload }) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = payload
            console.log('getGooglePlaces error', payload);

            state.data = [];
        }
    }
})

export const { selectPlace } = googlePlaceSlice.actions

export default googlePlaceSlice.reducer;