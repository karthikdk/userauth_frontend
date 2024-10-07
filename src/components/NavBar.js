
import { Link, Route } from 'react-router-dom/cjs/react-router-dom.min'
import '../css/style.css'
import Home from './Home'
import Login from './Login'
import Register from './Reg'
import Account from './Account'

const NavBar = (props) => {
    const {userLogin,handleAuth}=props
  return (
    <div>
      <ul>
        <li><Link to="/" >Home</Link></li>
        {
            userLogin ? (
                <>
                    <li ><Link to='/account'>Account</Link></li>
                    <li><Link onClick={()=>{
                        localStorage.removeItem('token')
                        alert('successfully logged out')
                        handleAuth()
                    }} >Logout</Link></li>
                </>
            ):(
               <>
                 <li><Link to="/register">Register</Link></li>
                 <li><Link to="/login" >Login</Link></li>
               </>
            )
        }
        
      </ul>
      <Route path="/" component={Home} exact={true} ></Route>
      <Route path="/login" render={(props)=>{
        return <Login {...props} handleAuth={handleAuth} />
      }} ></Route>

      <Route path="/register" component={Register} ></Route>
      <Route path="/account" component={Account} ></Route>
    </div>
  )
}

export default NavBar
