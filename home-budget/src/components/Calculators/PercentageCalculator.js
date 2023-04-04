import React, {useContext} from "react";
import {GlobalContext} from "../../context/GlobalStates";

export function PercentageCalculator({parentCurrentMonth, parentPreviousMonth, parentCategory}) {

    //Accessing transactions array from Global State
    const { transactions } = useContext(GlobalContext)

    //Calculating percentage value for All Expenses
    //Calculating value of current month expenses
    const currentMonth = transactions
                                .filter((month) => month.month === parentCurrentMonth)
                                .reduce((total, amount) => total + amount.value, 0);
    //Calculating value of previous month expenses
    const previousMonth = transactions
                                .filter((month) => month.month === parentPreviousMonth)
                                .reduce((total, amount) => total + amount.value, 0);
    //Avoiding displaying infinity, if previous month is 0, and rounding to one decimal place
    const percentage = previousMonth === 0
        ? 0
        : (((currentMonth - previousMonth) / (previousMonth)) * 100).toFixed(1)

    //Calculating percentage value for a category
    //Calculating value of current month expenses
    const categoryCurrentMonth = transactions
                                        .filter((month) => month.month === parentCurrentMonth)
                                        .filter((category) => category.category === parentCategory)
                                        .reduce((total, amount) => total + amount.value, 0);
    //Calculating value of previous month expenses
    const categoryPreviousMonth = transactions
                                        .filter((month) => month.month === parentPreviousMonth)
                                        .filter((category) => category.category === parentCategory)
                                        .reduce((total, amount) => total + amount.value, 0)
    //Avoiding displaying infinity, if previous month is 0, and rounding to one decimal place
    const categoryPercentage = categoryPreviousMonth === 0
        ? 0
        : (((categoryCurrentMonth - categoryPreviousMonth) / (categoryPreviousMonth)) * 100).toFixed(1)

    //Rendering the value for all expenses (if parentCategory is undefined) or value for category
    if (parentCategory === undefined) {
        return (
            <>
                {percentage}%
            </>
        )
    } else {
        return (
            <>
                {categoryPercentage}%
            </>
        )
    }
}