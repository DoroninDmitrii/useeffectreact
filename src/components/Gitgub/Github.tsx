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
type UserType = {
  login: string
  id: number
  avatar_url: string
  followers: number
}

const Github = () => {

const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
const [tempSearch, setTempsearch] = useState('it-kamasutra');
const [searchTerm, setSearchTerm] = useState('');
const [users, setUsers] = useState<SearchUserType[]>([]);
const [userDetails, setUserDetails] = useState<null | UserType>(null);
// console.log(searchTerm, '-----');



useEffect(() => {
  console.log('useEffect-1-title');
  if (selectedUser) {
    document.title = selectedUser.login
  }
}, [selectedUser])

useEffect(() => {
  console.log('useEffect-2-listOfSearch');
  axios.get<SearchResults>(`https://api.github.com/search/users?q=${searchTerm}`)
  .then(res => setUsers(res.data.items))
},[searchTerm])


useEffect(() => {
  console.log('useEffect-3-myProfile');
  if (selectedUser) {
    axios.get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
         .then(res => setUserDetails(res.data))
  }
},[selectedUser])

  return ( 
    <div className={classes.container}>
    <div>
      <div>
        <input placeholder='search' value={tempSearch} onChange={(e) => setTempsearch(e.currentTarget.value)}/>
        <button onClick={() => {setSearchTerm(tempSearch)}}>find</button>
      </div>
      <ul>
        { users.map(item => <li key={item.id} className={selectedUser === item ? classes.selected : ""} onClick={() => {setSelectedUser(item); document.title = item}}>{item.login}</li>)}
      </ul>
    </div>
    <div>
      <h2>UserName</h2>
      {userDetails ? 
      <>
      <div>{userDetails.login}</div>
      <div>{userDetails.id}</div>
      <img src={userDetails.avatar_url}/>
      </>
       : <div>Details</div>}
    </div>
  </div>
  );
};

export default Github;
