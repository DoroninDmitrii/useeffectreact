import React, { useEffect, useState } from 'react';
import axios from 'axios';

type UserDetailsType = {
  selectedUser: SearchUserType | null
  }

type UserType = {
  login: string
  id: number
  avatar_url: string
  followers: number
}

export const UsersDetails = (props: UserDetailsType) => {

  const [userDetails, setUserDetails] = useState<null | UserType>(null);

  useEffect(() => {
    console.log('useEffect-3-myProfile');
    if (props.selectedUser) {
      axios.get<UserType>(`https://api.github.com/users/${props.selectedUser.login}`)
           .then(res => setUserDetails(res.data))
    }
  },[props.selectedUser])

  return (
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
  )
}
