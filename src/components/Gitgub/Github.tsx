import React, { useEffect, useState } from 'react';
import classes from './github.module.css';
import { Search } from '../Search/Search'
import { UsersList } from '../UsersList/UsersLIst'
import { UsersDetails } from '../UsersDetails/UsersDetails'

type SearchUserType = {
  login: string
  id: number
}

const Github = () => {

const initialState = 'DoroninDmitrii'  

const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
const [searchTerm, setSearchTerm] = useState(initialState);

useEffect(() => {
  console.log('useEffect-1-title');
  if (selectedUser) {
    document.title = selectedUser.login
  }
}, [selectedUser])

  return ( 
    <div className={classes.container}>
    <div>
      <Search value={searchTerm} onSubmit={(value) => setSearchTerm(value)}/>
      <button onClick={() => setSearchTerm(initialState)}>reset</button>

      <UsersList term={searchTerm} selectedUser={selectedUser} onSubmit={(item) => setSelectedUser(item)}/>
    </div>

    <UsersDetails selectedUser={selectedUser}/>
  </div>
  );
};

export default Github;
