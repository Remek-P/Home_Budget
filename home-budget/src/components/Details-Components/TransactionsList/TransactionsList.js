import React, {useContext} from "react";
import {GlobalContext} from "../../../context/GlobalStates";

import SimpleAccordion from "../../Accordion/Accordion";

{/*Component for rendering the list of transactions in all expenses/chosen category; receiving sorting direction and category name*/}
export function TransactionsList({ catName, sortByDateDescending }) {

    //Accessing transactions array from Global State
    const { transactions } = useContext(GlobalContext);

    //Sorting by day (y+m+d) descending all the transactions
    const sortTransactionsDescending = [...transactions].sort((a, b) => b.day - a.day);

    //Sorting by day (y+m+d) ascending all the transactions
    const sortTransactionsAscending = [...transactions].sort((a, b) => a.day - b.day);

    //Choosing if descending or ascending by receiving true/false from sort button in MenuButton via Details
    let sortedTransactions = sortByDateDescending === true
        ? sortTransactionsDescending
        : sortTransactionsAscending

    //Filtering transactions that belong to chosen category, passed from parent component
    const filteredTransactions = sortedTransactions.filter(category => category.category === catName);
    //Checking if Category (filtering) or All expenses (without filtering) transactions should be displayed
    const picker = catName !== undefined ? filteredTransactions : sortedTransactions;

    return (
        <>
            {picker
                //Mapping of single transaction from all the transactions, to display them one by one in accordion (slide down details) - Material UI; passing transaction id as a key (from Global Context transactions array) and transaction from mapping
                .map(transaction =>
                    <SimpleAccordion
                        key={transaction.id}
                        transaction={transaction}
                    />
                )
            }
        </>
    )
}