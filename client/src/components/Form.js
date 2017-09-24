import React from 'react';

class Form extends React.Component {
  // add price back into this
  defaultValues = { name: '', description: '', category: '', version: '', price: '', logo: '' }
  state = {...this.defaultValues}

  componentDidMount() {
    if (this.props.id)
      this.setState({...this.props})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let app = { ...this.state }
    this.props.submit(app)
    this.setState({ ...this.defaultValues })
  }

  handleChange = (e) => {
    let { target: { id, value }} = e;
    this.setState({ [id]: value })
  }

  render() {
    let { name, description, category, version, price, logo } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="name"
          placeholder="Name"
          value={name}
          onChange={this.handleChange}
          required
        />
        <input
          id="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
        />
        <input
          id="category"
          placeholder="Category"
          value={category}
          onChange={this.handleChange}
        />
        <input
          id="version"
          placeholder="Version"
          value={version}
          onChange={this.handleChange}
        />
        <input
          id="price"
          placeholder="Price"
          value={name}
          onChange={this.handleChange}
          required
        />
        <input
          id="logo"
          placeholder="Logo"
          value={name}
          onChange={this.handleChange}
          required
        />
        <button>Submit</button>
      </form>
    )
  }
}

export default Form;