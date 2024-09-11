import React, { useContext,useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

//Set a goal for this ID
function SetGoal(){
    const { userId } = useContext(UserContext);
    const ID = userId
    console.log(ID)

    const navigate = useNavigate();

    const groceryElem = useRef(null)
    const extraElem = useRef(null)

    
    //Set a goal for this ID and adding to the Database 
    async function handelSetGoal(e){
        e.preventDefault();
        const grocery = groceryElem.current.value;
        const extra = extraElem.current.value;
        const ID = userId;

        let goal = {
            grocery: grocery,
            extraExpenses : extra,
            user_id : ID
        }
        const res = await fetch('http://localhost:3000/budget', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify(goal
            )
          });
        
          if (!res.ok) {
            console.error('Error in request:', res.statusText);
            return;
          }
          navigate('/AddExpense')
    }


    return(
        <><form onSubmit={handelSetGoal} id='ExpensesForm'>
        <div className='AddCon'>
        <label htmlFor="Grocery">Grocery  $</label>
        <input ref={groceryElem} type="text" id="Grocery"  ></input>
        </div>
        <div className='AddCon'>
        <label htmlFor="ExtraExpenses">Extra Expenses  $</label>
        <input ref={extraElem} type="text" id="ExtraExpenses" ></input>
        </div>
        <button type="submit" id="addGoal">Set Goal</button>
    </form></>
    )
};

export default SetGoal