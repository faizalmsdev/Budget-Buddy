import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useAddTransaction } from '../../hooks/useAddTransaction'
import { useGetTransactions } from '../../hooks/useGetTransactions';
import "./styles.css";
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';

export const ExpenseTracker =()=>{

    const { addTransaction } = useAddTransaction();
    const { transactions , transactionTotals } = useGetTransactions();
    const {name , profilePhoto} = useGetUserInfo();
    const navigate = useNavigate();

    const [description,setDescription] =useState("");
    const [transactionAmount,setTransactionAmount] =useState(0);
    const [transactionType,setTransactionType] =useState("expense");
    const {balance , income , expenses} = transactionTotals

    const onSubmit = async (e)=>{
        e.preventDefault();
        addTransaction({description , transactionAmount , transactionType,});
        setDescription("");
        setTransactionAmount("");
    }

    const signUserOut = async ()=>{
        try{
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        }catch(err){
            console.log(err)
        }
        
    }

    return (
    <>
        <div className="expense-tracker">
            <div className="container">
                <h1> { name }'s Budget Buddy</h1>
                <div className="balance">
                    <h3>Your Balance</h3>
                    {balance >= 0 ? (
                        <h2> ${balance}</h2> ) :
                        ( <h2>- ${balance * - 1}</h2>)

                    }
                    
                </div>
                <div className="summary">
                    <div className="income">
                        <h4>Income</h4>
                        <p>${income}</p>
                    </div>
                    <div className="expenses">
                        <h4>Expenses</h4>
                        <p>${expenses}</p>
                    </div>
                </div>
                <form  className="add-transaction" onSubmit={onSubmit}>
                    <input type="text" placeholder="Description" value={description} required onChange={(e)=> setDescription(e.target.value)} />
                    <input type="number" placeholder="Amount" value={transactionAmount} required onChange={(e)=> setTransactionAmount(e.target.value)}/>
                    <input type="radio" required id="expense" checked={transactionType === "expense"} value="expense" onChange={(e)=> setTransactionType(e.target.value)}/>
                    <label htmlFor='expense'>Expense</label>
                    <input type="radio" id="income" value="income" checked={transactionType === "income"} onChange={(e)=> setTransactionType(e.target.value)} />
                    <label htmlFor='income' >Income</label>

                    <button type="submit">Add Transactions</button>
                </form>
            </div>
            {profilePhoto && (
                <div className='profile'>
                    <img src={profilePhoto} className='profile-photo' alt="" />
                    <button className="sign-out-button" onClick={signUserOut}>Sign out</button>
                </div>
            )}
        </div>
        <div className="transactions">
            <h3>Transactions</h3>
            <ul>
                {transactions.map((transaction)=>{

                    const {description , transactionAmount , transactionType } = transaction ;

                    return (
                        <li>
                            <h4>{description}</h4>
                            <p>${transactionAmount} . <label style={{color : transactionType === "expense" ? "red" : "green"}}>{transactionType}</label></p>
                        </li>
                    )
                })}
            </ul>
        </div>
    </>
);
}