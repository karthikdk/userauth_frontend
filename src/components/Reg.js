import React,{useState} from "react";
import axios from 'axios'
import '../css/style.css'

const Register=(props)=>{
    const[username,setUsername]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[errors,setErrors]=useState({})
    

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            username:username,
            email:email,
            password:password
        }

        //validations
        const validationErrors={}

        if(!formData.username.trim()) {
            validationErrors.username = "username is required"
        }
        if(!formData.email.trim()) {
            validationErrors.email = "email is required"
        } else if(!/\S+@\S+\.\S+/.test(formData.email)){
            validationErrors.email = "email is not valid"
        }
        if(!formData.password.trim()) {
            validationErrors.password = "password is required"
        } else if(formData.password.length < 6){
            validationErrors.password = "password should be at least 6 char"
        }
        setErrors(validationErrors)

        if(Object.keys(validationErrors).length === 0) {
            alert("Form Submitted successfully")
        }
        
        axios.post('http://localhost:3005/users/register',formData)
        .then((response)=>{
            const res=response.data
            if(res.hasOwnProperty('errors')){
                alert(res.message)  
            }
            else{
                alert('successfully created account')
                props.history.push('/login')
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
    const handleChange=(e)=>{
        if(e.target.name ==='username')
        {
            setUsername(e.target.value)
        }
        else if(e.target.name ==='email')
        {
            setEmail(e.target.value)
        }
        else if(e.target.name ==='password')
        {
            setPassword(e.target.value)
        }
    }
    return(
        <div className="container">
            <h1>Register With Us</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <label for="text" className="form-label">Enter User Name:</label>
                    <input type="text" className="form-control" placeholder="enter username" value={username} onChange={handleChange} name="username"/>
                    {errors.username && <span>{errors.username}</span>}  
                </div>
                
                <div>
                    <label for="email" className="form-label">Enter Email:</label>
                    <input type="text" className="form-control" placeholder="enter email" value={email} onChange={handleChange} name="email"/>
                    {errors.email && <span>{errors.email}</span>}  
                </div>
                
                <div>
                    <label for="password" className="form-label">Enter Password:</label>
                    <input type="text" className="form-control" placeholder="enter password" value={password} onChange={handleChange} name="password"/>
                    {errors.password && <span>{errors.password}</span>}  
                </div>
                <br/>
                <div class="d-grid vstack gap-3">
                 <input type="submit" value="Register" className="btn btn-primary"/>
                </div>
                
            </form>
        </div>
    )
}
export default Register