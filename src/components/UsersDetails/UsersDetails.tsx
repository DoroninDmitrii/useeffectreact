import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Timer from '../Timer/Timer';

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
  const [second, setSecond] = useState(10)
  // console.log(second, '<---')

  useEffect(() => {
    console.log('useEffect-3-myProfile');
    if (props.selectedUser) {
      axios.get<UserType>(`https://api.github.com/users/${props.selectedUser.login}`)
           .then(res => setUserDetails(res.data))
           setSecond(10)
      }
    },[props.selectedUser])

  useEffect(() => {
    if (second < 1) {
      setUserDetails(null)
    }
  }, [second])



  return (
    <div>
    <h2>UserName</h2>
    {userDetails ?
    <> 
    <Timer second={second} setSecond={(actualSecond) => setSecond(actualSecond)} timerKey={userDetails.id}/>
    <div>{userDetails.login}</div>
    <div>{userDetails.id}</div>
    <img src={userDetails.avatar_url}/>
    </>
     : <div>Details</div>}
  </div>
  )
}
