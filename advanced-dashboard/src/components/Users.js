import React, { Component } from "react";
import { DashboardContext } from "../context/DashboardContext";
import "../App.css";

class Users extends Component {
  static contextType = DashboardContext; // This allows you to access context in a class component

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isEditing: false,
      formData: {
        id: "",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
      },
    };
  }

  componentDidMount() {
    const context = this.context; // Access context directly using `this.context`
    if (context && context.users) {
      this.setState({
        users: context.users,
        formData: context.users[0] || {}, // Assuming you want to display the first user initially
      });
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  toggleEdit = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  };

  handleSaveChanges = (e) => {
    e.preventDefault();
    // Save changes logic here
  };

  render() {
    const { isEditing, formData } = this.state;

    return (
      <div className="user-profile">
        <h2>Users</h2>
        {this.state.users.length === 0 ? (
          <p>No user data available</p>
        ) : isEditing ? (
          <form onSubmit={this.handleSaveChanges}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        ) : (
          <div className="profile-details">
            <p>Username: {formData.username || "N/A"}</p>
            <p>First Name: {formData.first_name || "N/A"}</p>
            <p>Last Name: {formData.last_name || "N/A"}</p>
            <p>Email: {formData.email || "N/A"}</p>
            <button onClick={this.toggleEdit}>Edit Profile</button>
          </div>
        )}
      </div>
    );
  }
}

export default Users;
