import * as React from 'react';
const ReduxForm = require('redux-form');
import { connect } from 'react-redux';
import * as moment from 'moment';
import * as accounting from 'accounting';

import {Input, Select, DatePick} from '../components/common/form/form-input';
const FloatingActionButton = require('material-ui').FloatingActionButton;
const ContentAdd = require('material-ui/svg-icons').ContentAdd;
const ContentRemove = require('material-ui/svg-icons').ContentRemove;
const Paper = require('material-ui').Paper;
const Divider = require('material-ui').Divider;
const AppBar = require('material-ui').AppBar;
const MenuItem = require('material-ui').MenuItem;


import Form from '../components/common/form/';
import {ClientContact, ProjectContact} from '../models/contactModels';
import {MeasurementAppointment} from '../models/measurements';

import { createClientContact,
      addAdditionalPhoneNumber,
      removeExtraPhone,
      openClientContactModalForPrimary,
      openClientContactModalForSecondary,
      closeClientContactModal,
      openProjectContactModal,
      closeProjectContactModal,
      openMeasurementAppointmentModal,
      closeMeasurementAppointmentModal,
      submitPrimaryClientContactModal,
      submitSecondaryClientContactModal,
      submitProjectContactModal,
      submitMeasurementAppointmentModal,
      changeField } from '../actions/create-project';
import AddClientContactModal from '../components/workflow/add-project/add-client-contact';
import AddProjectContactModal from '../components/workflow/add-project/add-project-contact';
import AddUpdateMeasurementAppointmentModal from '../components/workflow/add-project/add-appointment';


interface IAddProjectFormProps extends React.Props<any> {
  isVisible: boolean;
  onSubmit: () => void;
  openClientContactModalForPrimary : () => void;
  openClientContactModalForSecondary : () => void;
  closeClientContactModal : () => void;
  openProjectContactModal : () => void;
  closeProjectContactModal: () => void;
  openMeasurementAppointmentModal : () => void;
  closeMeasurementAppointmentModal: () => void;
  submitPrimaryClientContactModal: (values) => void;
  submitProjectContactModal: (values) => void;
  submitSecondaryClientContactModal: (values) => void;
  submitMeasurementAppointmentModal: (values) => void;
  addAdditionalPhoneNumber:(values) => void;
  changeField:(form,field,value) => void
  isClientConactDialogOpened: boolean;
  isProjectContactModalOpened: boolean;
  isMeasurementAppointmentModalOpened: boolean;
  clientContact: ClientContact; // todo
  projectContact: ProjectContact; // todo this two fiels might be unneccesary in reducers and components
  selectedPrimaryContact: ClientContact;
  selectedSecondaryContact: ClientContact;
  clientContacts:  ClientContact[];
  projectContacts: ProjectContact[];
  measurementAppointments: MeasurementAppointment[];
  isClientContactModalPrimary : boolean;
  projectContactAdditionalPhoneNumbers:string[];
};

function mapStateToProps(state) {
  return {
    router: state.router,
    clientContact: state.createProject.get('clientContact'),
    projectContact: state.createProject.get('projectContact'),
    isClientConactDialogOpened: state.createProject.get('isClientContactModalOpened'),
    isClientContactModalPrimary: state.createProject.get('isClientContactModalPrimary'),
    isProjectContactModalOpened: state.createProject.get('isProjectContactModalOpened'),
    isMeasurementAppointmentModalOpened: state.createProject.get('isMeasurementAppointmentModalOpened'),
    selectedPrimaryContact : state.createProject.get('selectedPrimaryContact'),
    selectedSecondaryContact: state.createProject.get('selectedSecondaryContact'),
    clientContacts : state.createProject.get('clientContacts'),
    projectContacts : state.createProject.get('projectContacts'),
    measurementAppointments: state.createProject.get('measurementAppointments'),
    projectContactAdditionalPhoneNumbers: state.createProject.get('projectContactAdditionalPhoneNumbers')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createClientContact: () => dispatch(createClientContact()),
    addAdditionalPhoneNumber: (number) => dispatch(addAdditionalPhoneNumber(number)),
    openProjectContactModal: () => dispatch(openProjectContactModal()),
    closeClientContactModal: () => dispatch(closeClientContactModal()),
    openClientContactModalForPrimary: () => dispatch(openClientContactModalForPrimary()),
    openClientContactModalForSecondary: () => dispatch(openClientContactModalForSecondary()),
    closeProjectContactModal: () => dispatch(closeProjectContactModal()),
    openMeasurementAppointmentModal: () => dispatch(openMeasurementAppointmentModal()),
    closeMeasurementAppointmentModal: () => dispatch(closeMeasurementAppointmentModal()),
    removeAdditionalPhoneNumber: (number) => dispatch(removeExtraPhone(number)),
    submitPrimaryClientContactModal: (values) => dispatch(submitPrimaryClientContactModal(values)),
    submitSecondaryClientContactModal: (values) => dispatch(submitSecondaryClientContactModal(values)),
    submitProjectContactModal: (values) => dispatch(submitProjectContactModal(values)),
    submitMeasurementAppointmentModal: (values) => dispatch(submitMeasurementAppointmentModal(values)),
    changeField: (form,field,value) => dispatch(changeField(form,field,value)),
  };
}

 class AddProject extends React.Component<IAddProjectFormProps, void> {

  render() {
    const {
      isVisible,
      onSubmit,
      clientContact,
      projectContact,
      openClientContactModalForPrimary,
      openClientContactModalForSecondary,
      closeClientContactModal,
      openProjectContactModal,
      closeProjectContactModal,
      isClientConactDialogOpened,
      isProjectContactModalOpened,
      isMeasurementAppointmentModalOpened,
      openMeasurementAppointmentModal,
      closeMeasurementAppointmentModal,
      selectedPrimaryContact,
      selectedSecondaryContact,
      clientContacts,
      projectContacts,
      submitPrimaryClientContactModal,
      submitSecondaryClientContactModal,
      isClientContactModalPrimary,
      submitProjectContactModal,
      submitMeasurementAppointmentModal,
      measurementAppointments,
      addAdditionalPhoneNumber,
      projectContactAdditionalPhoneNumbers,
      changeField
    } = this.props;
    return (
          <div>
              <div className="border col col-12">
                    <h2>website top toolbar is under develop</h2>
              </div>
              <div className="border clearfix  col col-9">

              <Form handleSubmit={ onSubmit } >
                <div className='col col-12'>
                  <div className='col col-6' style={{padding:10,paddingBottom:0}}>
                    <Paper zDepth={2} >
                      <AppBar
                        title='Common Information'
                        showMenuIconButton={false}
                      />
                    </Paper>
                      <Input
                            style={{height:47}}
                            name='projectName'
                            label='Project Name'
                            underlineShow={false}
                          />
                      <Divider />
                      <DatePick
                          label='Date Created'
                          fullWidth={true} 
                          underlineShow={false} />
                      <Divider />
                          <DatePick
                            label='Request Install'
                            underlineShow={false}
                            fullWidth={true}  />
                      <Divider />
                          <Select
                              fullWidth={true}
                              label='Project Coordinator'
                              underlineShow={true}
                              value={1}>
                          </Select>
                          <Select
                              fullWidth={true}
                              label='Project Status'
                              underlineShow={true}
                              value={1}>
                          </Select>
                  </div>
                  <div className='col col-6'  style={{padding:10,paddingBottom:0}}>
                    <Paper zDepth={2} >
                      <AppBar
                          title='Client'
                          showMenuIconButton={false}
                        />
                    </Paper>
                      <div style={{margin:10 }}>
                        <div className='col col-12'>
                            <div className='col col-9'>
                              <Select
                                  fullWidth={true}
                                  label='Client'
                                  underlineShow={true}
                                  value={1}>
                              </Select>
                            </div>
                            <div className='col col-3'>
                              <FloatingActionButton mini={true} >
                                  <ContentAdd />
                              </FloatingActionButton>
                          </div>
                        </div>
                        <div className='col col-12'>
                          <div className='col col-9'>
                            <Select
                                fullWidth={true}
                                label='Primary Contact'
                                underlineShow={true}
                                value={selectedPrimaryContact}>
                                  {clientContacts.map(contact =>
                                    <MenuItem value={contact} primaryText={`${contact.firstName}  ${contact.lastName} - ${contact.title}`} />
                                  )}
                            </Select>
                          </div>
                          <div className='col col-3'>
                            <FloatingActionButton mini={true}  onClick={openClientContactModalForPrimary} >
                                <ContentAdd />
                            </FloatingActionButton>
                          </div>
                        </div>
                        <div className='col col-12'>
                          <div className='col col-9'>
                            <Select
                                fullWidth={true}
                                label='Secondary Contact'
                                underlineShow={true}
                                value={selectedSecondaryContact}>
                                {clientContacts.map(contact =>
                                    <MenuItem value={contact} primaryText={`${contact.firstName}  ${contact.lastName} - ${contact.title}`} />
                                  )}
                            </Select>
                          </div>
                          <div className='col col-3'>
                            <FloatingActionButton mini={true} onClick={openClientContactModalForSecondary} >
                                <ContentAdd />
                            </FloatingActionButton>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div className='col col-12'  style={{padding:10,paddingBottom:0}}>
                  <Paper zDepth={2}  className='col col-12'>
                      <AppBar
                        title='<Project> Location'
                        showMenuIconButton={false}
                      />
                  </Paper>
                  <div className='clearfix' >
                    <div className='col col-6' style={{padding:10,paddingRight:35}}>
                        <Select
                            fullWidth={true}
                            label='Install Cost Region'
                            underlineShow={false}
                            value={1}>
                        </Select>
                        <Divider />
                        <Input
                            name='address1'
                            label='Street Address 1'
                            underlineShow={false}
                          />
                        <Divider />
                        <Input
                                  name='address2'
                                  label='Street Address 2'
                                  underlineShow={false}
                                />
                        <Divider />
                    </div>
                    <div className='col col-6' style={{padding:10, paddingLeft:35}}>
                      <Select
                          fullWidth={true}
                          label='State'
                          underlineShow={true}
                          value={1}>
                      </Select>
                      <Input
                                name='City'
                                label='City'
                                underlineShow={false}
                              />
                      <Divider />
                      <Input
                                name='zip'
                                label='Zip Code'
                                underlineShow={false}
                              />
                      <Divider />
                    </div>
                  </div>
                </div>
                <div className='col col-12'  style={{padding:10,paddingBottom:10,minHeight:100}}>
                  <Paper zDepth={2}  className='col col-12'>
                      <AppBar
                        showMenuIconButton={false}
                        title='Project Contacts'
                        iconElementRight={<FloatingActionButton mini={true} secondary={true} onClick={ openProjectContactModal } ><ContentAdd /></FloatingActionButton>}
                      />
                      {projectContacts.map(contact =>
                        <MenuItem value={contact} style={{marginTop:5}} primaryText={
                          <div  className={'ml3 col col-12 flex inline-block'}>
                              <div className={'flex-auto '}>
                                {contact.fullName()} 
                              </div>
                              <div className={'flex-auto '}>
                                {contact.getRole()} 
                              </div> 
                              <div className={'flex-auto '}>
                                 {contact.getPrimaryPhone()}
                              </div> 
                              <div className={'flex-auto '}>
                                <FloatingActionButton style={{lineHeight:0}} mini={true} secondary={true}> 
                                    <ContentRemove /> 
                                </FloatingActionButton>
                            </div> 
                        </div>
                        } />
                      )}
                  </Paper>
                  <Divider />
                </div>
                <div className='col col-12'  style={{padding:10,paddingBottom:10,minHeight:100}}>
                  <Paper zDepth={2}  className='col col-12'>
                      <AppBar
                        showMenuIconButton={false}
                        title='Measurement Appointment'
                        iconElementRight={<FloatingActionButton mini={true} secondary={true} onClick={ openMeasurementAppointmentModal } ><ContentAdd /></FloatingActionButton>}
                      />
                      
                      {measurementAppointments.map(app =>
                                    <MenuItem value={app} style={{marginTop:10}} primaryText={
                                      <div  className={'ml3 col col-6 inline-block'}>
                                          <div className={'col col-4'}>
                                            {moment(app.appointmentDate).format('MM/DD/YY')} 
                                            {moment(app.appointmentTime).format('LT')} 
                                          </div>
                                          <div className={'col col-3'}>
                                            {accounting.formatMoney(app.measurementFee)} 
                                          </div> 
                                          <div className={'col col-3'}>
                                            {app.paymentType} 
                                          </div> 
                                            <FloatingActionButton style={{lineHeight:0}} mini={true} secondary={true}> 
                                                <ContentRemove /> 
                                            </FloatingActionButton>
                                     </div>
                                    } />
                                  )}
                  </Paper>
                  <Divider />
                </div>
                <div className='col col-12'  style={{padding:10,paddingBottom:10,minHeight:100}}>
                  <Paper zDepth={2}  className='col col-12'>
                      <AppBar
                        showMenuIconButton={false}
                        title='Customer Requests'
                        iconElementRight={<FloatingActionButton mini={true} secondary={true}><ContentAdd /></FloatingActionButton>}
                      />
                  </Paper>
                  <Divider />
                </div>
                <AddClientContactModal  isVisible={isClientConactDialogOpened}
                            onSubmit={isClientContactModalPrimary ? submitPrimaryClientContactModal : submitSecondaryClientContactModal}
                            model={clientContact}
                            onCancel={closeClientContactModal}/>
                <AddProjectContactModal isVisible={isProjectContactModalOpened}
                  model={projectContact}
                  onSubmit={submitProjectContactModal}
                  addAdditionalPhoneNumber={addAdditionalPhoneNumber}
                  additionalPhoneNumbers={projectContactAdditionalPhoneNumbers}
                  changeField={changeField}
                  onCancel={closeProjectContactModal}/>
                <AddUpdateMeasurementAppointmentModal
                    isVisible={isMeasurementAppointmentModalOpened}
                    onSubmit={submitMeasurementAppointmentModal}
                    onCancel={closeMeasurementAppointmentModal} />
              </Form>
              </div>
              <div className="border col col-3">
                    <h2>Notes Section. Currently not available</h2>
              </div>
          </div>
    );
  }
}

const validate = (values) => {
  const errors = { firstName: '', lastName: '' };

  return errors;
};

let addProject =  ReduxForm.reduxForm({
  form: 'addProject',
  validate: validate,
})(AddProject);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addProject);
