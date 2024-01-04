import { Form,Col,Row } from "react-bootstrap";
import {useState} from 'react';
import { w3cwebsocket  } from "websocket";

const url = process.env.REACT_APP_SERVER_ADDRESS;
const client = new w3cwebsocket(url);

export const FindUSers = ({setUserList}) =>{
    const [searchUser,setSearchUser] = useState("");
    const handleSearchChange = event =>{
        setSearchUser(event.target.value)
        client.send(JSON.stringify({
            type:"search User",
            username: searchUser
          }));
    }

    client.onmessage = (message) =>{
        const dataFromServer = JSON.parse(message.data);
        // console.log(dataFromServer)
        const tempUserList = dataFromServer.userList;
        setUserList(tempUserList);
    }

    return(
        <Row style={{
            display:"flex",
            backgroundColor:"#202c33",
            paddingTop: "15px",
            marginLeft:"0px"
        }}>
            <Col>
                <Form>
                <Form.Group className="mb-3" >
                        <Form.Control type="text" value={searchUser} onChange={handleSearchChange}  placeholder="Search user" />
                </Form.Group>
                </Form>
            </Col>
        </Row>
    )
}