import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';
import CreateUser from './components/CreateUser/';
import EditUser from './components/EditUser/';
import UserList from './components/UserList/';
import {connect} from 'react-redux';
import createHistory from "history/createBrowserHistory";
import {setList, setSearch, setPage, setSort, setAscending, setEdit} from './Reducer';

import {MuiThemeProvider} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class App extends Component {

  onSearchChange = (e) => {
    this.props.setSearchA(e.target.value);
  }

  onDismiss = (userID) => {
    const newUsers = this.props.userList.filter(user => user.userID !== userID );
    this.props.setListA(newUsers);
  }

  toggleSort = (type) => {
    //sort ascending for the first time
    if (this.props.sort[type] === false) {
      let newSort = Object.assign({}, this.props.sort);

      newSort[type] = !newSort[type];
      this.props.setSortA(newSort);
    }
    //toggle ascending and descending
    else {
      let newAscending = Object.assign({}, this.props.ascending);

      newAscending[type] = !newAscending[type];
      this.props.setAscendingA(newAscending);
    }
    
  }

  onClickEdit = (userID) => {
    this.props.setEditA(userID);
  }

  insertNewUser = (history, user) => {
    this.props.setListA([...this.props.userList, user]);
    this.props.setPageA('userList');
    console.log(history);
    history.push('/');
  }

  saveUser = (history, editUser) => {
    let newList = this.props.userList.filter(user => user.userID !== editUser.userID);
    newList = [...newList, editUser];
    this.props.setListA(newList);
    this.props.setPageA('userList');
    history.push('/');
  }

  toggleCreate = () => {
    this.props.setPageA('create');
  }

  render() {

    return (
      <Router history={createHistory({ basename: process.env.PUBLIC_URL })}>
        <MuiThemeProvider theme={theme}>
          <div>
            <Route exact path='/' render={({history})=> (
              <UserList
              userList={this.props.userList}
              editUser={this.props.editUser}
              searchValue={this.props.searchValue}
              onSearchChange={this.onSearchChange}
              toggleSort={this.toggleSort}
              sort={this.props.sort}
              ascending={this.props.ascending}
              onDismiss={this.onDismiss}
              toggleCreate={this.toggleCreate}
              onClickEdit={this.onClickEdit}
            />
            )}/>

            <Route path='/create' render={({history}) => (
              <CreateUser
                mode="create"
                page={this.props.page}
                onSubmit={this.insertNewUser}
                history={history}
              />
            )}/>

            <Route path='/edit' render={({history}) => (
              <EditUser
                page={this.props.page}
                onSubmit={this.saveUser}
                editUser={this.props.editUser}
                userList={this.props.userList}
                history={history}
              />
            )}/>
          </div>
        </MuiThemeProvider>
      </Router>);
  }
}

const mapStateToProps = state => {
  return {
    userList: state.userList,
    sort: state.sort,
    ascending: state.ascending,
    searchValue: state.searchValue,
    page: state.page,
    editUser: state.editUser
  }
}

function mapDispatchToProps(dispatch) {
  return({
    setSearchA: (text)=>{setSearch.searchValue = text; dispatch(setSearch(text))},
    setListA: (list)=>{setList.userList = list; dispatch(setList(list))},
    setPageA: (page)=>{setPage.page = page; dispatch(setPage(page))},
    setSortA: (sort)=>{setSort.sort = sort; dispatch(setSort(sort))},
    setAscendingA: (ascending)=>{setAscending.ascending = ascending; dispatch(setAscending(ascending))},
    setEditA: (editUser)=>{setEdit.editUser = editUser; dispatch(setEdit(editUser))}
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;