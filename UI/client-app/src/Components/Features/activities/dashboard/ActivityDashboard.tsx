import { observer } from "mobx-react-lite";
import React from "react";
import { Grid} from "semantic-ui-react";
import { Activity } from "../../../Models/activity";
import { useStore } from "../../../Stores/store";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../Form/ActivityForm";
import ActivityList from "./ActivityList";


export default observer(function ActivityDashboard(){

    const {activityStore}= useStore();
    const {selectedActivity, editMode}= activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
             <ActivityList/>
             {/* <List>
                {activities.map(activity=>(
                    <List.Item key={activity.id}>
                        {activity.title}
                    </List.Item>
                ))}
             </List> */}
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode&&
                <ActivityDetail/>}
                { editMode &&
                <ActivityForm />}
                </Grid.Column>
        </Grid>
    );
})