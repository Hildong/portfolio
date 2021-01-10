import { useState } from 'react';
import JWT from 'jsonwebtoken'
import '../../Styles/Login.css';
require('dotenv').config()

/*Assign the URL at the top, so I can change it here whenever I need to change it instead of looking for where to change
it all over my code*/
const URL = "http://192.168.0.38:3000/"

function Login() {

  //Create a state object which will hold login credentials 
  const [userObj, setUserObj] = useState({
    name: "",
    password: ""
  })

  //This function check ifs the inputted credentials matches the ones in the config file, and if it does, give user a token
  const login = () => {

    if(userObj.name === process.env.REACT_APP_ADMIN_NAME && userObj.password === process.env.REACT_APP_ADMIN_PASSWORD) {

      //Create a payload obj with a id key holding the value of the admin name
      let payload = {id: process.env.REACT_APP_ADMIN_NAME}
      // Sign the token and save it in the token variable. Also set it to expire in x seconds
      const token = JWT.sign(payload, process.env.REACT_APP_SECRET_TOKEN, {expiresIn: 1000}) 
      //Save token in a cookie named token
      document.cookie = `token=${token}`
      //Redirect to location below
      window.location.href = URL+"admin"

    } else {
      //Alert a message saying the login credentials are wrong 
      alert("Wrong")
    }

  }

  return (
    <div className="login-page">
        <div className="login-form">
          <h1>Admin Login</h1>
          <input placeholder="Admin name" type="text" onChange={(e) => setUserObj(prevState => ({...prevState, name: e.target.value}))}/>
          <input placeholder="Admin password" type="password" onChange={(e) => setUserObj(prevState => ({...prevState, password: e.target.value}))}/>
          <button className="login-btn" onClick={() => login()}>Login</button>
        </div>
        <button className="back-to-portfolio" onClick={() => window.location.href = `${URL}`}>Back To Portfolio</button>
    </div>
  );

}

export default Login;
