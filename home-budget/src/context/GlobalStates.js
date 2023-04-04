import React, {createContext, useReducer,} from "react";
import { AppReducer } from "./AppReducer";

//hardcoded values for presentational purpose, can be deleted
const initialState = {
    transactions: [
        {id: 1, name: "game", date: "2023-01-01", month: "202301", day: "20230101", value: 2000, currency: "zł", category: "gaming", notes: "present for birthday"},
        {id: 2, name: "bread", date: "2022-12-01", month: "202212", day: "20221201", value: 20, currency: "zł", category: "gaming", notes: "present for my birthday"},
        {id: 3, name: "Sigur Ros", date: "2022-11-03", month: "202211", day: "20221103", value: 2000, currency: "zł", category: "concert", notes: "present for my birthday"},
        {id: 4, name: "phone", date: "2022-11-04", month: "202211", day: "20221104", value: 2000, currency: "zł", category: "my", notes: "present for my birthday"},
        {id: 5, name: "skies", date: "2022-11-05", month: "202211", day: "20221105", value: 10, currency: "zł", category: "trips", notes: "present for my birthday"},
        {id: 6, name: "PS5", date: "2022-11-06", month: "202211", day: "20221106", value: 10, currency: "zł", category: "gaming", notes: "present for my birthday"},
        {id: 7, name: "PS6", date: "2022-10-06", month: "202210", day: "20221006", value: 10000, currency: "zł", category: "gaming", notes: "present for my birthdays sssssss s s  s ssssssssssssss ss s s s sssssssssssssssssss s ssssssssssssssssssssss s"},
        {id: 8, name: "Four Tet", date: "2022-10-06", month: "202210", day: "20221006", value: 10000, currency: "zł", category: "concert", notes: "was awesome"},
        {id: 9, name: "Smart bridge", date: "2022-10-06", month: "202210", day: "20221006", value: 300, currency: "zł", category: "my", notes: ""},
    ],
    // categoryList: [],
    // currencySigns: ["$", "zł"],
    // defaultCurrencySign: [],
};

// let catList = [...initialState.transactions.map(transaction => transaction.category).filter((item,index) => initialState.transactions.map(transaction => transaction.category).indexOf(item) === index)];


// console.log(categoryList);

//Global Context for sharing data and function across the app
export const GlobalContext = createContext(initialState);

//creating provider to wrap components that will use Global Context
export const GlobalProvider = ({children}) => {

    //setting state and dispatch for reducer
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function deleteTransaction(id) {
        dispatch({
            type: "Delete-transaction",
            payload: id,
        })
    }

    function deleteCategory(catName) {
        dispatch({
            type: "Delete-category",
            payload: catName
        })
    }

    function deleteAllTransactions() {
        dispatch({
            type: "Delete-All-Transactions",
        })
    }

    function addTransaction(transaction) {
        dispatch({
            type: "Add-transaction",
            payload: transaction,
        })
    }

    function editTransaction(editedExpense) {
        dispatch({
            type: "Edit-transaction",
            payload: editedExpense,
        })
    }

    function editCategory(categoryNameChange) {
        dispatch({
            type: "Edit-category",
            payload: categoryNameChange,
        })
    }
    //providing the provider with access to function
    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions,
                currencySign: state.currencySign,
                categoryList: state.categoryList,
                sortByDate: state.sortByDate,
                deleteTransaction,
                deleteCategory,
                deleteAllTransactions,
                addTransaction,
                editTransaction,
                editCategory,
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

//Named transactions, for future functionality (expense and income)

