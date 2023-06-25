import React, { useEffect, useState } from 'react'
import Geolocation from 'react-native-geolocation-service';
import { Platform, Text } from 'react-native'
import { request, PERMISSIONS } from 'react-native-permissions';
import withLoader from '@components/withLoader';

export default function withCurrentLocation(Component: any) {

    const [location, setLocation] = useState<any>();
    const [locationPermission, setLocationPermission] = useState<any>();

    useEffect(() => {
        requestLocationPermission();
    }, [])

    const requestLocationPermission = async () => {

        try {
            const locationPermissionRequest = await request(
                Platform.OS === 'ios'
                    ? PERMISSIONS.IOS.LOCATION_ALWAYS
                    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            );
            console.log('requestLocationPermission', locationPermissionRequest);
            setLocationPermission(locationPermissionRequest);

            if (locationPermissionRequest == 'granted') {
                getLocation();
            }
        } catch (err) {
            return false;
        }
    };

    const getLocation = () => {

        Geolocation.getCurrentPosition(
            (position: any) => {
                console.log(position.coords.latitude);
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => {
                console.log(error.code, error.message);
                setLocation(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );

    };

    const MapWithPermission = withLoader(Component);

    const NewComponent = (props: any) => {
        return <MapWithPermission isLoading={!location} spinner={(locationPermission == 'blocked') ? <Text style={props.loadingStyle} >Location has been blocked</Text> : null} currentLocation={location} {...props} />;
    };

    return NewComponent;
}
