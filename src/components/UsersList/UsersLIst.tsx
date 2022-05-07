import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from '../Gitgub/github.module.css';

type SearchUserType = {
  login: string
  id: number
}

type SearchResults = {
  items: SearchUserType
}

type UsersListPropsType = {
  term: string
  selectedUser: SearchUserType | null
  onSubmit: (user: SearchUserType) => void
}

export const UsersList = (props: UsersListPropsType) => {
  
  const [users, setUsers] = useState<SearchUserType[]>([]);

  useEffect(() => {
    console.log('useEffect-2-listOfSearch');
    axios.get<SearchResults>(`https://api.github.com/search/users?q=${props.term}`)
    .then(res => setUsers(res.data.items))
  },[props.term])

  return (
    <ul>
    { users.map(item => <li key={item.id} className={props.selectedUser === item ? classes.selected : ""} onClick={() => {props.onSubmit(item); document.title = item}}>{item.login}</li>)}
  </ul>
  )
}
