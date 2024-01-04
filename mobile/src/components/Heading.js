import React from 'react';
import {Text, 
        View, 
        StyleSheet, 
        SafeAreaView,
        TextInput,
        Button,
        Pressable} from 'react-native';

export const Heading = () =>{
    return(
        <View >
            <Text style={styles.heading}>
                Welcome
            </Text>
        </View>
        
    )
}

// const styles = StyleSheet.create({
//     heading: {
//         color: 'red'
//     },
//     input: {
//       height: 40,
//       margin: 12,
//       borderWidth: 1,
//       padding: 10,
//       backgroundColor: 'white',
//       color: 'black'
//     },
//     button: {
//         height: 40,
//         alignItems: 'center',
//         margin: 12,
//         backgroundColor: 'blue',
//         justifyContent: 'center',
//         color: 'white'
//     },
//     registerLine: {
//         flexDirection: 'row',
//         margin: 12
//     },
//     register: {
//         color: 'blue',
//         marginLeft: 10
//     }
//   });

const styles = StyleSheet.create({
    heading: {
        fontSize: 40,
        textAlign: 'center',
        paddingBottom:'10%'
    }
});