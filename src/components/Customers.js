import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  EditingState, 
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  TableFilterRow,
  VirtualTable,
  TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';

import createRowData from './createRowData'

const Customers = () => {
  const [columns] = useState([
    { name: 'id', title: 'Id' },
    { name: 'county', title: 'Country' },
    { name: 'email', title: 'Email' },
    { name: 'firstName', title: 'First name' },
    { name: 'lastName', title: 'Last name' },
    { name: 'street', title: 'Street' },
    { name: 'date', title: 'Date' },
    { name: 'jobTitle', title: 'Job title' },
    { name: 'jobType', title: 'Job type' },
  ]);

  const [rows, setRows] = useState(createRowData(25000));

  const [defaultColumnWidths] = useState([
    { columnName: 'id', width: 240 },
    { columnName: 'county', width: 240} ,
    { columnName: 'email', width: 240 },
    { columnName: 'firstName', width: 240} ,
    { columnName: 'lastName', width: 240 },
    { columnName: 'street', width: 240 },
    { columnName: 'date', width: 240 },
    { columnName: 'jobTitle', width: 240  },
    { columnName: 'jobType', width: 240  },
  ]);


  const getRowId = row => row.id;

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      console.log(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };
  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <EditingState
          onCommitChanges={commitChanges}
        />
        <Table />
        <VirtualTable
          height={800}
        />
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableHeaderRow />
        <TableFilterRow />
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
        />
      </Grid>
    </Paper>
  )
}

export default Customers;