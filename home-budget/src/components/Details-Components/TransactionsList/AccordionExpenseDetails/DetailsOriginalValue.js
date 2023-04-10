import React from "react";

{/*Value not converted to local currency of transaction; receiving transaction*/}
export function DetailsOriginalValue({ transaction }) {

  const rightSideCurrencies = ["zł"]
  const sidePicker = () => {
    if (rightSideCurrencies.some(cur => cur === transaction.inputCurrency)) {
      return `${transaction.originalValue}${transaction.inputCurrency}`;
    } else {
      return `${transaction.inputCurrency}${transaction.originalValue}`;
    }
  };

    return (
        <div className="transactionList-accordionSummary__header-expandedDetails">
            <b>Original Value:</b> {sidePicker()}
        </div>
    )
}