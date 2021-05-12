import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, makeStyles } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
    // btn: {
    //     fontSize: 60,
    //     backgroundColor: 'violet',
    //     '&: hover': {
    //         backgroundColor: 'blue'
    //     }
    // },
    // title: {
    //     textDecoration: 'underline',
    //     marginBottom: 20
    // }
})

export default function Create() {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    const [category, setCategory] = useState('Money');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setTitleError(false);
        setDetailsError(false);

        if (title == '') {
            setTitleError(true);
        }
        if (details == '') {
            setDetailsError(true);
        }

        if (title && details)
            console.log(title, details, category);

        fetch('http://localhost:8000/notes', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ title, details, category })
        }).then(() => {
            console.log("Submitted");
            history.push('/');
        })
    }

    return (
        <div>
            <Container>
                <Typography
                    variant="h6"
                    component="h2"
                    color="textSecondary"
                    gutterBottom>
                    Create a New Note
                </Typography>
                <form noValidate autoComplete="off">
                    <TextField
                        onChange={(e) => setTitle(e.target.value)}
                        className={classes.field} label="Note Title" variant="outlined" color="secondary"
                        fullWidth required
                        error={titleError}>
                    </TextField>
                    <TextField
                        onChange={(e) => setDetails(e.target.value)}
                        className={classes.field} label="Details" multiline rows={4} variant="outlined" color="secondary"
                        fullWidth required
                        error={detailsError}>
                    </TextField>
                    <FormControl className={classes.field}>
                        <FormLabel>Note Category</FormLabel>
                        <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                            <FormControlLabel value="Money" control={<Radio />} label="Money" />
                            <FormControlLabel value="Todos" control={<Radio />} label="Todos" />
                            <FormControlLabel value="Reminders" control={<Radio />} label="Reminders" />
                            <FormControlLabel value="Work" control={<Radio />} label="Work" />
                        </RadioGroup>
                    </FormControl>
                    <Button onClick={handleSubmit} type="submit" color="secondary"
                        variant="contained" endIcon={<NavigateNextIcon />}> Submit
                    </Button>
                </form>

                {/* icons
                <AcUnitOutlinedIcon /> */}
            </Container>
        </div >

    )
}