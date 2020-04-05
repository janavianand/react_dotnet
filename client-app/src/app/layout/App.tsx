import React,{useState,useEffect, Fragment} from 'react';
import './styles.css';
import axios from 'axios';
import {Container} from 'semantic-ui-react'
import {IActivity} from '../models/activity'
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activites/dashboard/ActivityDashboard';


const App = ()=>{
  
  const [activities,setActivities] = useState<IActivity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode,setEditMode] = useState<Boolean>(false);

  const fetchActivities = async ()=>{
    const {data} = await axios.get<IActivity[]>('http://localhost:5000/api/activities')
    setActivities(data)
  }

  const handleSelectActivity=(id:string)=>{
    setSelectedActivity(activities.filter(a=>a.id === id)[0]);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)])
  }

  useEffect(()=>{fetchActivities()},[])
  
    return (
      <Fragment>
        <NavBar openCreateForm={handleOpenCreateForm}/>
        <Container style={{marginTop:'7em'}}>
          <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectActivity} 
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          />
        </Container>
      </Fragment>
    )
}

export default App;
