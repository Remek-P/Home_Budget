import React, {useState} from "react";

import {DetailsSumupCurrentMonth} from "../Details-Components/Sumup/DetailsSumupCurrentMonth";
import {DetailsSumupPreviousMonth} from "../Details-Components/Sumup/DetailsSumupPreviousMonth";
import {DetailsSumupM2MPercentage} from "../Details-Components/Sumup/DetailsSumupM2MPercentage";
import {TransactionsList} from "../Details-Components/TransactionsList/TransactionsList";
import MenuButton from "../Buttons/MenuButton";

//Rendering detailed view (list) of transactions, current and previous month summ-up as well as M2M change
export function Details({ catName }) {

    //Using useState to pass data between components - choose sorting (ascending/descending)
    let [ sortByDateDescending, setSortByDateDescending ] = useState(true);

    return (
        <section className="overview-details">
            <h3 className="overview-details__header">
                {/* Displays category name/all expanses and serves as a menu button; passing state and category name*/}
                <MenuButton
                    setSortByDateDescending={setSortByDateDescending}
                    sortByDateDescending={sortByDateDescending}
                    catName={catName}
                />
            </h3>
            <ul className="overview-details-summup">
                <li>
                    {/*Rendering current month Sum-up; passing category name*/}
                    <DetailsSumupCurrentMonth catName={catName}/>
                </li>
                <li>
                    {/*Rendering previous month Sum-up; passing category name */}
                    <DetailsSumupPreviousMonth catName={catName}/>
                </li>
                <li>
                    {/*Rendering M2M change; passing category name */}
                    <DetailsSumupM2MPercentage catName={catName}/>
                </li>
            </ul>
            <ul>
                {/*Component for rendering the list of transactions in all expenses/chosen category; passing sorting direction and category name*/}
                <TransactionsList
                    sortByDateDescending={sortByDateDescending}
                    catName={catName}
                />
            </ul>
        </section>
    )
}