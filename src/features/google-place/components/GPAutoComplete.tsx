// import { AutoComplete, Input } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getGooglePlaces } from '../redux/GooglePlaceAction';
import { selectPlace } from '../redux/GooglePlaceSlice';
import { useDebounce } from 'src/hooks/useDebounce';
// import { SearchOutlined } from '@ant-design/icons';
import { AutocompleteInput } from 'react-native-autocomplete-input';
import { StyleSheet, Text } from 'react-native';
import { List, Icon } from 'antd-mobile-rn';

function GPAutoComplete() {

    const places = useSelector((state: any) => state.googlePlace.data)
    // const googlePlace = useSelector((state: any) => state.googlePlace)

    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState<string>('')
    const debouncedSearch = useDebounce<string>(searchText, 200);
    const [hideSuggestion, setHideSuggestion] = useState(true)

    const onSelect = (data: string) => {
        console.log('onSelect', data);
        dispatch(selectPlace(data))
        setSearchText(data);
        setHideSuggestion(true);
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
        setHideSuggestion(false);
    };

    useEffect(() => {
        const promise = dispatch(getGooglePlaces(debouncedSearch))

        return () => {
            promise.abort()
        }

    }, [debouncedSearch])

    const placeOptions = useMemo(() => places.map((place: any) => (place.name)), [places])

    return (<>
        {/* <AutoComplete
            onSearch={handleSearch}
            options={placeOptions}
            onSelect={onSelect}
        >
            <Input size="large" placeholder="Find Place" prefix={<SearchOutlined />} style={styles.autocomplete} />
        </AutoComplete> */}
        <AutocompleteInput
            value={searchText}
            data={placeOptions}
            style={styles.autocomplete}
            onChangeText={handleSearch}
            flatListProps={{
                keyExtractor: (_, idx: any) => idx,
                renderItem: ({ item }: any) => <List.Item onClick={() => onSelect(item)}>{item}</List.Item>,
            }}
            hideResults={hideSuggestion}
        />
    </>);
}

export default GPAutoComplete;

const styles = StyleSheet.create({
    mapStyle: {
        height: 400,
        width: 400
    },
    autocomplete: {
        height: 50,
        width: 420,
        borderRadius: 15
    },
});

const stylesx: any = {
    autocomplete: {
        height: 50,
        width: 420,
        borderRadius: 15,
    },
};