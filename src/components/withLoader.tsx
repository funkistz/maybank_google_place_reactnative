import React from 'react'
import { View } from 'react-native';
import {
    ActivityIndicator,
} from 'antd-mobile-rn'

export default function withLoader(Component: any) {

    const NewComponent = (props: any) => {
        if (props.isLoading) {
            if (props.spinner)
                return props.spinner;
            return <View style={props.loadingStyle}>
                <ActivityIndicator />
            </View>
        };
        return <Component {...props} />;
    };

    return NewComponent;
}
