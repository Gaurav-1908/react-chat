import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Login } from '../componets/Login';
import { Register } from '../componets/Register';
import { Row } from 'react-bootstrap';

export const RegisterLogin = ({setLoggedIn,setUserName,setUserList,setMessages}) =>{
    return(
        <Row style={{
            marginTop:"100px",
        }}>
                <Tabs
                    defaultActiveKey="Login"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    fill
                    >
                <Tab eventKey="Login" title="Login" >
                    <Login
                        setLoggedIn = {setLoggedIn}
                        setUserName= {setUserName}
                        setUserList = {setUserList}
                        setMessages={setMessages}
                    />
                </Tab>
                <Tab eventKey="Register" title="Register">
                    <Register
                        setLoggedIn = {setLoggedIn}
                        setUserName= {setUserName}
                        setUserList = {setUserList}
                        setMessages={setMessages} 
                    />
                </Tab>
            
            </Tabs>
        </Row>
    )
}