import React from "react";

{/*Description of transaction; receiving transaction*/}
export function DetailsDescription({ transaction }) {
    return (
        <div className="transactionList-accordionSummary__header-expandedDetails">
            <b>Description:</b> {transaction.notes}
        </div>
    )
}