import React from "react";

{/*Component displaying name, kept as a separate one for further manipulation in the future; passing transaction*/}
export function DetailsName({ transaction }) {

    return (
        <h4 className="overview-details-expense__container__header">
            {transaction.name}
        </h4>
    )
}

