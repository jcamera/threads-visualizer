import { DataGrid, GridActionsCellItem, gridFilteredSortedRowIdsSelector } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { getColumns, getNewRowDefault } from './helpers';
import { useState } from 'react';


export default function TableView({data, dispatch, setFilteredRows, setSelectedRow, setSortField}) {

    const [filterApplied, setFilterApplied] = useState(false)

    const handleDeleteClick = (id) => () => {
        dispatch({
            type: 'delete',
            data: { id },
          })
    }

    const columns = getColumns(({ id }) => ([
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ]));

    const handleRowUpdate = (newRow, oldRow) => {
        console.log({newRow, oldRow});
        dispatch({
          type: 'edit',
          data: newRow,
        })
        return newRow;
      }
      
      const handleNewRow = () => {
        dispatch({
          type: 'new',
          data: {...getNewRowDefault()}
        })
      }

    const handleFilterModeChange = (model, details) => {
        console.log({model, details})
        setFilterApplied( model.items?.length > 0 && model.items[0]?.value );
    }

    const handleStateChange = (state) => {
        if (filterApplied) {
            const filteredRows = gridFilteredSortedRowIdsSelector(state);
            setFilteredRows(filteredRows);
        }
    }

    const handleRowSelectionModelChange = (ids) => {
        setSelectedRow( ids?.length > 0 ? ids[0] : null);
    }

    // const handleSortModeChange = (model) => {
    //     setSortField( model?.length > 0 ? model[0]?.field : null );
    // }

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid 
          rows={data} 
          columns={columns} 
          hideFooter={true}
          editMode="row"
          processRowUpdate={handleRowUpdate}
          onProcessRowUpdateError={(e) => console.log('process row error: ', e)}
          onFilterModelChange={handleFilterModeChange}
          onStateChange={handleStateChange}
          //onSortModelChange={handleSortModeChange}
          onRowSelectionModelChange={handleRowSelectionModelChange}
        />
        <Button color="primary" startIcon={<AddIcon />} onClick={handleNewRow}>
            Add thread
        </Button>
      </div>
    );
  }