import React, {useContext, useState} from "react";
import {GlobalContext} from "../../context/GlobalStates";
import {useLocation, useNavigate} from "react-router-dom";

//TODO: styling

//Component for editing transactions
export function EditExpense() {

    //using hook to receive transaction object
    const transaction = useLocation();

    //using hook to navigate back after edition
    const navigate = useNavigate();

    //Import functions from Global Context
    const { editTransaction } = useContext(GlobalContext);

    //storing exchange rates
    const currencies = {
        PLN: {
            sign: "zł",
            value: 1,
        },
        Euro: {
            sign: "€",
            value: 4.7,
        },
        USD: {
            sign: "$",
            value: 4.3,
        },
        GBP: {
            sign: "£",
            value: 5.35,
        },
    };

    //States for assigning new input value
    const [ newName,       setNewName     ] = useState(transaction.state.name);
    const [ newDate,       setNewDate     ] = useState(transaction.state.date);
    const [ newValue,      setNewValue    ] = useState(transaction.state.value);
    const [ newCurrency,   setNewCurrency ] = useState(transaction.state.inputCurrency);
    //TODO: add selection
    const [ newCategory,   setNewCategory ] = useState(transaction.state.category);
    const [ newNotes,      setNewNotes    ] = useState(transaction.state.notes);

    //Deriving month (y+m) variable from date state for sorting
    let month = newDate.replace(/(\d{4})[\/. -]?(\d{2})[\/. -]?(\d{1,2})/, "$1$2");
    //Deriving day (y+m+d) variable from date state for sorting
    let day = newDate.replace(/(\d{4})[\/. -]?(\d{2})[\/. -]?(\d{1,2})/, "$1$2$3");

    //getting currencies' key based on value of chosen currency, for recalculating the cost in national currency
    const getCurrency = (obj, search) => {
        for (let [key, value] of Object.entries(obj)) {
            if (value === search) {
                return [key][0];
            } else if (value && typeof value === 'object') {
                let path = getCurrency(value, search);
                if (path) return [key][0];
            }
        }
    }

    // editing the value and rounding
    const editValue = () => {
        // when only the value changed
        if (newCurrency === transaction.state.inputCurrency && +newValue !== transaction.state.value) {
            return +(+newValue * currencies[getCurrency(currencies, newCurrency)].value).toFixed(2)
        }
        // when only the currency changed
        else if (newCurrency !== transaction.state.inputCurrency && +newValue === transaction.state.value) {
            return +(transaction.state.originalValue * currencies[getCurrency(currencies, newCurrency)].value).toFixed(2)
        }
        // when the value and the currency changed
        else {
            return +(+newValue * currencies[getCurrency(currencies, newCurrency)].value).toFixed(2)
        }
    };

    const editOriginalValue = () => {
        // when only the value changed
        if (newCurrency === transaction.state.inputCurrency && +newValue !== transaction.state.value) {
            return +newValue
        }
        // when only the currency changed
        else if (newCurrency !== transaction.state.inputCurrency && +newValue === transaction.state.value) {
            return +transaction.state.originalValue
        }
        // when the value and the currency changed
        else {
            return +newValue
        }
    };

    //creating payload for reducer to handle edition
    const createNewExpense = () => {
        return {
            id: transaction.state.id,
            name: newName,
            date: newDate,
            month,
            day,
            value: editValue(),
            originalValue: editOriginalValue().toFixed(2),
            currency: "zł",
            inputCurrency: newCurrency,
            category: newCategory,
            notes: newNotes,
        }
    }

    //timer for redirection to expense's category page
    const timeID = () => {
        setTimeout(() => {
            navigate(`/CategoryMain/${newCategory}`);
        }, 1200)
    };

    //preventing reload, assign new values to states (apart from id) and assigning those states to new constant which will be sent to editTransaction function for reducer to handle the editing of the transaction and navigating to category od the transaction
    const onSubmit = event => {
        event.preventDefault();

        editTransaction(createNewExpense());
        timeID();
    }

    const handleCancel = () => {
        navigate(`/CategoryMain/${transaction.state.category}`)
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
                    <select className="expense__form-container__input"
                            required={true}
                            name="currency"
                            id="currency"
                            onChange={event => setNewCurrency(event.target.value)}
                    >
                        <option hidden defaultValue={transaction.state.inputCurrency} >
                            {transaction.state.inputCurrency}
                        </option>
                        {
                            Object.values(currencies).map(option =>
                                <option key={option.sign}
                                        value={option.sign}
                                >
                                    {option.sign}
                                </option>)
                        }
                    </select>
                </div>
                <div className="expense__form-container">
                    {/*TODO: category picking with add category*/}
                    <label htmlFor="category">
                        What is the category of the expense?
                    </label>
                    <input required={true}
                           type="text"
                           value={newCategory}
                           onChange={event => setNewCategory(event.target.value.toLowerCase())}
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