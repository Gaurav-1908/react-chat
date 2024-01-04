import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { w3cwebsocket  } from "websocket";

const url = process.env.REACT_APP_SERVER_ADDRESS;
const client = new w3cwebsocket(url);

export const Login= ({setUserName,setUserList,setMessages}) =>{
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("")

    const handleUsernameChange = event => {
        setuserName(event.target.value)
    }

    const handlePasswordChange =  event =>{
        setPassword(event.target.value)
    }
    client.onmessage = (message) =>{
        const dataFromServer = JSON.parse(message.data);
        // console.log(dataFromServer)
        if(dataFromServer.error){
            setError(dataFromServer.error);
            setuserName("")
            setPassword("")
        }
        else if(dataFromServer.message){
            console.log("on login");
            const tempMessages = dataFromServer.messages;
            setMessages(tempMessages);      
        }
        else{
            const tempUserList = dataFromServer.userList;
            setUserList(tempUserList);
            setUserName(dataFromServer.userName);
        }
        
    }
    function login(userName,password){
        // setLoggedIn(true);
        client.send(JSON.stringify({
            type:"login",
            userName:userName ,
            password:password
          }));
    }
    return(
        <div style={{
            padding:"20px"
        }}>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={userName} onChange={handleUsernameChange} placeholder="Enter Username" required/>
                </Form.Group>
        
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password" required/>
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="button"
                    onClick={() => login(userName,password)}
                    onTouchEnd={() => login(userName,password)}
                >
                Login
                </Button>
            </Form>
            <p style={{
                color:"red"
            }}>{error}</p>
        </div>
        
    )
}