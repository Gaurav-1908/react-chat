
import { Row,Col, Button } from "react-bootstrap";
import { w3cwebsocket  } from "websocket";
import { FindUSers } from "./FindUsers";

const url = process.env.REACT_APP_SERVER_ADDRESS;
const client = new w3cwebsocket(url);

export const UserList = ({userName,userList,setMessages,setReceiver,setUserList}) =>{
    function getMessages(Receiver){
        setReceiver(Receiver);
        client.send(JSON.stringify({
            type:"message",
            sender: userName,
            receiver: Receiver
          }));
    }

    client.onmessage = (messages) =>{
        const dataFromServer = JSON.parse(messages.data);
        const tempMessages = dataFromServer
        setMessages(tempMessages);
    }

    return(
        <>
        <Row>
            <FindUSers 
                setUserList={setUserList}
                userName= {userName}
            />
        </Row>
        <Row>
            <Col style={{
                width: "100%",
                backgroundColor:"#111b21",
                paddingTop:"5%",
                height:"450px",
                overflow:'auto'
            }}
            >
               
                {userList.map((Receiver, index) => (
                 <>
                <Row key={index}>
                    <Button className="btn"
                            value={Receiver}
                            onClick={() => getMessages(Receiver)}
                            style={{
                                backgroundColor:"#111b21",
                                textAlign:"left",
                                border:"0px",
                                
                            }}
                    
                    >
                        {Receiver}
                    </Button>
                </Row>
                <hr style={{
                    color:"white"
                }}  
                />
                </>
              ))}
              
            </Col>
        </Row>
        </>
    )
}