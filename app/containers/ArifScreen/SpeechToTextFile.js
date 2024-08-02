import React, { useState } from 'react';
import {
  PapperBlock, MaterialDropZone
} from 'dan-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from 'tss-react/mui';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'; // Add axios for HTTP requests
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between', // Space between left and right sections
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  leftSection: {
    flex: 1, // Takes up 50% of the container width
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  rightSection: {
    flex: 1, // Takes up 50% of the container width
  },
  formControl: {
    minWidth: 120,
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
    '& .MuiInputBase-root': {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      padding: theme.spacing(1),
      height: 'auto',
      userSelect: 'text', // Ensures text can be selected
      cursor: 'text', // Ensures cursor remains as text
    },
    '& .MuiInputLabel-root': {
      lineHeight: '1.5rem',
    },
  },
}));

function SpeechToTextFile() {
  const {
    classes
  } = useStyles();
  const [files, setFiles] = useState([]);

  const [dataState, setDataState] = useState({
    languange: '',
  });
  const [name, setName] = useState('');
  const [showButton, setshowButton] = useState(true);

  const handleChange = event => {
    setDataState({
      ...dataState,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeText = event => {
    setName(event.target.value);
  };

  const handleTranscribe = async () => {
    console.log(files[0]);
    setshowButton(false);
    if (files.length === 0) {
      alert('Please upload a file');
      return;
    }
    if (!dataState.languange) {
      alert('Please select a language.');
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('language', dataState.languange);

    try {
      const response = await axios.post(
        'https://arifbackend-upm3c5mlxq-et.a.run.app/Transcribe/SpeechFileToText',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual token
          },
        }
      );
      setName(response.data.result); // Adjust based on the actual response structure
      setshowButton(true);
    } catch (error) {
      console.error('Error during transcription:', error);
      alert('Error during transcription. Please try again.');
      setshowButton(true);
    }
  };

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  return (
    <div>
      <PapperBlock title="Upload only Audio File" icon="ion-ios-images-outline" whiteBg desc="File harus berformat audio dan memiliki ukuran maksimal 2MB">
        <div className={classes.container}>
          <div className={classes.leftSection}>
            <MaterialDropZone
              // acceptedFiles={['audio/mp4', 'audio/m4a', 'audio/mp3', 'audio/wav']}
              files={files}
              showPreviews
              maxSize={30000000}
              filesLimit={1}
              text="Seret dan jatuhkan file audio di sini atau klik"
              onDrop={handleDrop}
            />
            {files.length !== 0 && (<div>{String(files[0].name)}</div>)}
            <form className={classes.leftSection} autoComplete="off">
              <FormControl size="large" variant="standard" className={classes.formControl}>
                <InputLabel htmlFor="languange-simple">Pilih Bahasa Transcribe</InputLabel>
                <Select
                  variant="standard"
                  value={dataState.languange}
                  onChange={handleChange}
                  inputProps={{
                    name: 'languange',
                    id: 'languange-simple',
                  }}
                >
                  <MenuItem value={'id'}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'id'}>Indonesia</MenuItem>
                  <MenuItem value={'en'}>English</MenuItem>
                  <MenuItem value={'jp'}>Japanese</MenuItem>
                  <MenuItem value={'ko'}>Korean</MenuItem>
                  <MenuItem value={'th'}>Thai</MenuItem>
                  <MenuItem value={'zh'}>Chinese </MenuItem>
                </Select>
              </FormControl>
            </form>
            <br/>
            {showButton && (
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                onClick={handleTranscribe}
                color="secondary"
              >
                Transcribe
              </Button>
            )}
            {!showButton && <CircularProgress fullWidth className={classes.progress} />}
          </div>
          <div className={classes.rightSection}>
            <TextField
              id="outlined-name"
              label="Result"
              className={classes.textField}
              value={name}
              onChange={handleChangeText}
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              minRows={20}
              maxRows={20}
              size="medium"
            />
          </div>
        </div>
      </PapperBlock>
    </div>
  );
}

export default SpeechToTextFile;
