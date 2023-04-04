import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

{/*Edit Button; receiving transaction*/}
export function EditTransactionButton({ transaction }) {

    //hook used for redirection to edit expense page
    const navigate = useNavigate();

    //styling the edit button - Material UI
    const editButtonStyle = {
        fontSize: "0.875rem",
        lineHeight: "1.0625rem",
        px: "3.5rem",
        color: "#000",
        borderColor: "#000",
        borderRadius: "35px",
        ':hover': {
            borderColor: '#000',
            backgroundColor: "#000",
            color: '#fff',
        }
    }

    //on clicking navigate to new expense page and pass along the transaction as an object
    const handleEdit = () => {
        navigate("/EditExpense", {
            state: transaction
        })
    }

    return (
        <Button
            sx={editButtonStyle}
            variant="outlined"
            onClick={handleEdit}>
            Edit
        </Button>
    )
}