import React, { useContext,useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { DateContext } from './DateContext';
import SetGoal from './SetGoal';

function AddExpense(){
    const { userId } = useContext(UserContext);
    const ID = userId;

    const [expense, setexpense] = useState('');

    const { date } = useContext(DateContext);
    const theDate = date;

    const navigate = useNavigate();

    const totalElem = useRef(null)
    const forElem = useRef(null)
    const commentElem = useRef(null)

    //Adding a expense to the ID and on the categury the user selected
    async function handelAddExpense(e){
        e.preventDefault();
        const total = totalElem.current.value;
        const Categury = forElem.current.value;
        const comment = commentElem.current.value;
        const ID = userId;

        let newExp = {
            category : Categury,
            amount : total,
            comment : comment,
            expense_date: new Date(),
            user_id : ID
        }

        let idAndCategory = {
            user_id :ID,
            category :Categury
        }

        const res = await fetch('http://localhost:3000/expenses', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify(newExp
            )
          });
        
          if (!res.ok) {
            console.error('Error in request:', res.statusText);
            return;
          }
    
    console.log(`total:${total},Categury:${Categury} ,comment: ${comment},ID: ${ID}`)
let theTotal = await getTotal(idAndCategory);

    
}

async function getTotal (idCtaegury){
    const res = await fetch('http://localhost:3000/totalSpent', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(idCtaegury
        )
      });
    
      if (!res.ok) {
        console.error('Error in request:', res.statusText);
        return;
      }

      const  result = await res.json();
      console.log(result.sum)

      setexpense(result.sum)
}





    return(
        <>
        <div>{theDate}</div>
        <form onSubmit={handelAddExpense} id='ExpensesForm'>
        <div className='AddEx'>
        <label htmlFor="totalSpent">Total Spent  $</label>
        <input ref={totalElem} type="text" id="totalSpent" ></input>
        <label htmlFor="for">For</label>
        <select ref={forElem} name="for" id="for">
        <option value="Grocery">Grocery</option>
        <option value="extraExpenses">Extra Expenses</option>
        </select>
        <label htmlFor="comment">Comment</label>
        <textarea id='comment' ref={commentElem} ></textarea>
        <button type="submit" id="AddEx">+</button>
        </div>
        </form>
      <div id='expensesChart'><div id='Categury'>
    <div><p>Grocery</p></div>
    <div><p>Extra expsenses</p></div>
    </div></div>
    <div id='chart'>
        <div id='sunday'><p>Sunday - {expense}<div>$100 For milk</div></p></div>
        <div id='monday'></div>
        <div id='tuesday'></div>
        <div id='wednesday'></div>
        <div id='thursday '></div>
        <div id='friday'></div>
        <div id='saturday'></div>
    </div>
    </>
    )
};

export default AddExpense