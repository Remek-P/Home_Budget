import React, {useContext, useState} from "react";
import {GlobalContext} from "../../context/GlobalStates";
import { useLocation, useNavigate } from "react-router-dom";

//TODO: styling

//Component for editing transactions
export function EditExpense() {

    //using hook to receive transaction object
    const transaction = useLocation();

    //using hook to navigate back after edition
    const navigate = useNavigate();

    //Import functions from Global Context
    const { editTransaction } = useContext(GlobalContext);

    //States for assigning new input value
    const [ newName,       setNewName     ] = useState(transaction.state.name);
    const [ newDate,       setNewDate     ] = useState(transaction.state.date);
    const [ newValue,      setNewValue    ] = useState(transaction.state.value);
    //TODO: change currency to default PLN and add selection
    const [ newCurrency,   setNewCurrency ] = useState(transaction.state.currency);
    //TODO: add selection
    const [ newCategory,   setNewCategory ] = useState(transaction.state.category);
    const [ newNotes,      setNewNotes    ] = useState(transaction.state.notes);

    //Deriving month (y+m) variable from date state for sorting
    let month = newDate.replace(/(\d{4})[\/. -]?(\d{2})[\/. -]?(\d{1,2})/, "$1$2");
    //Deriving day (y+m+d) variable from date state for sorting
    let day = newDate.replace(/(\d{4})[\/. -]?(\d{2})[\/. -]?(\d{1,2})/, "$1$2$3");

    //preventing reload, assign new values to states (apart from id) and assigning those states to new constant which will be sent to editTransaction function for reducer to handle the editing of the transaction and navigating to category od the transaction
    const onSubmit = event => {
        event.preventDefault();

        const editedExpense = {
            id: transaction.state.id,
            name: newName,
            date: newDate,
            month,
            day,
            value: +newValue,
            currency: newCurrency,
            category: newCategory,
            notes: newNotes,
        }
        editTransaction(editedExpense);
        navigate(`/CategoryMain/${editedExpense.category}`);
    }

    const handleCancel = () => {
        navigate("/")
    }

    // function valueOnChange() {
    //     const regExNumerical = /0-9/;
    //     const isPriceNumerical = regExNumerical.test(value);
    //     return isPriceNumerical ? event => setValue(event.target.value) : console.log("Only numerical values are allowed");
    // }

    return (
        <div className="expense">
            <h2 className="expense__header">
                Edit Expense
            </h2>
            <form className="expense__form" onSubmit={onSubmit}>
                <div className="expense__form-container">
                    <label htmlFor="name">
                        What did you pay for?
                    </label>
                    <input required={true}
                           type="text"
                           value={newName}
                           onChange={event => setNewName(event.target.value)}
                           autoCorrect="on"
                           placeholder="Type the name"
                           name="name"
                           id="name"
                    />
                </div>
                <div className="expense__form-container">
                    <label htmlFor="date">
                        When was the payment made?
                    </label>
                    <input required={true}
                           type="date"
                           value={newDate}
                           onChange={event => setNewDate(event.target.value)}
                           placeholder="Type the date"
                           name="date"
                           id="date"
                    />
                </div>
                <div className="expense__form-container">
                    <label htmlFor="value">
                        What was the value?
                    </label>
                    <input required={true}
                           type="number" value={newValue}
                           onChange={event => setNewValue(event.target.value)}
                           placeholder="Type amount"
                           name="value"
                           id="value"
                    />
                </div>
                <div className="expense__form-container">
                    <label htmlFor="currency">
                        What was the currency?
                    </label>
                    <input required={true}
                           type="text"
                           value={newCurrency}
                           onChange={event => setNewCurrency(event.target.value)}
                           placeholder="Choose the currency"
                           name="currency"
                           id="currency"
                           disabled={true}
                    />
                </div>
                <div className="expense__form-container">
                    {/*TODO: category picking with add category*/}
                    <label htmlFor="category">
                        What is the category of the expense?
                    </label>
                    <input required={true}
                           type="text"
                           value={newCategory}
                           onChange={event => setNewCategory(event.target.value)}
                           placeholder="Choose a category"
                           name="category"
                           id="category"
                    />
                </div>
                <div className="expense__form-container">
                    <label htmlFor="notes">
                        Add note?
                    </label>
                    <textarea name="notes"
                              id="notes"
                              maxLength={80}
                              value={newNotes}
                              onChange={event => setNewNotes(event.target.value)}
                              autoCorrect="on"
                              placeholder="Type a note (80 characters)"
                    />
                </div>
                <div className="expense__form__button-container">
                    <button className="expense__form__button-container__button expense__form__button-container__button-cancel"
                            onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button className="expense__form__button-container__button expense__form__button-container__button-confirm"
                    >
                        Edit Expense
                    </button>
                </div>
            </form>
        </div>
    )
}