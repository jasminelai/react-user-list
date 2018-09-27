import React, { Component } from 'react';
import { AppBar } from '@material-ui/core';

class CreateUser extends Component {

    constructor(props) {
      super(props);
      this.state = {
        first: '',
        last: '',
        sex: '',
        age: '',
        password: '',
        repeat_password: '',
      }
    }

    onChange = (e) => {
      this.setState({[e.target.name]: e.target.value});
    }

    isDisabled = () => {
      const {first, last, sex, age, password, repeat_password} = this.state;
      //check if any of the fields are empty
      if (!(first && last && sex && age && password && repeat_password )) {
        return true;
      }
      if (password !== repeat_password) {
        return true;
      }
      return false;

    }

    createUser = () => {
      const {first, last, sex, age} = this.state;
      const user = {
        first: first,
        last: last,
        sex: sex,
        age: age
      }
      return(user);
    }

    render() { 
      return(
        <div>
          <AppBar position="relative"><h1>Create User</h1></AppBar>
          <table>
            <tbody>
              <tr>
                <td>First Name: </td>
                <td><input
                  type="text"
                  name="first"
                  value={this.state.first}
                  onChange={this.onChange}
                /></td>
              </tr>
              <tr>
                <td>Last Name: </td>
                <td><input
                  name="last"
                  type="text"
                  value={this.state.last}
                  onChange={this.onChange}/></td>
              </tr>
              <tr>
                <td>Sex: </td>
                <td><input
                  name="sex"
                  type="text"
                  value={this.state.sex}
                  onChange={this.onChange}/></td>
              </tr>
              <tr>
                <td>Age: </td>
                <td><input
                  name="age"
                  type="text"
                  value={this.state.age}
                  onChange={this.onChange}/></td>
              </tr>
              <tr>
                <td>Password: </td>
                <td><input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}/></td>
              </tr>
              <tr>
                <td>Repeat Password: </td>
                <td><input
                  name="repeat_password"
                  type="password"
                  value={this.state.repeat_password}
                  onChange={this.onChange}/></td>
              </tr>
              <tr>
                <td><button
                  type="submit"
                  disabled={this.isDisabled()}
                  onClick={() => this.props.onSubmit(this.props.history,this.createUser())}
                  >Add User</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }

export default CreateUser;