import { useReducer } from 'react'
import './App.css'
import TableView from './TableView';
import GraphView from './GraphView';
import ThreadForm from './ThreadForm';
import Grid from '@mui/material/Grid';
import { generateThreads } from './helpers';


const seedData = generateThreads(10);

function threadsReducer(state, action) {
  switch (action.type) {
    case 'new': 
      return [...state, {
        id: state.length + 1, //todo: change to guid
        ...action.data
      }];
    case 'edit':
      return state.map( thread => {
        if (thread.id == action.data?.id) {
          return action.data;
        }
        else {
          return thread;
        }
      })
    case 'delete':
      return state.filter( thread => thread.id != action.data?.id);
    default:
      return state
  }
}

function App() {
  const [threadState, threadDispatch] = useReducer(threadsReducer, seedData)

  return (
    <>
      <h3>threads visualizer</h3>
    

      <Grid container spacing={8} sx={{ justifyContent: 'space-evenly' }}>
        <Grid item xs={12} md={12} sx={{ height: '50vh' }}>
          <GraphView data={threadState} />
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={12} md={7}>
            <TableView data={threadState} dispatch={threadDispatch}/>
          </Grid>
          <Grid item xs={12} md={5}>
            <ThreadForm dispatch={threadDispatch}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default App
