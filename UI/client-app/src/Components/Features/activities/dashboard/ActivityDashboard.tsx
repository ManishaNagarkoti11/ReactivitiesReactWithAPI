import React from "react";
import { Grid} from "semantic-ui-react";
import { Activity } from "../../../Models/activity";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../Form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props{
    activities:Activity[];
    selectedActivity:Activity | undefined;
    selectActivity:(id:string)=>void;
    cancelSelectActivity:()=>void;
    editActivity:boolean;
    openForm:(id: string)=>void;
    closeForm:()=>void;
    createOrEdit:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
    submitting :boolean;
}
export default function ActivityDashboard({
    activities, selectActivity, selectedActivity, cancelSelectActivity, openForm,
    closeForm, editActivity, createOrEdit, deleteActivity,submitting}: Props){
    return (
        <Grid>
            <Grid.Column width='10'>
             <ActivityList activities={activities} 
             selectActivity={selectActivity} 
             deleteActivity={deleteActivity}
             submitting={submitting}
             />
             {/* <List>
                {activities.map(activity=>(
                    <List.Item key={activity.id}>
                        {activity.title}
                    </List.Item>
                ))}
             </List> */}
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editActivity &&
                <ActivityDetail 
                activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity}
                openForm={openForm}
                />}
                { editActivity &&
                <ActivityForm 
                closeForm={closeForm} 
                activity={selectedActivity} 
                createOrEdit={createOrEdit}
                submitting={submitting}
                />}
                </Grid.Column>
        </Grid>
    );
}