import React from 'react';
import {Calculator} from "../../../Calculators/Calculator";

export function CategorySumUp({ catName, parentMonth }) {

    return (
        <div className="category-main__sum-up">
            {/*Rendering sum-up from Calculator, and passing category name and parents' month*/}
            <Calculator
                parentCategory={catName}
                parentMonth={parentMonth}
            />
            {/*Currently hardcoded value, in the future for a component showing choice of currency sings and possibly converter*/}
            zł
        </div>
    );
}

//TODO: currency sign