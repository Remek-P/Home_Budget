import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { CardActionArea } from '@mui/material';
import { CategoryHeader } from "./CategoryOverviewComponents/Category-header";
import { CategorySumUp } from "./CategoryOverviewComponents/Category-sum-up";
import { CategoryPercentage } from "./CategoryOverviewComponents/Category-precentage";
import { GlobalContext } from "../../../context/GlobalStates";

//TODO: Add success alert after editing category transaction

export function CategoryMain() {

    //Accessing transactions array from Global State
    const { transactions } = useContext(GlobalContext)

    //Formatting date so the PercentageCalculator.js can compare months formatted as a 2-digit number (YYYYMM)
    const currentDate = new Date();
    //Extracting year
    const currentYear = currentDate.toLocaleString("default",{year: "numeric"});
    //Extracting month
    const month = currentDate.toLocaleString("default",{month: "2-digit"});
    //Combining month and year
    const currentMonth = currentYear+month

    const oneMonthBackDate = new Date();
    //setting the date one month back for comparison
    oneMonthBackDate.setMonth(oneMonthBackDate.getMonth()-1);
    //Extracting year
    const oneMonthBackYear = oneMonthBackDate.toLocaleString("default",{year: "numeric"});
    //Extracting month
    const oneMonthBack = oneMonthBackDate.toLocaleString('default', { month: '2-digit' });
    //Combining month and year
    const previousMonth = oneMonthBackYear+oneMonthBack

    //Sorting copied list of transactions by month variable
    const sortedTransactions = ([...transactions].sort((a, b) => b.month - a.month));
    //Creating an array of categories
    const categoryArray = sortedTransactions.map(transaction => transaction.category);
    // Filtering created array for unique names
    let uniqueCatArray = categoryArray.filter((item,index) => categoryArray.indexOf(item) === index);

    return (
        <ul>
            {/*Rendering list of categories for displaying at home page (catName)*/}
            {
                uniqueCatArray.map((catName, index) =>
                <li key={index}>
                    {/*Generating links for separate categories*/}
                    <Link to={`/CategoryMain/${catName}`}>
                        <p className="category-main">
                            {/*Material UI component - card with styling and animations*/}
                            <CardActionArea sx={{margin: 0, padding: 0}}>
                                <div className="category-main-container">
                                    {/*Component rendering header with the name of the category passed as catName*/}
                                    <CategoryHeader catName={catName}/>
                                    <div className="category-details-container">
                                        {/*Component for rendering sum-up of category expenses (passing Current month and category name for the Calculator) and in the future, the sign of currency*/}
                                        <CategorySumUp
                                            catName={catName}
                                            parentMonth={currentMonth}
                                        />
                                        {/*Component for rendering M2M change in transactions value for category expenses and all expenses (passing Current and previous month, and category name for the Calculator) and in the future, offering other possibilities*/}
                                        <CategoryPercentage
                                            parentCurrentMonth={currentMonth}
                                            parentPreviousMonth={previousMonth}
                                            parentCategory={catName}
                                        />
                                    </div>
                                </div>
                            </CardActionArea>
                        </p>
                    </Link>
                </li>
            )}
        </ul>
    )
}



