import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState, useRef, useEffect } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const fieldNames = ['created', 'source', 'content', 'topic', 'numFollowers', 'numFollowing'];

export default function ThreadForm({dispatch, selectedRow}) {

    const formRef = useRef(null);
    const [formValues, setFormValues] = useState({});
    const [isNew, setIsNew] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        if (isNew) {
            dispatch({
                type: 'new',
                data: {
                    ...formValues,
                    created: formValues.created.toDate(),
                }
            })
        }
        else {
            //edit
            dispatch({
                type: 'edit',
                data: {
                    ...formValues,
                    id: selectedRow.id
                 } 
            })
        }
        e.target.reset();
    }

    useEffect( () => {
        if (selectedRow) {
            setFormValues({...selectedRow});
            setIsNew(false);
        }
    }, [selectedRow, formRef])

    const handleChangeValue = (fieldName) => (e) => {
        setFormValues({
            ...formValues,
            [fieldName]: e.target.value
        })
    }

    const handleChangeCreated = (newValue) => {
        setFormValues({
            ...formValues,
            created: newValue
        })
    }

    const handleClear = () => {
        setFormValues({});
        setIsNew(true);
    }

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit} ref={formRef}>
                <DateTimePicker 
                    id="created" 
                    label="created" 
                    className="formField"
                    name="created"
                    value={formValues.created ? dayjs(formValues.created) : null}
                    //value={dayjs(formValues.created) ?? null}
                    onChange={handleChangeCreated}
                />
                <FormControl sx={{ m:.75, minWidth: 95 }}>
                    <InputLabel id="source-label">source</InputLabel>
                    <Select 
                        id="source" 
                        labelId="source-label" 
                        label="source" 
                        variant="outlined" 
                        name="source"
                        value={formValues.source ?? ''}
                        onChange={handleChangeValue('source')}
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
                    name="content"
                    value={formValues.content ?? ''}
                    onChange={handleChangeValue('content')}
                />
                <TextField 
                    id="topic" 
                    label="topic" 
                    variant="outlined" 
                    className="formField"
                    name="topic"
                    value={formValues.topic ?? ''}
                    onChange={handleChangeValue('topic')}
                />
                <TextField 
                    id="numFollowers" 
                    label="followers" 
                    variant="outlined" 
                    className="formField" 
                    inputProps={{ type: 'number'}}
                    name="numFollowers"
                    value={formValues.numFollowers ?? 0}
                    onChange={handleChangeValue('numFollowers')}
                />
                <TextField 
                    id="numFollowing" 
                    label="following" 
                    variant="outlined" 
                    className="formField" 
                    inputProps={{ type: 'number'}}
                    name="numFollowing"
                    value={formValues.numFollowing ?? 0}
                    onChange={handleChangeValue('numFollowing')}
                />
                <div>
                    <Button variant="outlined" type="submit" className="formButton">
                        { !isNew ? 'edit thread' : 'new thread' }
                    </Button>
                    {
                        !isNew ? (
                            <Button variant="text" onClick={handleClear} className="formButton">
                                clear
                            </Button>
                        ) : null
                    }
                </div>
            </form>
        </div>
    )
}