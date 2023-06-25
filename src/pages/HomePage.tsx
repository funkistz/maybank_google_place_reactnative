import React, { useState } from 'react'
import { StyleSheet, Text, View, PermissionsAndroid, SafeAreaView, Alert, Platform } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Button } from 'antd-mobile-rn';
import { request, PERMISSIONS } from 'react-native-permissions';
import { GMWrapper } from '@features/google-map';
import { GPAutoComplete } from '@features/google-place';

export default function HomePage(): JSX.Element {

    const [location, setLocation] = useState<any>(false);
    const [isLoading, setIsLoading] = useState<any>(false);

    const requestLocationPermission = async () => {
        setIsLoading(true);
        try {
            const locationPermissionRequest = await request(
                Platform.OS === 'ios'
                    ? PERMISSIONS.IOS.LOCATION_ALWAYS
                    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            );
        } catch (err) {
            return false;
        }
    };

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position: any) => {
                console.log(position);
                setLocation(position);
            },
            error => {
                // See error code charts below.
                console.log(error.code, error.message);
                setLocation(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );

    };

    return (
        <SafeAreaView >
            <View style={styles.container}>
                <GMWrapper centerMarker={null} />
                <GPAutoComplete />

                <Button onClick={requestLocationPermission} >Get Permissionx</Button>
                <Button onClick={getLocation} >Get Location</Button>
                <Text>Latitude: {location ? location.coords.latitude : null}</Text>
                <Text>Longitude: {location ? location.coords.longitude : null} </Text>

            </View>
        </SafeAreaView>
    )
}

const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
    },
];
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 400
    },
});