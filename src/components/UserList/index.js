import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Table, 
  TableHead, 
  TableRow, 
  TableCell,
  TableBody,
  Button,
  Input,
  InputLabel,
  FormControl,
  AppBar,
  TableSortLabel
} from '@material-ui/core';

class UserList extends Component {
    render() {
      const userList = this.props.userList;
      return(
        <div>
          <AppBar position="relative"><h1>Users</h1></AppBar>
          <FormControl> 
            <InputLabel htmlFor="search">Search:</InputLabel> <Input
                id="search"
                type="text"
                value={this.props.searchValue}
                onChange={this.props.onSearchChange}
              />
          </FormControl>
          <Table>
            <Header
              toggleSort={this.props.toggleSort}
              ascending={this.props.ascending}
            />
            <Body
              userList={userList}
              searchValue={this.props.searchValue}
              sort={this.props.sort}
              ascending={this.props.ascending}
              onDismiss={this.props.onDismiss}
              onClickEdit={this.props.onClickEdit}
            />
          </Table>
          <Button onClick={this.props.toggleCreate}>
              <Link to={process.env.PUBLIC_URL+'/create'}>Create New User</Link>
          </Button>
        </div>
      )
    }
  }

  function Header(props) {
    const firstDir = props.ascending['first'] ? "asc" : "desc";
    const lastDir = props.ascending['last'] ? "asc" : "desc";
    const sexDir = props.ascending['sex'] ? "asc" : "desc";
    const ageDir = props.ascending['age'] ? "asc" : "desc";

    return(
      <TableHead>
        <TableRow>
          <TableCell>Edit</TableCell>
          <TableCell>Delete</TableCell>
          <TableCell>
            <TableSortLabel
                    active={true}
                    direction={firstDir}
                    onClick={() => props.toggleSort('first')}
                  >First Name
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
                    active={true}
                    direction={lastDir}
                    onClick={() => props.toggleSort('last')}
                  >Last Name
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
                    active={true}
                    direction={sexDir}
                    onClick={() => props.toggleSort('sex')}
                  >Sex
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
                    active={true}
                    direction={ageDir}
                    onClick={() => props.toggleSort('age')}
                  >Age
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }


class Body extends Component {

    ascendSort = (toFilter, type) => {
      return toFilter.sort(function(a,b){ return a[type] > b[type] })
    }

    descendSort = (toFilter, type) => {
      return toFilter.sort(function(a,b){ return a[type] < b[type] })
    }

    render() {
      const {userList, sort, ascending, searchValue} = this.props;
      let filterList = userList.filter(user =>
        user.first.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 ||
        user.last.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
      );

      if (sort['first']) { 
        if (ascending['first']) {
          filterList = this.ascendSort(filterList, 'first')
        }
        else { filterList = this.descendSort(filterList, 'first') }
      }
      if (sort['last']) { 
        if (ascending['last']) {
          filterList = this.ascendSort(filterList, 'last')
        }
        else { filterList = this.descendSort(filterList, 'last') }
      }
      if (sort['sex']) { 
        if (ascending['sex']) {
          filterList = this.ascendSort(filterList, 'sex')
        }
        else { filterList = this.descendSort(filterList, 'sex') }
      }
      if (sort['age']) { 
        if (ascending['age']) {
          filterList = this.ascendSort(filterList, 'age')
        }
        else { filterList = this.descendSort(filterList, 'age') }
      }

      return (
        <TableBody>
          {filterList.map( user => (
            <Row
            first={user.first}
            last={user.last}
            sex={user.sex}
            age={user.age}
            key={user.userID}
            userID={user.userID}
            onDismiss={this.props.onDismiss}
            onClickEdit={this.props.onClickEdit}
            />
          ))}
        </TableBody>
      );
    }
  }

  class Row extends Component {

    render() {
      const {first, last, sex, age, userID, onClickEdit, onDismiss} = this.props;

      return (
        <TableRow>
          <TableCell><Button onClick={() => onClickEdit(userID)}><Link to="/edit">Edit</Link></Button></TableCell>
          <TableCell><Button onClick={() => onDismiss(userID)}>Delete</Button></TableCell>
          <TableCell>{first}</TableCell>
          <TableCell>{last}</TableCell>
          <TableCell>{sex}</TableCell>
          <TableCell>{age}</TableCell>
        </TableRow>
      )
    }

  }

export default UserList;