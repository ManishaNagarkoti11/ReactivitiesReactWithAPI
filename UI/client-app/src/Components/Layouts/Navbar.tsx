import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../Stores/store";

export default function NavBar(){

    const {activityStore} = useStore();
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'15px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button onClick={()=>activityStore.openForm()} postive content='create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}