import React from "react";
import { OverviewMain } from "../../components/Overview/OverviewMain/OverviewMain";
import { CategoryMain } from "../../components/Category/CatMain/CategoryMain";
import { FAB } from "../../components/FAB/FAB";


//Home page, displaying all expenses and categories (if available) summ-up and button for adding a new transaction
export function MainPage() {
    return (
        <>
            {/*All expenses summ-up*/}
            <OverviewMain />
            {/*Category list and summ-up*/}
            <CategoryMain />
            {/*Button for adding a new transaction*/}
            <FAB />
        </>
    )
}