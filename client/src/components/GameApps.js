import React from 'react';
import axios from 'axios';

class GameApps extends React.Component {
  state = { apps: [] }

  componentDidMount() {
    axios.get(`/api/apps/${this.props.match.params.id}`)
      .then( res => this.setState({ app: res.data }) )
  }

  show() {
    let { app: { name, description, category, price, version, logo }} = this.state;
    return (
      <div>
        <h1>App info</h1>
      </div>
    )
  }

}

export default GameApps;