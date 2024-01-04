import { Row } from "react-bootstrap";
import React, { useEffect, useRef } from "react";

export const MessageWindow = ({receiver,messages}) =>{
    const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

    return(
            <Row 
                ref={containerRef}
            style={{
                // display:"flex",
                backgroundColor:"#111b21",
                color:"white",
                height:"450px",
                overflow:'auto',
            }}>
                    {messages.map(message=>
                    <Row key = {message._id}>
                    
                        {message.sender === receiver ?(
                            <div style={{
                                paddingRight:"250px",
                            }}>
                                <p style={{
                                    backgroundColor:"#202c33",
                                    padding:"5px"
                                }}>{message.message}</p>
                            </div>
                            )
                            :
                            (
                            <div style={{
                                paddingLeft:"250px",
                                alignContent:"right",
                                alignItems:"right",
                                textAlign:"left",
                            }}>
                                <p style={{
                                    backgroundColor:"#005c4b",
                                    padding:"5px",
                                    direction:"rtl"
                                }}>
                                    {message.message}</p>
                            </div>
                        )}
            
                    </Row>
                    )

                    }

            </Row>
    )
}