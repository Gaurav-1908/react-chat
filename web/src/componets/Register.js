import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { w3cwebsocket  } from "websocket";

const url = process.env.REACT_APP_SERVER_ADDRESS;
const client = new w3cwebsocket(url);

export const Register = ({setUserName,setUserList}) =>{
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("")

    const handleUsernameChange = event => {
        setuserName(event.target.value)
    }

    const handlePasswordChange =  event =>{
        setPassword(event.target.value)
    }
    client.onmessage = (index) =>{
        const dataFromServer = JSON.parse(index.data);
        
        if(dataFromServer.error){
            setError(dataFromServer.error);
            setuserName("")
            setPassword("")
        }
        else{
            const tempUserList = dataFromServer.userList;
            console.log("in register")
            setUserList(tempUserList);
            setUserName(dataFromServer.userName);
        }
    }
    function register(userName,password){
        client.send(JSON.stringify({
            type:"register",
            userName:userName,
            password:password

          }));
    }
    return (
        <div style={{
            padding:"20px"
        }}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="email" onChange={handleUsernameChange} placeholder="Enter Username" />
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handlePasswordChange} placeholder="Enter Password" />
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="button"
                    onClick={() => register(userName,password)}
                    >
                Register
                </Button>
            </Form>
            <p style={{
                color:"red"
            }}>{error}</p>
        </div>
    )
}