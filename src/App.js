import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Tooltip, IconButton, Toolbar } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';

import Web3 from 'web3';
import hex2ascii from 'hex2ascii';

import contract from './contract';
import env from './env';
import Dgrid from './Dgrid';
import Form from './Form';
import Header from './Header';

const url = 'https://sandbox.truffleteams.com/' + env.truffle;
const web3 = new Web3(url);

const user = "0x61eB15d8A761Fc80387F50d84Fbf7Ff47a97d92F";
const charity = "0x596Aa50158BFf76F8D08F848d701C83a4F754d9c";
const store = "0xAf951AE00Ab357b8a2cFa66901E0D4D0F96e397B";

const myContract = new web3.eth.Contract(contract.abi, contract.address);

const continents = ['Asia', 'Africa', 'NorthAmerica', 'SouthAmerica', 'Antarctica', 'Europe', 'Australia']

class Map extends React.Component {
    constructor () {
        super();
        this.state = {
            rows: [],
            bals: {},
        };
        this.getEvents = this.getEvents.bind(this);
    }

    getEvents(error, data) {
        const rows = data.map(row => row.returnValues);
        rows.forEach( (row, id) => {
            row['id'] = id;
            row.TimestampEST = hex2ascii(row.TimestampEST);
            row.Memo = hex2ascii(row.Memo);
            row.Value = Number(row.Value);
            row.Continent = continents[row.Continent];
        })
        this.setState({ rows });
        console.log(rows);
    }

    load() {
        myContract.getPastEvents('trans', {
            fromBlock: 0,
            toBlock: 'latest',
        }, this.getEvents);
    }

    componentDidMount() {
        // get events
        this.load();

        // get balances
        continents.map( (cont, i) => {
            myContract.methods.bals(i)
                .call( (error, result) => this.state.bals[cont] = result);
        });
    }

    render () {
        return (
            <div>
                <Header bals={Object.entries(this.state.bals)} />
                <Toolbar />

                <Form web3={web3} myContract={myContract} />
                <Dgrid rows={this.state.rows} />
            </div>
        );
    }
}

export default Map;
