import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

export const Header = ({userName}) => {
    return(
        <View>
            <Text style = {styles.Header}>
                Welcome {userName}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Header:{
        paddingLeft: '6%',
        paddingTop: '8%',
        fontSize:20
    }
})