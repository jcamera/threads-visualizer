import { useReducer } from 'react'
import './App.css'
import TableView from './TableView';
import GraphView from './GraphView';
import Grid from '@mui/material/Grid';


const seedData = [
  {
    id: 1,
    created: new Date(),
    source: 'web',
    content: 'hi there',
    topic: 'sports',
    numFollowers: 6,
    numFollowing: 12,
  },
  {
    id: 2,
    created: new Date(),
    source: 'web',
    content: 'hi there',
    topic: 'sports',
    numFollowers: 18,
    numFollowing: 9,
  },
  {
    id: 3,
    created: new Date(), //.toDateString(),
    source: 'web',
    content: 'hi there',
    topic: 'sports',
    numFollowers: 20,
    numFollowing: 32,
  }
];

function threadsReducer(state, action) {
  return state;
}

function App() {
  const [threadState, threadsDispatch] = useReducer(threadsReducer, seedData)

  return (
    <>
      <h3>threads visualizer</h3>
    

      <Grid container spacing={8} sx={{ justifyContent: 'space-evenly' }}>
        <Grid item xs={12} md={12} sx={{ height: '50vh' }}>
          <GraphView data={threadState} />
        </Grid>
        <Grid item xs={12} md={9} >
          <TableView data={threadState} />
        </Grid>
      </Grid>
    </>
  )
}

export default App
