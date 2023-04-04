import React from "react";

{/*Component displaying vale of the transaction, kept as a separate one for further manipulation in the future; receiving transaction*/}
export function DetailsValue({ transaction }) {

    //TODO: add income handling
    //Future feature - income
    // const sign = transaction.value < 0 ? "-" : "+";

    //Picking the side for currency notation
    // const currencyDisplay = () => {
    //     if (transaction.currency === "zł") {
    //         return transaction.value + transaction.currency
    //         return sign + transaction.value + transaction.currency
    //     } else {
    //         return <span>{transaction.currency}{transaction.value}</span>
    //         return <span>{sign}{transaction.currency}{transaction.value}</span>
    //     }
    // };


    return (
        <div className="overview-details-expense__container__value">
            {transaction.value}{transaction.currency}
        </div>

    )
}
