import { useState, useEffect, useMemo } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

const containerStyle = {
    minWidth: '400px',
    minHeight: '400px',
    width: '100%',
    height: '100%'
};

const defaultLocation = {
    lat: 3.1466,
    lng: 101.6958
};

function GMWrapper({ centerMarker = false }: { centerMarker: any }) {

    const centerMarkerJson = JSON.stringify(centerMarker)
    const center = useMemo(() => centerMarker ? centerMarker.location : defaultLocation, [centerMarkerJson])

    console.log('render');

    return (
        <MapView
            style={styles.mapStyle}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <Marker
                draggable
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}
                onDragEnd={
                    (e) => { }
                }
                title={'Test Marker'}
                description={'This is a description of the marker'}
            />
        </MapView>
    )
}

export default GMWrapper;

const styles = StyleSheet.create({
    mapStyle: {
        height: 400,
        width: 400
    },
});