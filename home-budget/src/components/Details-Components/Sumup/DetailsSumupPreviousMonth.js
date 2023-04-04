import React from "react";
import {Calculator} from "../../Calculators/Calculator";

export function DetailsSumupPreviousMonth({ catName }) {

    //Formatting date so the Calculator.js can compare months with months formatted as a 2-digit number (YYYYMM)
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
            Prev. month
            <div className="overview-details-summup__values">
                {/*Rendering sum-up from Calculator, and passing category name and parent's previous month*/}
                <Calculator
                    parentMonth={previousMonth}
                    parentCategory={catName}
                />
                {/*TODO: change to currencySign for global control*/}
                {/*Currently hardcoded value, in the future for a component showing choice of currency sings and possibly converter*/}
                zł
            </div>
        </h5>
    )
}