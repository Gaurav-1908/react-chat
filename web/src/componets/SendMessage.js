import { useState } from "react";
import { Button,Col,Row,Form } from "react-bootstrap";
import { w3cwebsocket  } from "websocket";

const url = process.env.REACT_APP_SERVER_ADDRESS;
const client = new w3cwebsocket(url);

export const SendMessage = ({sender,receiver,setMessages}) =>{
    const [currentMessage,setCurrentMEssage] = useState("")
    const handleMessageChange = event =>{
        setCurrentMEssage(event.target.value)
    }

    function sendMessage(){
        client.send(JSON.stringify({
            type:"send Message",
            message:currentMessage,
            sender:sender,
            receiver:receiver
          }));
          setCurrentMEssage("");
    }

    client.onmessage = (messages) =>{
        console.log('in send messae')
        const dataFromServer = JSON.parse(messages.data);
        setMessages(dataFromServer.messages)
        
    }

    return(
        <Row style={{
            display:"flex",
            backgroundColor:"#202c33",
            paddingTop: "15px"
        }}>
            <Col md = {10}>
                <Form>
                <Form.Group className="mb-3" >
                        <Form.Control type="text" value={currentMessage} onChange={handleMessageChange} placeholder="Type Message" />
                    </Form.Group>
                </Form>
            </Col>
            <Col>
                <Button
                    variant="primary" 
                    type="button"
                    onClick={()=>sendMessage()}
                >
                    send Message
                </Button>
            </Col>
        </Row>
    )
}