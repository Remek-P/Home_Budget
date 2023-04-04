import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { DetailsDate } from "../Details-Components/TransactionsList/TransactionsDetails/DetailsDate";
import { DetailsName } from "../Details-Components/TransactionsList/TransactionsDetails/DetailsName";
import { DetailsValue } from "../Details-Components/TransactionsList/TransactionsDetails/DetailsValue";
import { DetailsCategory } from "../Details-Components/TransactionsList/AccordionExpenseDetails/DetailsCategory";
import { DetailsDescription } from "../Details-Components/TransactionsList/AccordionExpenseDetails/DetailsDescription";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AlertDialogSlideDelete from "../Buttons/AlertDialogSlide(Delete)";
import { EditTransactionButton } from "../Buttons/EditTransactionButton";

//Component displaying transactions in accordion (slide down details) - Material UI; receiving transaction id as a key (from Global Context transactions array) and transaction from mapping from parent
export default function SimpleAccordion({ transaction }) {

    //Overriding default styling of Accordion Material UI component
    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({theme}) => ({
        borderTop: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

    return (
        <div>
            {/*Material UI*/}
            <Accordion>
                {/*Component handling the always visible part of accordion*/}
                <AccordionSummary>
                    <section className="transactionList-accordionSummary__header">
                        {/*Component displaying date, kept as a separate one for further manipulation in the future; passing transaction*/}
                        <DetailsDate transaction={transaction}/>
                        <div className="overview-details-expense__container">
                            {/*Component displaying name, kept as a separate one for further manipulation in the future; passing transaction*/}
                            <DetailsName transaction={transaction}/>
                            {/*Component displaying vale of the transaction, kept as a separate one for further manipulation in the future; passing transaction*/}
                            <DetailsValue transaction={transaction}/>
                        </div>
                    </section>
                </AccordionSummary>
                {/*Component handling the hidden part of accordion*/}
                <AccordionDetails>
                    <section>
                        {/*Category of transaction; passing transaction*/}
                        <DetailsCategory transaction={transaction}/>
                        {/*Description of transaction; passing transaction*/}
                        <DetailsDescription transaction={transaction}/>
                        <div className="accordion-details-buttons">
                            {/*Edit Button; passing transaction*/}
                            <EditTransactionButton transaction={transaction}/>
                            {/*Delete Button; passing transaction*/}
                            <AlertDialogSlideDelete transaction={transaction}/>
                        </div>
                    </section>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

//TODO: refactor the code (SCSS) to match new structure