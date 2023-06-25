import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getGooglePlaces } from '../redux/GooglePlaceAction';
import { selectPlace } from '../redux/GooglePlaceSlice';
import { useDebounce } from 'src/hooks/useDebounce';
import { StyleSheet, View } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import Icon from 'react-native-vector-icons/AntDesign';

function GPAutoComplete() {

    const places = useSelector((state: any) => state.googlePlace.data)

    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState<string>('')
    const debouncedSearch = useDebounce<string>(searchText, 100);

    const onSelect = (data: any) => {
        console.log('onSelect', data);
        if (data)
            dispatch(selectPlace(data.id))
    };

    const handleSearch = (value: string) => {
        console.log('handleSearch', value);

        setSearchText(value);
    };

    useEffect(() => {
        console.log('getGooglePlaces', debouncedSearch);

        const promise = dispatch(getGooglePlaces(debouncedSearch))

        return () => {
            promise.abort()
        }

    }, [debouncedSearch])

    const placeOptions = useMemo(() => places.map((place: any) => ({ id: place.place_id, title: place.name })), [places])

    return (
        <>
            <View style={{ flexBasis: 'auto', flexGrow: 1 }}>
                <AutocompleteDropdown
                    clearOnFocus={false}
                    closeOnBlur={true}
                    closeOnSubmit={false}
                    onChangeText={handleSearch}
                    onSelectItem={(data) => onSelect(data)}
                    dataSet={placeOptions}
                    showChevron={false}
                    onClear={() => handleSearch('')}
                    textInputProps={{
                        placeholder: 'Search here',

                    }}
                />
            </View>
        </>
    );
}

export default GPAutoComplete;

const styles = StyleSheet.create({
    autocomplete: {
        height: 50,
        zIndex: 999
    },
});

const stylesx: any = {
    autocomplete: {
        height: 50,
        width: 420,
        borderRadius: 15,
    },
};