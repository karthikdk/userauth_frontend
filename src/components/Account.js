import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Account = (props) => {
    const [user,setUser]=useState({})
    useEffect(()=>{
        axios.post('http://localhost:3005/users/account',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then((response)=>{
            // const result=response.data
            // setUser(result)
            console.log(response.data)
        })
        .catch((e)=>{
            console.log(e)
        })
    },[])
  return (
    <div>
      <h1>Account Details</h1>
    </div>
  )
}

export default Account
