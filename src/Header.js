import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Typography, Box, Paper, Button, Grid, InputLabel, MenuItem, FormHelperText, FormControl, Select, TextField, Menu } from '@material-ui/core';
import { GitHub, Home } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        margin: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>

                    <IconButton
                        color="inherit"
                        href='https://georgefane.github.io/'
                    >
                        <Home />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        CryptoCharity
                    </Typography>

                    <Typography className={classes.title}>
                        Alex Beloiu, George Fane, Abbas Kagal, Will Wang
                    </Typography>
                    
                    <Button
                        onClick={handleClick}
                        color='inherit'
                    >
                        Balances
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {props.bals.map( ([cont, bal]) => (
                            <MenuItem onClick={handleClose}>
                                {cont}: {bal}
                            </MenuItem>
                        ))}
                    </Menu>

                    <IconButton
                        color="inherit"
                        href='https://github.com/GeorgeFane/cryptocharity'
                        target='_blank'
                    >
                        <GitHub />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
