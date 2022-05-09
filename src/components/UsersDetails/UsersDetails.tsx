import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Timer from '../Timer/Times'

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
  const [second, setSecond] = useState(60)

  useEffect(() => {
    console.log('useEffect-3-myProfile');
    if (props.selectedUser) {
      axios.get<UserType>(`https://api.github.com/users/${props.selectedUser.login}`)
           .then(res => setUserDetails(res.data))
           setSecond(60)
    }
  },[props.selectedUser])

  return (
    <div>
    <h2>UserName</h2>
    {userDetails ? 
    <>
    <Timer second={second} onChange = {(actualTime) => setSecond(actualTime)}/>
    <div>{userDetails.login}</div>
    <div>{userDetails.id}</div>
    <img src={userDetails.avatar_url}/>
    </>
     : <div>Details</div>}
  </div>
  )
}
