import React,{Component} from 'react';
import './App.css';
import axios from 'axios';
import { Header, Icon, Image } from 'semantic-ui-react'

class App extends Component{
  
  state = {
    values:[]
  }

  async componentDidMount(){
    const {data} = await axios.get('http://localhost:5000/api/values')
    this.setState({values:data})
  }

  render(){
    return (
      <div>
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>Reactivities</Header.Content>
      </Header> 
      <div>
        {this.state.values.map((value:any)=>(
            <ul key={value.id}>
              <li>{value.id}</li>
              <li>{value.name}</li>
            </ul>
          )
        )}
        </div>
      </div>
    )
  }
}

export default App;
