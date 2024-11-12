import React, { Component } from "react";
import { DashboardContext } from "../context/DashboardContext";
import "../App.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: "",
        identifier: "",
        first_name: "",
        last_name: "",
        email: "",
      },
      isEditing: false,
      formData: {
        id: "",
        identifier: "",
        first_name: "",
        last_name: "",
        email: "",
      },
    };
  }

  componentDidMount() {
    // Fetch user data using Context.Consumer
    DashboardContext.Consumer._currentValue &&
      this.setState({
        user: DashboardContext.Consumer._currentValue.user,
        formData: DashboardContext.Consumer._currentValue.user,
      });
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
      <DashboardContext.Consumer>
        {({ user }) => (
          <div className="user-profile">
            <h2>User Profile</h2>

            {isEditing ? (
              <form onSubmit={this.handleSaveChanges}>
                <div>
                  <label>Identifier:</label>
                  <input
                    type="text"
                    name="identifier"
                    value={formData.identifier}
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
                <p>Identifier: {user.identifier}</p>
                <p>First Name: {user.first_name}</p>
                <p>Last Name: {user.last_name}</p>
                <p>Email: {user.email}</p>
                <button onClick={this.toggleEdit}>Edit Profile</button>
              </div>
            )}
          </div>
        )}
      </DashboardContext.Consumer>
    );
  }
}

export default User;
