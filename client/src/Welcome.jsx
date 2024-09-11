import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome(){

const navigate = useNavigate()
    //takes to the Setgoal page
    function setPage(){
        navigate('/SetGoal')
    }
    //takes to the expense page
    function expensepage(){
        navigate('/AddExpense')
    }
    return(<>
    <div>
        <h1>Welcome to the Budget tracker</h1>
        <button id="setGoal" onClick={setPage}>Set goal</button>
        <button id="addExpense" onClick={expensepage}>Add expense</button>
    </div>
    </>)
}
export default Welcome