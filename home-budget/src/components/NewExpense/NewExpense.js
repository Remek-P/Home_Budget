import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom"
import {GlobalContext} from "../../context/GlobalStates";
import {Snackbar} from "@mui/material";

//TODO: styling

//Component for adding multiple new transactions and displaying notification after successfully doing so
export function NewExpense() {

    //Import functions from Global Context
    const { addTransaction, transactions } = useContext(GlobalContext);

    //using hook to navigate back to home page
    const navigate = useNavigate();

    // Get the highest id from transaction list and add 1 || if falsy (empty list) choose 1
    const currentID = Math.max(...[...transactions.map(item => item.id)]) + 1 || 1

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

    //States for assigning input value
    // const [ id,         setID       ] = useState(currentID);
    const [ name,       setName     ] = useState("");
    const [ date,       setDate     ] = useState("");
    const [ value,      setValue    ] = useState("");
    //TODO: change currency to default PLN and add selection
    const [ currency,   setCurrency ] = useState(currencies.PLN.sign);
    //TODO: add selection
    const [ category,   setCategory ] = useState("");
    const [ notes,      setNotes    ] = useState("");

    //Snackbar states - Material UI
    const [ open,       setOpen     ] = React.useState(false);

    //Deriving month (y+m) variable from date state for sorting
    let month = date.replace(/(\d{4})[/. -]?(\d{2})[/. -]?(\d{1,2})/, "$1$2");
    //Deriving day (y+m+d) variable from date state for sorting
    let day = date.replace(/(\d{4})[/. -]?(\d{2})[/. -]?(\d{1,2})/, "$1$2$3");

    //handle Snackbar opening - Material UI
    const handleSnackbarOpening = () => {
        setOpen(true);
    };

    //handle Snackbar closing - Material UI
    const handleSnackbarClosing = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    //timer for redirection to expense's category page
    const timeID = () => {
        setTimeout(() => {
            navigate(`/CategoryMain/${category}`);
        }, 1200)
    };

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

    // calculating the value in local currency and rounding it
    const getValue = () => {
        return +(+value * currencies[getCurrency(currencies, currency)].value).toFixed(2)
    };

    const getCategoryList = () => {
        const catSet = new Set([...transactions.map((record) => record.category)]);
        return Array.from(catSet)
    };

    const categoryPicker = () => {
        return (
            getCategoryList().map(option =>
                <option key={option}
                        value={option}
                >
                    {option}
                </option>)
        )
    };

    //creating payload for reducer to handle addition
    const createNewExpense = () => {
        return {
            id: currentID,
            name,
            date,
            month,
            day,
            value: getValue(),
            originalValue: +value,
            currency: "zł",
            inputCurrency: currency,
            category,
            notes,
        }
    };

    //Preventing default reload, setting id to next highest id number, assigning input value to states and assigning those states to new constant which will be sent to addTransaction function for reducer to handle the addition of new transaction to transactions array in Global Context and activating the snackbar
    const onSubmit = event => {
        event.preventDefault();
        // setID((prevState) => prevState + 1);

        addTransaction(createNewExpense());
        handleSnackbarOpening();
        timeID();
        clearTimeout(timeID);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    // function valueOnChange() {
    //     const regExNumerical = /0-9/;
    //     const isPriceNumerical = regExNumerical.test(value);
    //     return isPriceNumerical ? event => setValue(event.target.value) : console.log("Only numerical values are allowed");
    // }

    return (
        <div className="expense">
            <h2 className="expense__header" onClick={handleCancel}>
                New Expense
            </h2>
            <form
                className="expense__form"
                onSubmit={onSubmit}
            >
                <div className="expense__form-container">
                    <label className="expense__form-container__label"
                           htmlFor="name"
                    >
                        What did you pay for?
                    </label>
                    <input className="expense__form-container__input"
                           required={true}
                           autoFocus={true}
                           type="text"
                           value={name}
                           onChange={event => setName(event.target.value)}
                           autoCorrect="on"
                           placeholder="Type the name"
                           name="name"
                           id="name"
                    />
                </div>
                <div className="expense__form-container">
                    <label className="expense__form-container__label"
                           htmlFor="date"
                    >
                        When was the payment made?
                    </label>
                    <input className="expense__form-container__input"
                           required={true}
                           type="date"
                           value={date}
                           onChange={event => setDate(event.target.value)}
                           placeholder="Type the date"
                           name="date"
                           id="date"
                    />
                </div>
                <div className="expense__form-container">
                    <label className="expense__form-container__label"
                           htmlFor="value"
                    >
                        What was the value?
                    </label>
                    <input className="expense__form-container__input"
                           required={true}
                           type="number"
                           value={value}
                           onChange={event => setValue(event.target.value)}
                           placeholder="Type amount"
                           name="value"
                           id="value"
                    />
                </div>
                <div className="expense__form-container">
                    <label className="expense__form-container__label"
                           htmlFor="currency"
                    >
                        What was the currency?
                    </label>
                    <select className="expense__form-container__input"
                            required={true}
                            name="currency"
                            id="currency"
                            onChange={event => setCurrency(event.target.value)}
                    >
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
                    <label className="expense__form-container__label"
                           htmlFor="category"
                    >
                        What is the category?
                    </label>
                    <select className="expense__form-container__input"
                            required={value === ""}
                            name="category"
                            id="category"
                            onChange={event => setCategory(event.target.value.toLowerCase())}
                    >
                        <option value="" hidden>Choose the category</option>
                        {
                            categoryPicker()
                        }
                    </select>
                    <input className="expense__form-container__input"
                           required={value === ""}
                           type="text"
                           value={category}
                           onChange={event => setCategory(event.target.value.toLowerCase())}
                           placeholder="Type the category"
                           name="category"
                           id="category"
                    />
                </div>
                <div className="expense__form-container">
                    <label className="expense__form-container__label"
                           htmlFor="notes"
                    >
                        Add note?
                    </label>
                    <textarea className="expense__form-container__input"
                              name="notes"
                              id="notes"
                              maxLength={80}
                              value={notes}
                              onChange={event => setNotes(event.target.value)}
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
                    <button className="expense__form__button-container__button expense__form__button-container__button-confirm">
                        Add Expense
                    </button>
                </div>
                {/*Component for displaying success notification, after adding a singular transaction*/}
                <Snackbar open={open}
                          autoHideDuration={2000}
                          message="Successfully added transaction"
                          onClose={handleSnackbarClosing}
                />
            </form>
        </div>
    )
}