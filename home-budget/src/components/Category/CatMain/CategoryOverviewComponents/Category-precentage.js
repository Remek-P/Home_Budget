import React from 'react';
import {PercentageCalculator} from "../../../Calculators/PercentageCalculator";

export function CategoryPercentage({parentCurrentMonth, parentPreviousMonth, parentCategory}) {

    return (
        <div className="category-main__percentage">
            {/*Rendering value from percentage calculator, and passing parents' current and previous month, and category name*/}
            <PercentageCalculator
                parentCurrentMonth={parentCurrentMonth}
                parentPreviousMonth={parentPreviousMonth}
                parentCategory={parentCategory}
            />
        </div>
    );
}