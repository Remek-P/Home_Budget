import React from 'react';
import { Link } from "react-router-dom";
import { CardActionArea } from '@mui/material';
import { OverviewHeader } from "../OverviewComponents/Overview-header";
import { OverviewSumUp } from "../OverviewComponents/Overview-sum-up";

export function OverviewMain() {

    return (
        <Link to="/Overview">
            <p className="overview-main">
                {/*Material UI component - card with styling and animations*/}
                <CardActionArea sx={{margin: 0, padding: 0}}>
                    <div className="overview-main-container">
                        {/*Component rendering header with title for All expenses, kept in case editing should be implemented*/}
                        <OverviewHeader/>
                        <div className="overview-components-container">
                            {/*Component rendering summ-up of All expenses*/}
                            <OverviewSumUp/>
                        </div>
                    </div>
                </CardActionArea>
            </p>
        </Link>
    );
}

