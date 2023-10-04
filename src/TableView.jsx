import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


  function getColumns({handleDeleteClick}) {
    return (
        [
            { 
              field: 'created', 
              headerName: 'Created', 
              width: 150, 
              editable: true,
              type: 'dateTime',
            },
            { 
              field: 'source', 
              headerName: 'Source',
              width: 90, 
              editable: true,
              type: 'singleSelect',
              valueOptions: ['web', 'mobile'],
             },
            { 
                field: 'content', 
                headerName: 'Content', 
                width: 150, 
                editable: true },
            { 
                field: 'topic', 
                headerName: 'Topic', 
                width: 75, 
                editable: true 
            },
            { 
                field: 'numFollowers', 
                headerName: 'Followers', 
                width: 100, 
                type: 'number', 
                editable: true 
            },
            { 
                field: 'numFollowing', 
                headerName: 'Following', 
                width: 100, 
                type: 'number', 
                editable: true },
            {
              field: 'actions',
              type: 'actions',
              //headerName: 'Actions',
              width: 75,
              cellClassName: 'actions',
              getActions: ({ id }) => ([
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
                />,
              ])
            }
          ]
    )
  };


export default function TableView({data, dispatch}) {

    const handleDeleteClick = (id) => () => {
        dispatch({
            type: 'delete',
            data: { id },
          })
    }

    const columns = getColumns({handleDeleteClick});

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