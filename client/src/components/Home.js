import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Header, Container, Card, Image, Divider } from 'semantic-ui-react';
import axios from 'axios';
import Form from './Form';

class Home extends Component {
  state = { apps: [], showForm: false }

  componentDidMount() {
    axios.get('/api/apps')
      .then( res => {this.setState({ apps: res.data })});
  }

  show = () => (
    <div>
      {this.state.apps.map( p =>
        <div key={p.id}>
          <Link to={`/apps/${p.id}`}>
            {p.name} 
            {<img src={p.logo} alt={"logo"} height="250" width="350" />}
            {' '}
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
    let { apps } = this.state;
    return(
      <div>
        <h2>App Store Apps</h2>
          <button onClick={this.toggleForm}>
            { showForm ? 'Hide Form' : 'New App'}
          </button>
          { showForm ? this.form() : 
            <Card.Group itemsPerRow={4}>
              { apps.map( app =>
              <Card key={app.id}>
                <Link to={`/apps/${app.id}`}>
                  <Card.Content>
                    <Image src={app.logo}/>
                    <Divider />
                    <Card.Header>
                      {app.name}
                    </Card.Header>
                  </Card.Content>
                </Link>
              </Card>
                )
              }
            </Card.Group>
          }
      </div>
    )
  }
}

export default Home;
