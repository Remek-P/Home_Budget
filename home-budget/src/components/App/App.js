import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from "../../pages/main/MainPage";
import { Layout } from '../Layout/Layout';
import { NewExpensePage } from "../../pages/newExpensePage/NewExpensePage";
import { GlobalProvider } from "../../context/GlobalStates";
import { OverviewPage } from "../../pages/overview/OverviewPage";
import { MissingPage } from "../../pages/missingPage/MissingPage";
import { CategoryPage } from "../../pages/categoryPage/CategoryPage";
import { EditExpensePage } from "../../pages/editExpensePage/EditExpensePage";

export function App() {

    return (
        //GlobalProvider for global data access (GlobalState)
        <GlobalProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Layout />}>
                        {/*Home screen with always visible summ-up of all the transactions and automatically generated categories, based on category input from transaction*/}
                        <Route exact path="/" element={<MainPage />}/>
                        {/*Summ-up and list of all the transactions*/}
                        <Route path="/Overview" element={<OverviewPage />} />
                        {/*Summ-up and list of all the transactions in categories*/}
                        <Route path="/CategoryMain">
                            <Route path=":id" element={<CategoryPage />} />
                            {/*<Route path="/CategoryMain/*" element={<Navigate replace to={"/CategoryMain"}/>} />*/}
                        </Route>
                        {/*404*/}
                        <Route path="/*" element={<MissingPage />}/>
                    </Route>
                    {/*Registering new transaction*/}
                    <Route path="/NewExpense" element={<NewExpensePage />}/>
                    {/*Edit transaction*/}
                    <Route path="/EditExpense" element={<EditExpensePage />}/>
                </Routes>
            </Router>
        </GlobalProvider>
    );
}
{/*TODO: clean the APP from rubbish*/}
{/*TODO: move the scss file to new location and rename*/}
