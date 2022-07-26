import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import { Activity } from '../Models/activity';
import NavBar from './Navbar';
import ActivityDashboard from '../Features/activities/dashboard/ActivityDashboard';
function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity]=useState<Activity | undefined>(undefined);
    const [editActivity, setEditActivity]=useState(false);
    useEffect(() => {
        axios.get<Activity[]>('https://localhost:44320/api/Activities').then(response => {
            console.log(response);
            setActivities(response.data);
        })
    }, [])

    function handleSelectedActivity(id:string){
        setSelectedActivity(activities.find(x=>x.id===id));
    }

    function handleCancelSelectActivity(){
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?:string){
        id? handleSelectedActivity(id):handleCancelSelectActivity();
        setEditActivity(true);
    }

    function handleFormClose(){
        setEditActivity(false);
    }
    
    function handleCreateOrEditActivity(activity:Activity){
        activity.id? setActivities([...activities.filter(x=>x.id !== activity.id), activity])
        : setActivities([...activities,{...activity, id:uuid()}]);
        setEditActivity(false);
        setSelectedActivity(activity);
    }
    
    function handleDeleteActivity(id:string){
        setActivities([...activities.filter(x=>x.id !=id)]);
    }

    return (
        <>
          <NavBar openForm={handleFormOpen}/>
          <Container style={{marginTop:'7em'}}>
          <ActivityDashboard activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editActivity={editActivity}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity ={handleDeleteActivity}
          />
          </Container>
          
        </>
    );
}
export default App;
