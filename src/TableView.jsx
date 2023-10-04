import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { getColumns } from './helpers';


export default function TableView({data, dispatch}) {

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
          data: {
            created: new Date(),
            source: 'web',
            content: '',
          topic: '',
            numFollowers: 0,
            numFollowing: 0,
          }
        })
      }

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid 
          rows={data} 
          columns={columns} 
          hideFooter={true}
          editMode="row"
          processRowUpdate={handleRowUpdate}
          onProcessRowUpdateError={(e) => console.log('process row error: ', e)}
        />
        <Button color="primary" startIcon={<AddIcon />} onClick={handleNewRow}>
            Add thread
        </Button>
      </div>
    );
  }