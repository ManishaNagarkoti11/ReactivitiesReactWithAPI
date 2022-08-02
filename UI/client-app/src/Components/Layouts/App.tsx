import React, { useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import { Activity } from '../Models/activity';
import NavBar from './Navbar';
import ActivityDashboard from '../Features/activities/dashboard/ActivityDashboard';
import agent from '../API/agent';
import LoadingComponent from './LoadingComponent';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity]=useState<Activity | undefined>(undefined);
    const [editActivity, setEditActivity]=useState(false);
    const [loading, setLoading]=useState(true);
    const [submitting, setSubmitting]=useState(false);

    useEffect(() => {
        agent.Activities.list().then(response => {
           console.log(response);
           let activities:Activity[]=[];
           response.forEach(activity=>{
            activity.date = activity.date.split('T')[0];
            activities.push(activity);
           })
            setActivities(response);
            setLoading(false);
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
        setSubmitting(true);
        if(activity.id){
            agent.Activities.update(activity).then(()=>{
                setActivities([...activities.filter(x=>x.id !== activity.id), activity])
                setSelectedActivity(activity);
                setEditActivity(false);
                setSubmitting(false);
            })
        }else{
            activity.id=uuid();
            agent.Activities.create(activity).then(()=>{
                setActivities([...activities,activity]);
                setSelectedActivity(activity);
                setEditActivity(false);
                setSubmitting(false);
            })
        }
    }
    
    function handleDeleteActivity(id:string){
        setSubmitting(true);
        agent.Activities.delete(id).then(()=>{
            setActivities([...activities.filter(x=>x.id !== id)]);
            setSubmitting(false);
        })
        
    }
 if(loading) return <LoadingComponent content='Loading app'/>
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
          submitting={submitting}
          />
          </Container>
          
        </>
    );
}
export default App;
