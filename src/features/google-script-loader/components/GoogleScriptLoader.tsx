import React, { Component, useEffect, useState } from 'react';
import { useLoadScript, LoadScriptNext } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { setSriptLoaded } from '../redux/GoogleScriptLoaderSlice';

export function googleScriptLoader(Component: any) {

    return (props: any) => {
        console.log('props', props);
        const scriptLoaded = useSelector((state: any) => state.googleScriptLoader.isLoaded)
        const dispatch = useDispatch()

        // if (!scriptLoaded) {
        //     const [libraries] = useState<any>(['places', 'maps']);
        //     const { isLoaded } = useLoadScript({
        //         googleMapsApiKey: String(process.env.REACT_APP_GOOGLE_MAP_API_KEY),
        //         libraries,
        //     });

        //     useEffect(() => {
        //         if (isLoaded) {
        //             console.log('isLoaded');
        //             dispatch(setSriptLoaded())
        //         }
        //     }, [isLoaded])

        // }

        return (
            <>
                <LoadScriptNext googleMapsApiKey={String(process.env.REACT_APP_GOOGLE_MAP_API_KEY)} libraries={['places']}>
                    <Component {...props} />
                </LoadScriptNext>
            </>
        );

        if (!scriptLoaded) return <div>Loading data.</div>;
        return <Component {...props} />;
    }


}
