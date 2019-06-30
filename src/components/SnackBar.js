import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const SnackBarComponent = ({open, message, onClose, onCancel}) => <Snackbar
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
    }}
    open={open}
    autoHideDuration={2000}
    onClose={onClose}
    message={<span id="message-id">{message}</span>}
    action={[
        <Button key="undo" color="secondary" size="small" onClick={onCancel}>
            UNDO
        </Button>,
        <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
        >
            <CloseIcon/>
        </IconButton>,
    ]}
/>;

export default SnackBarComponent
