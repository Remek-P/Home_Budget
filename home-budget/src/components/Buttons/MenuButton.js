import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Delete, Edit, Sort } from "@mui/icons-material";
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import { DeleteCategory } from "./DeleteCategory";
import { EditCategoryName } from "../Edit/EditCategoryName";


//Overriding default styling for StyledMenu - MUI component
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        marginTop: theme.spacing(1),
        minWidth: 180,
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                marginRight: theme.spacing(1.5),
            },
        },
    },
}));

//Overriding default styling for Menu Button - MUI component
const buttonStyle = {
    padding: 0,
    fontSize: "1.125rem",
    lineHeight: "1.375rem",
    fontWeight: 800,
    color: "#000",
    backgroundColor: "transparent",
    ':hover': {
        color: "#ECECEC",
        backgroundColor: "transparent",
    }
}
//Displays category name/all expanses and serves as a menu button; receiving state and category name
export default function MenuButton({ catName,sortByDateDescending, setSortByDateDescending }) {

    //Default configuration for MUI component (open/close menu)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    //Picking the category name, if no category name is passed from parent component (undefined), display all expenses
    const sectionName = catName !== undefined ? catName : "All expenses";

    //Button MUI on click state setting - default Material UI setting
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    //Open/close the menu (button) - default Material UI setting
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Displaying sorting icon (up or down) based on the user preferences, and passed by state - default descending
    const arrowDirection = sortByDateDescending === true
        ? <VerticalAlignTopIcon />
        : <VerticalAlignBottomIcon />

    //Changing the setSortByDateDescending between true and false and sending it to TransactionList via Details (parent) and closing button menu
    const sortTransactions = () => {
        setSortByDateDescending(prevState => !prevState);
        handleClose()
    }

    //Choosing if Edit name button should be enabled
    const enableEditName = sectionName === "All expenses"

    return (
        <div>
            {/*Menu Button displaying category name/all expenses - Material UI*/}
            <Button
                id="customized-button"
                sx={buttonStyle}
                aria-controls={open ? 'customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
            >
                {sectionName}
            </Button>
            {/*Menu component appearing after click on category name - Material UI*/}
            <StyledMenu
                id="customized-menu"
                MenuListProps={{'aria-labelledby': 'customized-button',}}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {/*Sort button, displaying directional sort icon*/}
                <MenuItem
                    onClick={sortTransactions}
                    disableRipple
                >
                    <Sort />
                    Sort {arrowDirection}
                </MenuItem>
                {/*Edit category button, enabled for category only*/}
                <MenuItem disabled={enableEditName} disableRipple>
                    {/*Icon - Material UI*/}
                    <Edit />
                    {/*Component handling category name edition; passing category name and using setState to pass data to close the menu*/}
                    <EditCategoryName setAnchorEl={setAnchorEl} catName={catName}/>
                </MenuItem>
                {/*Delete category/all expenses button with delete component;*/}
                <MenuItem disableRipple>
                    {/*Icon - Material UI*/}
                    <Delete sx={{color: 'error.main'}} />
                    {/*Component handling category/all expenses deletion; passing category name and using setState to pass data to close the menu*/}
                    <DeleteCategory setAnchorEl={setAnchorEl} catName={catName}/>
                </MenuItem>
            </StyledMenu>
        </div>
    );
}

//TODO: Improve sorting