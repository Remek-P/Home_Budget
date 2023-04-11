//reducer for handling multiple functions for provider
export function AppReducer(state, action) {
    switch (action.type) {
        //deleting a transaction by receiving the id and filtering out it from the whole array
        case "Delete-transaction":
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            };
        //deleting the category by filtering the transactions with specific category out,
        case "Delete-category":
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.category !== action.payload),
                // categoryList: state.categoryList.filter(category => category !== action.payload.name),
            };
        //deleting all transactions by passing empty array
        case "Delete-All-Transactions":
            return {
                ...state,
                transactions: [],
                // categoryList: [],
            };
        //Adding transaction by appending it to transactions array
        case "Add-transaction":
            return {
                ...state,
                transactions: [action.payload, ...state.transactions],
                // categoryList: [action.payload.category, ...state.categoryList].filter((item, index) => [action.payload.category, ...state.categoryList].indexOf(item) === index),
            };
        //Editing single transaction by catching it by passed id and swapping the values
        case "Edit-transaction":
            return {
                ...state,
                transactions: state.transactions.map(record => {
                    if (record.id === action.payload.id) {
                        record = action.payload
                    }
                    return record
                }),
            };
        //Editing the whole category by mapping the category and swapping the values
        case "Edit-category":
            return {
                ...state,
                transactions: state.transactions.map(record => {
                    if (record.category === action.payload.catName) {
                        record.category = action.payload.newCatName
                    }
                    return record
                }),
                // categoryList: state.transactions.map(record => {
                //     if (record === action.payload.catName) {
                //         record = action.payload.newCatName
                //     }
                //     return record;
                // }),
            };
        case "Highest-ID":
            const arrayID = [...state.transactions.map(record => record.id)];
            return Math.max(...arrayID) + 1;
        default:
            return state;
    }
}