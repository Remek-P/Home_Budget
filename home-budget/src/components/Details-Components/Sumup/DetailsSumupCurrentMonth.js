import React from "react";
import {Calculator} from "../../Calculators/Calculator";

export function DetailsSumupCurrentMonth({ catName }) {

    //Formatting date so the Calculator.js can compare months with months formatted as a 2-digit number (YYYYMM)
    const currentDate = new Date();
    //Extracting year
    const currentYear = currentDate.toLocaleString("default",{year: "numeric"});
    //Extracting month
    const month = currentDate.toLocaleString("default",{month: "2-digit"});
    //Combining month and year
    const currentMonth = currentYear+month

    return (
        <h5 className="overview-details-summup__header">
            This month
            <div className="overview-details-summup__values">
                {/*Rendering sum-up from Calculator, and passing category name and parents' month*/}
                <Calculator
                    parentMonth={currentMonth}
                    parentCategory={catName}
                />
                {/*TODO: change to currencySign for global control*/}
                {/*Currently hardcoded value, in the future for a component showing choice of currency sings and possibly converter*/}
                zł
            </div>
        </h5>
    )
}