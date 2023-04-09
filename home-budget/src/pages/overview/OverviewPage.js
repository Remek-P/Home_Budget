import React from "react";
import { Details } from "../../components/Details/Details";
import { FAB } from "../../components/FAB/FAB";

{/*Summ-up and list of all the transactions*/}
export function OverviewPage() {

    return (
        <>
            {/*Component for rendering detailed view of all the transactions, editing and deleting, as well as showing summ-ups*/}
            <Details />
            {/*Button for adding a new transaction*/}
            <FAB />
        </>
    )
}