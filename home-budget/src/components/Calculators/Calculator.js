import React, {useContext} from "react";
import { GlobalContext } from "../../context/GlobalStates";

export function Calculator({parentMonth, parentCategory}) {

    //Accessing transactions array from Global State
    const {transactions} = useContext(GlobalContext)

    // Filtering transactions by parents' month
    const filteredTransactionsByMonth = transactions.filter((month) => month.month === parentMonth)

    // Choosing should component render value for category or all expenses
    if (parentCategory === undefined) {
        return (
            <>
                {/*Calculating a sum-up of all expenses, if nothing then render 0*/}
                {filteredTransactionsByMonth.reduce((total, amount) => total + amount.value, 0)}
            </>
        )
    } else {
        return (
            <>
                {/*Calculating a sum-up for given category, if nothing then render 0*/}
                {
                    filteredTransactionsByMonth
                        .filter((category) => category.category === parentCategory)
                        .reduce((total, amount) => total + amount.value, 0)
                }
            </>
        )
    }
}