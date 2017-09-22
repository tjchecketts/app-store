import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import axios from 'axios';
import Form from './Form';

class Home extends Component {
  state = { apps: [], showForm: false }

  componentDidMount() {
    axios.get('/api/apps')
      .then( res => {
        console.log(res);
        this.setState({ apps: res.data })});
  }

  show = () => (
    <div>
      {this.state.apps.map( p =>
        <div key={p.id}>
          <Link to={`/apps/${p.id}`}>
            {p.name}
          </Link>
        </div>
      )}
    </div>
  )

  submit = (app) => {
    const { apps } = this.state;
    axios.post('/api/apps', { app })
      .then( res => {
        this.setState({ apps: [res.data, ...apps], showForm: false }) 
      })
      .catch( e => console.log(e.response.data.errors))
  }

  form = () => {
    return <Form submit={this.submit} />
  }
  
  toggleForm = () => this.setState({ showForm: !this.state.showForm });

  render() {
    const { showForm } = this.state;
    return(
      <div>
        <h2>App Store Apps</h2>
        <button onClick={this.toggleForm}>
          { showForm ? 'Hide Form' : 'New App'}
        </button>
        { showForm ? this.form() : this.show() }
      </div>
    )
  }
}

export default Home;
