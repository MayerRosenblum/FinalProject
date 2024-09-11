import React, { useRef, useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import {DateContext } from './DateContext';

function Login(){
    const navigate = useNavigate();

    const emailElem = useRef(null)
    const passwordElem = useRef(null)

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [reasonWhy, setreasonWhy] = useState('');
    const { setUserId } = useContext(UserContext);
    const { setDate } = useContext(DateContext);


    //Get the date after every login
    function getTheDate (){
        const currentDate = new Date();


    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Adding 1 because January is 0
    const year = currentDate.getFullYear();


    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
    }
    

    //Login a user check if user and if pass match then it sets a User ID that is shared with all components
    async function handleLoginSubmit (e) {
        e.preventDefault();
        const email = emailElem.current.value;
        const password = passwordElem.current.value;
        
            const res = await fetch('http://localhost:3000/login', { 
                method: 'POST',
                headers: {
                  "Content-Type": "application/json" 
                },
                body: JSON.stringify({password}
                )
              });
            
              if (!res.ok) {
                console.error('Error in request:', res.statusText);
                return;
              }
            
              const result = await res.json(); // Await res.json() call
              if(email != result.email){
                setreasonWhy('password does not match')
              }else{
            setUserId(result.id)
            setDate(getTheDate())
              navigate("/Welcome")}
      }
      //Adding a new user and takes you to the Welcome page
      async function handleRegisterClick(event) {
        event.preventDefault();
        const email = emailElem.current.value;
        const password = passwordElem.current.value;

        const user = {
            email: email,
            password:password
        }

        const res = await fetch('http://localhost:3000/login/Register', { 
          method: 'POST',
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(user
          )
        });
      
        if (!res.ok) {
          console.error('Error in request:', res.statusText);
          return;
        }
      
        const result = await res.json(); 
        navigate("/Welcome")
      }


    return(
        <>
    <form onSubmit={handleLoginSubmit}>
        <label htmlFor="Email">Email</label>
        <input ref={emailElem} type="text" id="Email" value={email} onChange={(e) => setemail(e.target.value)} required ></input>
        <label htmlFor="Password">Password</label>
        <input ref={passwordElem} type="text" id="Password" value={password} onChange={(e) => setpassword(e.target.value)} required ></input>
        <button type="submit" id="login">Log In</button>
        <button type="button" id="regester" onClick={handleRegisterClick}>regester</button>
    </form>
    <div id='reasonWhy'>{reasonWhy}</div>
        </>
    )
}

export default Login