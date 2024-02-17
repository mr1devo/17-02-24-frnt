import React,{useEffect, useState} from 'react'
import './Login.css'
import Home from '../adminpanel/Home';
import { useNavigate } from 'react-router-dom';
import axios from "axios";



const Login = () => {

    // React States
    const [isSubmitted,setIsSubmitted]=useState('false')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
  const [error, setError] = useState('')
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('http://localhost:4005/loginview', {
        email: email,
        password: password,
    });


    if (response.data.success) {
      // alert('Login Successful');
      // console.log(response.data);
      navigate('/Home');
    }
    else {
      setError('Invalid User Id or Password. Please try again.')
      console.log(response.data);
    }
  } catch (err) {
    setError('Error occured during login . please try again');
  }
};


const navigatetoSignup = ()=>{
  navigate('/Signup');
}

// useEffect(() => {
//   const storevalue =localStorage.getItem("isSubmitted");
//   if(storevalue==="1")
//   {
//     setIsSubmitted(true);
//     console.log(storevalue);
//   }
// },[setIsSubmitted])

const Logout = (e) => {
  localStorage.removeItem("isSubmitted")
  setIsSubmitted(false)
}




const renderForm = (
<div className="login">
<span className="loginTitle">Login</span>
<form className="loginForm" onSubmit={handleSubmit}>
  <label>Email</label>
  <input className="loginInput" type="text"  name="email"  placeholder="Enter your email..."
  value={email}
  onChange={(e) => setEmail(e.target.value)} />

   {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}<br/>

  <label>Password</label>
  <input className="loginInput" type="password" name="password" placeholder="Enter your password..." 
  value={password}
  onChange={(e) => setPassword(e.target.value)}/>

{formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}<br/>

  <button className="loginButton" >Login</button>
  {error && <p style={{ color: 'red' }}>{error}</p>}
</form>
  <button className="loginRegisterButton" onClick={navigatetoSignup}>Register</button>
  </div>
);

return (
  <div>
      {!isSubmitted && renderForm}
      {isSubmitted && <Home checkLogout={Logout}/>}
  </div>
 )
}
  



export default Login



  // JSX code for login form
// return (
//     <div className="app">
//       <div className="login-form">
//         <div className="title">Sign In</div>
//     <div className="form">
//       <form onSubmit={handleSubmit}>
//         <div className="input-container">
//           <label>Username </label>
//           <input type="text" name="email" required placeholder="Enter your EMAIL"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)} />
//           {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
//         </div>
//         <div className="input-container">
//           <label>Password </label>
//           <input type="password" name="password" required placeholder="Enter your Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)} />
//           {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
          
//         </div>
//         <div className="button-container">
//           <input type="submit" value={"Sign In"}/>
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//         <div className="button-container">
//         <button className='signup'>Sign up</button>
//         </div>
//         <div>
         
//         </div>
//       </form>
//     </div>
//     </div>
//     </div>
//   );


// }











 
  // // User Login info
  // const database = [
  //   {
  //     username: "aa",
  //     password: "aa"
  //   }
  // ];

  // const errors = {
  //   uname: "invalid username",
  //   pass: "invalid password"
  // };

  // const handleSubmit = (event) => {
  //   //Prevent page reload
  //   event.preventDefault();
  //   var { uname, pass } = document.forms[0];

  //   // Find user login info
  //   const userData = database.find((user) => user.username === uname.value);

  //   // Compare user info
  //   if (userData) 
  //   {
  //       if (userData.password !== pass.value) 
  //       {
  //           setErrorMessages({ name: "pass", message: errors.pass });
  //       } 
  //       else 
  //       {
  //           localStorage.setItem("isSubmitted",'1')
  //           setIsSubmitted(true);
  //       }
  //   } 
  //   else 
  //   {
  //       setErrorMessages({ name: "uname", message: errors.uname });
  //   }
  // };

  // // Generate JSX code for error message
  // const renderErrorMessage = (name) =>
  //   name === errorMessages.name && (
  //     <div className="error">{errorMessages.message}</div>
  //   );


  // import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Login.css"; // Import the CSS file

// function Login() {
//   const history = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:4005/components/login/", {
//         email,
//         password,
//       });

//       if (response.data === "exist") {
//         history("/home", { state: { id: email } });
//       } else if (response.data === "notexist") {
//         alert("User has not signed up");
//       }
//     } catch (error) {
//       alert("!!");
//       console.error(error);
//     }
//   }

//   return (
//     <div className="login-container">
//       <h1>Login</h1>

//       <form onSubmit={submit}>
//         <input
//           type="email"
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button type="submit">Login</button>
//       </form>

//       <br />
//     </div>
//   );
// }

// export default Login;