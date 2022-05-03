import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classes from './github.module.css';

type SearchUserType = {
  login: string
  id: number
}
type SearchResults = {
  items: SearchUserType
}

const Github = () => {

const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
const [users, setUsers] = useState<SearchUserType>([])

useEffect(() => {
  console.log('useEffect-1');
  if (selectedUser) {
    document.title = selectedUser.login
  }
}, [selectedUser])

useEffect(() => {
  console.log('useEffect-2');
  
  axios.get<SearchResults>('https://api.github.com/search/users?q=it-kamasutra')
       .then(res => setUsers(res.data.items))
}, [])



  return ( 
    <div className={classes.container}>
    <div>
      <div>
        <input placeholder='search'/> <button>find</button>
      </div>
      <ul>
        { users.map(item => <li key={item.id} className={selectedUser === item ? classes.selected : ""} onClick={() => {setSelectedUser(item); document.title = item}}>{item.login}</li>)}
      </ul>
    </div>
    <div>
      <h2>UserName</h2>
      <div>Details</div>
    </div>
  </div>
  );
};

export default Github;
