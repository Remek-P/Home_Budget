import React from "react";
import {Outlet, NavLink} from 'react-router-dom';

export function Layout() {
    return (
        <>
            <div className="layout">
                <NavLink to="/">
                    {/*    This header serves as a home button, and could present user, when the feature will be implemented */}
                    <h1 className="layout__header">
                        Your Budget
                    </h1>
                </NavLink>
                <main>
                    <Outlet/>
                </main>
            </div>
        </>
    )
}