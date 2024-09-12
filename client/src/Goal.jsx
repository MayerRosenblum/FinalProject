import React, { useContext,useRef, useState } from 'react';
import { UserContext } from './UserContext';

function SeeGoal (){

    const { userId } = useContext(UserContext);
    const ID = userId;

    const [groceryGoal, setgroceryGoal] = useState('');
    const [extraGoal, setextraGoal] = useState('');


  async function getTheGoal(){
    const params = new URLSearchParams();
    params.append('user_id',ID); 
  
    const url = `http://localhost:3000/goal/data?${params.toString()}`;
  
    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error('Error in request:', res.statusText);
            return;
        }
        const result = await res.json();
        console.log(result);
        const items = result[0]
        setgroceryGoal(items.grocery);
        setextraGoal(items.extraexpenses)
    } catch (error) {
        console.error('Error:', error);
    }}

return(
    <><div>
        <button onClick={getTheGoal}>see</button>
        <p>Grocery {groceryGoal}</p>
        <p>Extra {extraGoal}</p>
        </div></>
)

  }


  export default SeeGoal