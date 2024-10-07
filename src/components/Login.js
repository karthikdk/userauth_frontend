import React,{useState} from "react";
import axios from "axios";

const Login=(props)=>{
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[errors,setErrors]=useState({})

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            email:email,
            password:password
        }
        //validations
        const validationErrors={}
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
        axios.post('http://localhost:3005/users/login',formData)
        .then((response)=>{
            const result=response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors)
            }else{
                alert('login success')
                localStorage.setItem('token',result.token)
                props.history.push('/')
                props.handleAuth()
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
    const handleChange=(e)=>{
         if(e.target.name ==='email')
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
            <h1>Login with us</h1>
            <form onSubmit={handleSubmit}>
               <div>
                <label htmlFor="form-label">Email</label>
                <input type="email" className="form-control w-50" placeholder="enter email" value={email} onChange={handleChange} name="email"/>
                {errors.email && <span>{errors.email}</span>}  
               </div>
                <div>
                    <label htmlFor="form-label">Password</label>
                    <input type="password" className="form-control w-50" placeholder="enter password" value={password} onChange={handleChange} name="password"/>
                    {errors.password && <span>{errors.password}</span>}  
                </div>
                <div>
                  <input type="submit" value="login" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
export default Login