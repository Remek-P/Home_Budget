import React from "react";
import {PercentageCalculator} from "../../Calculators/PercentageCalculator";

export function DetailsSumupM2MPercentage({ catName }) {

    //Formatting date so the PercentageCalculator.js can compare months with months formatted as a 2-digit number (YYYYMM)
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

    return (
        <h5 className="overview-details-summup__header">
            M2M&nbsp;change
            <div className="overview-details-summup__values">
                <PercentageCalculator
                    parentCurrentMonth={currentMonth}
                    parentPreviousMonth={previousMonth}
                    parentCategory={catName}
                />
            </div>
        </h5>
    )
}