import * as React from 'react';
import { Typography, Tooltip, IconButton, Toolbar } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3),
        '& .charity': {
            backgroundColor: 'red',
        },
    },
}));

const charity = '0x596Aa50158BFf76F8D08F848d701C83a4F754d9c';

const fields = 'id TimestampEST From To Continent Value Memo TxnHash'.split(' ');

const width = 122;
const renderCell = params => (
    <Tooltip title={params.value}>
        <Typography variant='body2'>
            {params.value}
        </Typography>
    </Tooltip>
)
const columns = [
    { field: 'id', type: 'number' },
    { field: 'TimestampEST', width, renderCell },
    { field: 'From', width, renderCell },
    { field: 'To', renderCell },
    { field: 'Continent', width },
    { field: 'Value', type: 'number', width },
    { field: 'Memo', width },
    { field: 'TxnHash', width, renderCell },
]

export default function DataGridDemo({ rows }) {
    const classes = useStyles();

    const data = {
        rows, columns,
        autoHeight: true,
        pageSize: 5,
        getCellClassName: params => (
            params.field === 'From' && params.value === charity
                ? 'charity' : ''
        ),
        sortModel: [{
            field: 'id',
            sort: 'desc',
        }],
        className: classes.root,
        loading: !rows.length,
    };

    return (
        <DataGrid {...data} />
    );
}
