import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'




const App = (props) => {
  const [userLogin,setUserLogin]=useState(false)
  
  const handleAuth=()=>{
    setUserLogin(!userLogin)
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      handleAuth()
    }
  },[])
  return (
    <div className='container'>
      <h1>User Auth</h1>
      <NavBar userLogin={userLogin} handleAuth={handleAuth} />
      
    </div>
  )
}

export default App
