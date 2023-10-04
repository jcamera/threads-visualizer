import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState, useRef } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function ThreadForm({dispatch}) {

    const [createdTime, setCreatedTime] = useState();
    const [source, setSource] = useState('web');
    const formRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch({
            type: 'new',
            data: {
                created: createdTime.toDate(),
                source,
                content: e.target.content.value,
                topic: e.target.topic.value,
                numFollowers: e.target.numFollowers.value,
                numFollowing: e.target.numFollowing.value,
            }
        })
        //formRef.current.reset();
        e.target.reset();
        setCreatedTime(null);
        setSource('web');

    }

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit} ref={formRef}>
                <DateTimePicker 
                    id="source" 
                    label="created" 
                    className="formField"
                    onChange={(newValue) => setCreatedTime(newValue)}
                />
                <FormControl sx={{ m:.75, minWidth: 95 }}>
                    <InputLabel id="source-label">source</InputLabel>
                    <Select 
                        id="source" 
                        labelId="source-label" 
                        label="source" 
                        variant="outlined" 
                        value={source}
                        onChange={ e => setSource(e.target.value)}
                    >
                        <MenuItem value={'web'}>web</MenuItem>
                        <MenuItem value={'mobile'}>mobile</MenuItem>
                        <MenuItem value={'api'}>api</MenuItem>
                    </Select>
                </FormControl>
                <TextField 
                    id="content" 
                    label="content" 
                    variant="outlined" 
                    multiline 
                    className="formField"
                />
                <TextField 
                    id="topic" 
                    label="topic" 
                    variant="outlined" 
                    className="formField"
                />
                <TextField 
                    id="numFollowers" 
                    label="followers" 
                    variant="outlined" 
                    className="formField" 
                    inputProps={{ type: 'number'}}
                />
                <TextField 
                    id="numFollowing" 
                    label="following" 
                    variant="outlined" 
                    className="formField" 
                    inputProps={{ type: 'number'}}
                />
                <div>
                    <Button variant="outlined" type="submit" className="submitButton">
                        add new
                    </Button>
                </div>
            </form>
        </div>
    )
}