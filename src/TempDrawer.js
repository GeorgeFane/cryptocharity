import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
const continents = ['Asia', 'Africa', 'NorthAmerica', 'SouthAmerica', 'Antarctica', 'Europe', 'Australia']

export default function TemporaryDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState(false);

    const toggleDrawer = () => setState(!state);

    const Balances = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
        >
            <List>
                {continents.map(cont => (
                    <ListItem>
                        <ListItemText
                            primary={cont + ': ' + props.bals[cont]}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <Button
                onClick={toggleDrawer()}
                color='inherit'
                variant='outlined'
            >
                Balances
            </Button>

            <React.Fragment>
                <Drawer
                    open={state}
                    onClose={toggleDrawer()}
                >
                    <Balances />
                </Drawer>
            </React.Fragment>
        </div>
    );
}
