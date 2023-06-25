import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { GMWrapper } from '@features/google-map';
import { GPAutoComplete } from '@features/google-place';
import { useSelector } from 'react-redux';
import withCurrentLocation from '@components/withCurrentLocation';

const { width, height } = Dimensions.get('window')

export default function HomePage(): JSX.Element {

    const selectedPlace = useSelector((state: any) => state.googlePlace.selected)

    const MapWithPermission = withCurrentLocation(GMWrapper);

    return (
        <View style={styles.container}>

            <View style={styles.autocompleteWrapper}>
                <Text style={{ fontSize: 30, marginBottom: 10, marginTop: 10, fontWeight: 'bold' }}>Google Place</Text>
                <GPAutoComplete />
                <Text style={{ width: '100%', textAlign: 'right', marginTop: 5 }}>powered by Google</Text>
            </View>
            <View style={styles.mapContainer}>
                <MapWithPermission centerMarker={selectedPlace} height={height - 180} loadingStyle={styles.loadingStyle} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: height,
        width: width,
    },
    mapContainer: {
        width: width,
        height: height - 150,
        marginTop: -10
    },
    autocompleteWrapper: {
        zIndex: 999,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        padding: 15,
        width: width,
        overflow: 'visible',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    loadingStyle: {
        marginTop: 50,
        width: '100%',
        textAlign: 'center'
    }
});