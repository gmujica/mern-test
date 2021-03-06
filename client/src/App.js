import React from 'react'
import axios from 'axios'
import DraftsIcon from '@material-ui/icons/Drafts'
import PhoneIcon from '@material-ui/icons/Phone'
import './App.css'

class App extends React.Component {

  state = {
    name:'',
    email: '',
    phone: '000000000',
    posts: [],
    id: '5f3323c4f92d61244cb8f571'
    //personal: 'personal',
    //profesional: 'profesional',
    //type: 'personal'
  }

  componentDidMount = () => {
    this.getPostData()
  }

  getPostData = () => {
    axios.get('/posts')
    .then((response) => {
      const data = response.data
      this.setState({ posts: data })
    })
    .catch(() => {
      alert('Error retrieving data!!!')
    })
  }

  handleChange = ({ target }) => {
    const { name, value } = target

    this.setState({
      [name] : value
    })
    
  }

  handleDelete = () => {
    const payload = {
     id: this.state.id

    }
    axios({
      url:'http://localhost:8000/posts/',
      method:'DELETE',
      data: payload
    })
    .then(() =>{
      console.log('Data has been delete from the server');
      this.resetUserInputs()
      this.getPostData()
    })
    .catch(() => {
      console.log('Internal server error');
    })
    //this.setState
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      //type: this.state.type
      //personal: this.state.personal,
      //profesional: this.state.profesional
    }

    axios({
      url:'http://localhost:8000/posts',
      method:'POST',
      data: payload
    })
    .then(() =>{
      console.log('Data has been sent to the server');
      this.resetUserInputs()
      this.getPostData()
    })
    .catch(() => {
      console.log('Internal server error');
    })

  }

  resetUserInputs = () => {
    this.setState({
      name: '',
      email: '',
      phone: ''
    })
  }

  displayItem = (posts) => {
    if(!posts.length) return null
    //<p>{post._id}</p>
    return posts.reverse().map((post, index) => (
      <div key={index} className="card">
        <h3>{post.name}</h3>
        <div className="info-container">
          <DraftsIcon />
          <p>{post.email}</p>
        </div>
        <div className="info-container">
          <PhoneIcon />
          <p>{post.phone}</p>
        </div>    
        <button className="edit">Edit</button>
        <button className="delete" onClick={this.handleDelete}>Delete</button>
      </div>
    ))
  }

  render() {

    console.log('State:', this.state);

    return (
      <div className="app">
        <h2>Add Contact</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-input">
            <input
              required
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input
              required
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input
              required
              type="number"
              name="phone"
              placeholder="Phone"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className="checkbox-container">
            <div className="checkbox">
              <input
                type="checkbox"
                name="personal"
                value={this.state.value}
                value={this.state.value}
                onChange={this.handleChange}
              />
            <label>Personal</label>
            </div>
            <div className="checkbox">
              <input
              
                type="checkbox"
                value={this.state.value}
                name="personal"
                value={this.state.value}
                onChange={this.handleChange}
              />
            <label>Profesional</label>
            </div>
          </div>
          <button>Add Contact</button>
        </form>

        <div>
          {this.displayItem(this.state.posts)}
        </div>
      </div>
    );
  }

}

export default App;
