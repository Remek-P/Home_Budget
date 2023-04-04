import React from "react";
import { useParams } from "react-router-dom";

import { FAB } from "../../components/FAB/FAB";
import { Details } from "../../components/Details/Details";

export function CategoryPage() {

    //using hook, to pass the info for the component, which category is currently displayed
    let { id } = useParams();
    return (
        <>
            {/*Component for rendering detailed view of category transactions, editing and deleting, as well as showing summ-ups; passing the category name from useParams hook*/}
            <Details catName={id}/>
            {/*Button for adding a new transaction*/}
            <FAB />
        </>
    )
}