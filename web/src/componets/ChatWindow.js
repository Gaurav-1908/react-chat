// import { useState } from "react";
import { Row,Col } from "react-bootstrap"
import { UserList } from "./UserList";
import { MessageWindow } from "./MessageWindow";
import { SendMessage } from "./SendMessage";

export const ChatWindow = ({userName,userList,receiver,setReceiver,messages,setMessages,setUserList}) =>{
    return(
        <div style={{
            padding:"40px",
            paddingTop:"20px",
            
        }}>
            <Row>
                <Col md = {4}
                    style={{
                        backgroundColor: "#111b21",
                        color:"white",
                        height:"80px",
                        paddingLeft:"1%",
                        paddingTop:"2%",
                    }}
                    >
                    Welcome {userName}
                </Col>
                <Col style={{
                    backgroundColor: "#202c33",
                    color:"white",
                    height:"80px",
                    paddingLeft:"1%",
                    paddingTop:"2%"
                }}>
                    {receiver}
                </Col>
            </Row>
            <Row>
                <Col md = {4} sm= {10} style={{
                    // height:"500px",
            
                    height:"500px"
                    }}>
                    <UserList
                        userList = {userList}
                        setMessages = {setMessages}
                        receiver = {receiver}
                        setReceiver = {setReceiver}
                        userName = {userName}
                        setUserList= {setUserList}
                       
                    />
                </Col>
                <Col style={{
                    height:"100px",
                    color:"white",
                    // height:"80px",
                    // paddingLeft:"1%",
                }}>
                    <MessageWindow
                        receiver = {receiver}
                        messages = {messages}
                    />
                    <SendMessage
                        sender = {userName}
                        receiver = {receiver}
                        setMessages = {setMessages}
                    />
                </Col>
            </Row>
        </div>
    )
}