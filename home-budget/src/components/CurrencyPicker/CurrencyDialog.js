// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
// import {useContext} from "react";
// import {GlobalContext} from "../../context/GlobalStates";
//
// function SimpleDialog(props) {
//
//     const { currencySigns } = useContext(GlobalContext);
//     //
//     const currencies = [...currencySigns];
//
//     const { onClose, selectedValue, open } = props;
//
//     const handleClose = (e) => {
//         onClose(selectedValue);
//     };
//
//     const handleListItemClick = (value) => {
//         onClose(value);
//     };
//
//     return (
//         <Dialog onClose={handleClose} open={open}>
//             <DialogTitle>Choose default currency</DialogTitle>
//             <List sx={{ pt: 0 }}>
//                 {currencies.map((currency) => (
//                     <ListItem button onClick={() => handleListItemClick(currency)} key={currency}>
//                         <ListItemText primary={currency} />
//                     </ListItem>
//                 ))}
//
//                 <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
//                     <ListItemText primary="Add currency" />
//                 </ListItem>
//             </List>
//         </Dialog>
//     );
// }
//
// SimpleDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.string.isRequired,
// };
//
// export default function CurrencyDialog() {
//     const [open, setOpen] = React.useState(false);
//     const [selectedValue, setSelectedValue] = React.useState("zł");
//
//     const buttonStyle = {
//         padding: 0,
//         fontSize: "1rem",
//         fontWeight: "400",
//         lineHeight: "1.75rem",
//         text: "capitalize",
//         color: "#000",
//         border: "inherit",
//         ':hover': {
//             backgroundColor: "transparent",
//             border: "inherit",
//         }
//     }
//
//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//
//     const handleClose = (value) => {
//         setOpen(false);
//         setSelectedValue(value);
//     };
//
//     return (
//         <div>
//             <Button sx={buttonStyle} variant="outlined" onClick={handleClickOpen}>
//                 Selected: {selectedValue}
//             </Button>
//             <SimpleDialog
//                 selectedValue={selectedValue}
//                 open={open}
//                 onClose={handleClose}
//             />
//         </div>
//     );
// }