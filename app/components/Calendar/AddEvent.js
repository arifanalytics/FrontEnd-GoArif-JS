import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import Add from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import FloatingPanel from '../Panel/FloatingPanel';
import AddEventForm from './AddEventForm';
import useStyles from './calendar-jss.js';

function AddEvent(props) {
  const { classes } = useStyles();
  const {
    openForm,
    closeForm,
    addEvent,
    initialValues,
    submit
  } = props;

  const sendValues = useCallback((values) => {
    setTimeout(() => {
      submit(values);
    }, 500); // simulate server latency
  }, [submit]);

  const branch = '';

  return (
    <div>
      <Tooltip title="Add New Event">
        <Fab color="secondary" onClick={() => addEvent()} className={classes.addBtn}>
          <Add />
        </Fab>
      </Tooltip>
      <FloatingPanel title="Add New Event" openForm={openForm} branch={branch} closeForm={() => closeForm()}>
        <AddEventForm
          initialValues={initialValues}
          sendValues={(values) => sendValues(values)}
        />
      </FloatingPanel>
    </div>
  );
}

AddEvent.propTypes = {
  openForm: PropTypes.bool.isRequired,
  addEvent: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default AddEvent;
