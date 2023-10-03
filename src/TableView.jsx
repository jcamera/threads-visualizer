import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

const columns = [
    { 
      field: 'created', 
      headerName: 'Created', 
      width: 200, 
      editable: true,
      type: 'dateTime',
    },
    { 
      field: 'source', 
      headerName: 'Source',
      width: 125, 
      editable: true,
      type: 'singleSelect',
      valueOptions: ['web', 'mobile'],
     },
    { 
        field: 'content', 
        headerName: 'Content', 
        width: 200, 
        editable: true },
    { 
        field: 'topic', 
        headerName: 'Topic', 
        width: 125, 
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
          //onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ])
    }
  ];


export default function TableView({data}) {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid 
          rows={data} 
          columns={columns} 
          hideFooter={true}
        />
      </div>
    );
  }