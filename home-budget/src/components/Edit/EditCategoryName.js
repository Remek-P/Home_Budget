import React, {useContext, useState} from "react";
import { GlobalContext } from "../../context/GlobalStates";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import {Box, TextField} from "@mui/material";

//Settings for Transition MUI component
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
{/*Edit category button, enabled for category only; receiving category name and using setState to pass data to close the menu*/}
export function EditCategoryName({ catName, setAnchorEl }) {

    //Material UI default settings
    const [open, setOpen] = React.useState(false);

    //using state to edit category name, default current category name via default state
    const [newCatName, setNewCatName] = useState(catName)

    //using Global Context to access edit category function
    const { editCategory } = useContext(GlobalContext);

    //using useNavigate to redirect after changing category name
    const navigate = useNavigate();

    //Overriding default button styles
    const buttonStyle = {
        fontSize: "1rem",
        fontWeight: "400",
        lineHeight: "1.75rem",
        padding: 0,
        paddingRight: 1,
        color: "#000",
        border: "inherit",
        ':hover': {
            backgroundColor: "transparent",
        }
    }

    //Opening the dialog window using state
    const handleClickOpen = () => {
        setOpen(true);
    };

    //Closing the dialog for window using state
    const handleClose = () => {
        setOpen(false);
    };

    //Handling the input value
    const handleInput = (event) => {
        setNewCatName(event.target.value.toLowerCase())
    }

    //Handling submit with validation
    const handleSubmit = () => {
        //If new category name isn't an empty string
        if (newCatName !== "") {
            //Capturing old and new category name and assigning to state
            const categoryNameChange = {
                catName,
                newCatName,
            }
            //Reducer function receives the names
            editCategory(categoryNameChange);
            //redirect to new category route
            navigate(`/CategoryMain/${newCatName}`);
            //Closing the dialog window
            handleClose();
            //Passing value to parent to close the menu
            setAnchorEl(null)
        } else {
            //If new category name is an empty string (default name is set to original name by initial state (catName)
            //TODO: make a proper alert (visually)
            alert("Please type new category name")
        }
    }

    return (
        <>
            {/*Rename button - Material UI*/}
            <Button sx={buttonStyle} onClick={handleClickOpen}>
                Rename
            </Button>
            {/*Dialog component, after clicking, closes menu - Material UI*/}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {/*Title - Material UI*/}
                <DialogTitle>"New category name"</DialogTitle>
                {/*Action menu - Material UI*/}
                <DialogActions>
                    <div style={{width: "100%", display: "flex", justifyContent: "space-around"}}>
                        {/*Box component - Material UI*/}
                        <Box
                            sx={{width: "100%",}}
                        >
                            {/*Input for renaming - Material UI*/}
                            <TextField
                                sx={{
                                    marginX: "1rem",
                                    borderBottom: "f000",
                                }}
                                variant="standard"
                                onChange={handleInput}
                            />
                        </Box>
                        {/*Button passing the new name to transactions array in Global Context - Material UI*/}
                        <Button
                            onClick={handleSubmit}
                            sx={buttonStyle}
                        >
                            Rename
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    )
}