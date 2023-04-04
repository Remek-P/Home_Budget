import React from "react";

{/*Component displaying date, kept as a separate one for further date manipulation in the future; receiving transaction*/}
export function DetailsDate({ transaction }) {

    return (
        <h5 className="overview-details-expense__header">
            {transaction.date}
        </h5>
    )
}