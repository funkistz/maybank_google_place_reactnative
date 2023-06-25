import { createAsyncThunk } from "@reduxjs/toolkit";
import GooglePlaceService from "../services/GooglePlaceService";

export const getGooglePlaces: any = createAsyncThunk<any>(
    'googlePlace/getPlace',
    async (query: any, { rejectWithValue, signal }) => {

        try {

            const response: any = (await GooglePlaceService.search(query, signal));
            let result = await response.json();

            if (result.status === 'OK') {
                console.log('response', result.results);
                return result.results;
            } else {
                return rejectWithValue(result.results)
            }

        } catch (error: any) {
            console.log('error', error);

            return rejectWithValue(error.message);
        }
    })