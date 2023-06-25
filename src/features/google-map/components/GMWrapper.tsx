import { useState, useRef, useMemo, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

const initialRegion = {
    latitude: 3.1466,
    longitude: 101.6958,
    latitudeDelta: 3.1466,
    longitudeDelta: 101.6958,
};

function GMWrapper({ centerMarker = false, currentLocation, height }: { centerMarker: any, currentLocation: any, height: number }) {

    const centerMarkerJson = JSON.stringify(centerMarker)
    const center = useMemo(() => {
        if (!centerMarker) {
            return currentLocation ? currentLocation : initialRegion
        } else {
            return ({
                latitude: centerMarker?.geometry?.location?.lat,
                longitude: centerMarker?.geometry?.location?.lng,
                latitudeDelta: centerMarker?.geometry?.location?.lat,
                longitudeDelta: centerMarker?.geometry?.location?.lng,
            })
        }
    }, [centerMarkerJson, currentLocation])

    const markerElement = useRef<any>();
    useEffect(() => {
        if (markerElement && markerElement.current)
            markerElement.current.showCallout()

    }, [centerMarker])

    return (
        <MapView
            style={{ ...styles.mapStyle, height: height }}
            minZoomLevel={10}
            maxZoomLevel={18}
            region={center}
        >
            {centerMarker && <Marker
                ref={markerElement}
                coordinate={{
                    latitude: center.latitude,
                    longitude: center.longitude,
                }}
                title={centerMarker.name}
                description={centerMarker.formatted_address}
            />
            }
        </MapView>
    )
}

export default GMWrapper;

const styles = StyleSheet.create({
    mapStyle: {
        width: width
    },
});