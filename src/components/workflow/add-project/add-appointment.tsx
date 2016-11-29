import * as React from 'react';
const ReduxForm = require('redux-form');

import {Input, Select, TimePick, DatePick} from '../../common/form/form-input';
const GridList = require('material-ui').GridList;
const GridTile = require('material-ui').GridTile;
const Dialog = require('material-ui').Dialog;
const MenuItem = require('material-ui').MenuItem;
const FlatButton = require('material-ui').FlatButton;

import {dialogStyles} from '../../../styles/custom-theme';

import {ADD_MEASUREMENT_APPOINTMENT_MODAL_FORM} from '../../../constants/form-names';


interface IMeasurementAppointmentProps extends React.Props<any> {
  isVisible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  handleSubmit: any; // some redux-form stuff
  invalid: boolean; // use to disable submit button 
};

class AddUpdateMeasurementAppointmentModal extends React.Component<IMeasurementAppointmentProps, void> {
  render() {
    const {
      isVisible,
      onSubmit,
      onCancel,
      handleSubmit
    } = this.props;

  const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onClick={onCancel}
      />,
      <FlatButton
        label='Submit'
        primary={true}
        onClick={handleSubmit(onSubmit)}
      />,
    ];
    return (
       <Dialog
          actions={actions}
          modal={true}
          open={isVisible}
          autoDetectWindowHeight ={true}
          autoScrollBodyContent={true}
          title='Measurement Appointment'
          contentStyle={{width: '400', maxWidth: 'none'}}
          titleStyle={dialogStyles.dialogHeader}
        >
        <form >
        <GridList
                cols={2}
                cellHeight={70}
                padding={2}>
              <GridTile cols={2} style={dialogStyles.firstField} >
                  <DatePick
                    name='appointmentDate'
                      label='Appointment Date'
                    fullWidth={true}  />
              </GridTile>
              <GridTile cols={2} >
                  <TimePick
                    name='appointmentTime'
                    fullWidth={true}
                      label='Appointment Time'
                  />
              </GridTile>
              <GridTile cols={2} >
                <Input
                     name='measurementFee'
                    label='Measurement Fee'
                  />
              </GridTile>
              <GridTile cols={2} >
                <Select
                    fullWidth={true}
                    label='Recorder By'
                    value={1}>
                    
                </Select>
              </GridTile>
              <GridTile cols={2} >
                  <DatePick
                    name='recordedDate'
                   label='Recorded Date'
                    fullWidth={true}  />
              </GridTile>
              <GridTile cols={2} >
                <Select
                    fullWidth={true}
                    name='paymentType'
                    label='Payment'>
                      <MenuItem value={'Fee Recieved'} primaryText='Fee Recieved' />
                      <MenuItem value={'Fee Pending'} primaryText='Fee Pending'  />
                </Select>
              </GridTile>
              <GridTile cols={2}  >
                  <Input
                      label='Appointment Notes'
                      multiLine={true}
                      rows={2}
                    />
              </GridTile>
        </GridList>
        </form>
        </Dialog>
    );
  }
}

const validate = (values) => {
  const errors = {}
  const requiredFields = [ 'appointmentDate', 'appointmentTime', 'paymentType', 'measurementFee']
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
};

let addUpdateMeasurementAppointment =  ReduxForm.reduxForm({
  form: ADD_MEASUREMENT_APPOINTMENT_MODAL_FORM,
  validate: validate,
})(AddUpdateMeasurementAppointmentModal);

export default addUpdateMeasurementAppointment;

