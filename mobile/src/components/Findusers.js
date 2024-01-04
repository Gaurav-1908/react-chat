import {Text, 
    View, 
    StyleSheet, 
    SafeAreaView,
    TextInput,
    Button,
    Pressable} from 'react-native';;
import React from "react";

export const Findusers = ({setUserList,client}) =>{
    const [searchUser,setSearchUser] = React.useState("");
    const handleSearchChange = (searchUser) =>{
        setSearchUser(searchUser);
        client.send(JSON.stringify({
            type:"search User",
            username: searchUser
          }));
    }

    client.onmessage = (message) =>{
        console.log('In find users');
        const dataFromServer = JSON.parse(message.data);
        const tempUserList = dataFromServer.userList;
        setUserList(tempUserList);
    }

    return(
        <View >
            <TextInput
                style={styles.input}
                onChangeText={handleSearchChange}
                value={searchUser}
                placeholder='Search User'
                placeholderTextColor="#000" 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
    input: {
      height: 40,
      margin: 20,
      borderWidth: 1,
      padding: 10,
      backgroundColor:"white",
      color: "black" ,
    },
  });