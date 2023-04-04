import React from "react";

{/*Category of transaction; receiving transaction*/}
export function DetailsCategory({ transaction }) {
    return (
        <div className="transactionList-accordionSummary__header-expandedDetails transactionList-accordionSummary__header-expandedDetails-first">
            <b>Category:</b> {transaction.category}
        </div>
    )
}