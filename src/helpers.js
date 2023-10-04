import { v4 as uuidv4 } from 'uuid';

const sourceOptions = ['web', 'mobile', 'api'];
const loremTweet = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.';
const topics = ['news', 'sports', 'taylorswift'];

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateThreads(n) {
    let threads = [];
    const minDate = new Date(2000, 0, 1);
    const maxDate = new Date();
    const maxFollowers = 1000;
    for (let i=0; i<n; i++) {
        threads.push({
            id: uuidv4(),
            created: new Date( minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime())),
            source: pickRandom(sourceOptions), 
            content: loremTweet,
            topic: pickRandom(topics),
            numFollowers: Math.floor(Math.random() * maxFollowers), 
            numFollowing: Math.floor(Math.random() * maxFollowers), 
        })
    }
    return threads;
}

export function getColumns(getActions) {
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
              getActions: getActions,
            }
          ]
    )
  };

export function getNewRowDefault() {
    return {
        id: uuidv4(),
            created: new Date(),
            source: sourceOptions[0], 
            content: '',
            topic: '',
            numFollowers: 0, 
            numFollowing: 0,
    }
}

