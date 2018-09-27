//import {users} from './Users';

//1. create state, action, reducer

const users = [
    {
      first: 'Winnie',
      last: 'Pooh',
      sex: 'Male',
      age: 14,
      userID: 0
    },
    {
      first: 'Piglet',
      last: 'Pig',
      sex: 'Male',
      age: 13,
      userID: 1
    },
    {
      first: 'Rabbit',
      last: 'Yellow',
      sex: 'Male',
      age: 16,
      userID: 2
    },
    {
      first: 'Kanga',
      last: 'Roo',
      sex: 'Female',
      age: 20,
      userID: 3
    },
    {
        first: 'Minnie',
        last: 'Mouse',
        sex: 'Female',
        age: 30,
        userID: 4
    }
  ]

//initial state
const initialState = {
    userList: users,
    sort: {
        'first': false,
        'last': false,
        'sex': false,
        'age': false
        },
    ascending: {
        'first': true,
        'last': true,
        'sex': true,
        'age': true
    },
    searchValue: '',
    page: 'userList',
    editUser: '',
}


//actions
export let setList = (userList) => {
    return({type: 'SETUSERLIST', userList: userList});
}
export let setSearch = (searchValue) => {
    return ({type: 'SETSEARCH', searchValue: searchValue});
}
export let setPage = (page) => {
    return ({type: 'SETPAGE', page: page});
} 
export let setSort = (sort) => {
    return ({type: 'SETSORT', sort: sort});
} 
export let setAscending = (ascending) => {
    return ({type: 'SETASCENDING', ascending: ascending});
}
export let setEdit = (editUser) => {
    return ({type: 'SETEDIT', editUser: editUser});
}

//reducer
export const userlistR = (state = initialState, action) => {
    switch(action.type) {
        case 'SETUSERLIST':
            return {...state, userList: action.userList};
        case 'SETSEARCH':
            return {...state, searchValue: action.searchValue};
        case 'SETSORT':
            return {...state, sort: action.sort};
        case 'SETASCENDING':
            return {...state, ascending: action.ascending};
        case 'SETPAGE':
            return {...state, page: action.page};
        case 'SETEDIT':
            return ({...state, editUser: action.editUser});
        default: 
            return state;
    }
}