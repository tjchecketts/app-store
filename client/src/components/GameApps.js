import React from 'react';
import axios from 'axios';
import Form from './Form';

class GameApps extends React.Component {
  state = { app: {} }

  componentDidMount() {
    axios.get(`/api/apps/${this.props.match.params.id}`)
      .then( res => this.setState({ app: res.data }) )
  }

  toggleEdit = () => {
    this.setState( state => {
      return { edit: !this.state.edit }
    });
  }

  submit = (app) => {
    axios.put(`/api/apps/${this.props.match.params.id}`, { app })
      .then( res => this.setState({ app: res.data, edit: false }) );
  }

  show() {
    if(this.state.app) {
      let { app: { name, description, category, version, price, logo }} = this.state;
      return (
        <div>
          <h1>App Name: {name}</h1>
          <h3>Logo: {<img src={logo} alt={"logo"} height="250" width="350" />}</h3>
          <h3>Description: {description}</h3>
          <h3>Category: {category}</h3>
          <h3>Version: {version}</h3>
          <h3>Price: ${price}</h3>
        </div>
      )
    }
    return null;
    
  }

  edit() {
    return <Form {...this.state.product} submit={this.submit} />
  }

  render() {
    let { edit } = this.state;
    return (
      <div>
        { edit ? this.edit() : this.show() }
        <button onClick={this.toggleEdit}>{ edit ? 'Cancel' : 'Edit App' }</button>
      </div>
    )
  }
}

export default GameApps;