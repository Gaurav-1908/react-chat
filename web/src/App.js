import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import React,{ useState } from "react"
import { ChatWindow } from './componets/ChatWindow';
import { RegisterLogin } from './componets/RegisterLogin';
import { Col, Row } from "react-bootstrap";
import { w3cwebsocket  } from "websocket";

const url = process.env.REACT_APP_SERVER_ADDRESS;
const client = new w3cwebsocket(url);
// const client = new w3cwebsocket('ws://144.24.102.198:8000');

function App() {
  // console.log(client);
  // const [isLoggedIn,setLoggedIn] = useState(false);
  const [userName,setUserName] = useState("");
  const [userList,setUserList] = useState([]);
  const [receiver,setReceiver] = useState("");
  const [messages,setMessages] = useState([]);

  client.onopen = () => {
    console.log('WebSocket Client Connected to',client.url);
  };

  return (
    <div>
      <Row>
        
        {!userName ?
        <>
            <Col>

            </Col>
            <Col>
              <RegisterLogin
                // setLoggedIn = {setLoggedIn}
                setUserName= {setUserName}
                setUserList = {setUserList}
                setMessages = {setMessages}
              />
            </Col>
            <Col>
            </Col>
          </>
          :
          <ChatWindow
          userName = {userName} 
          userList= {userList}
          receiver = {receiver}
          setReceiver = {setReceiver}
          messages = {messages}
          setMessages = {setMessages}
          setUserList = {setUserList}
          />
        }      
      </Row>
    </div>
  );
}

export default App;
