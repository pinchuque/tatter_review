import {
  UPDATE_CLIENT_INFO_SUCCESS,
  UPDATE_CLIENT_INFO_PENDING,
  UPDATE_CLIENT_INFO_ERROR,
  ADD_ADDITIONAL_PHONE_NUMBER_TO_CLIENT,
  REMOVE_ADDITIONAL_PHONE_NUMBER_TO_CLIENT,
  OPEN_ADD_CLIENT_CONTACT_MODAL,
  CLOSE_ADD_CLIENT_CONTACT_MODAL,
  OPEN_ADD_PROJECT_CONTACT_MODAL,
  CLOSE_ADD_PROJECT_CONTACT_MODAL,
  OPEN_MEASUREMENT_APPOINTMENT_MODAL,
  CLOSE_MEASUREMENT_APPOINTMENT_MODAL,
  ADD_CLIENT_CONTACT,
  SUBMIT_PRIMARY_CLIENT_CONTACT_MODAL,
  SUBMIT_SECONDARY_CLIENT_CONTACT_MODAL,
  SUBMIT_PROJECT_CONTACT_MODAL,
  SET_PRIMARY_CLIENT_CONTACT,
  SET_SECONDARY_CLIENT_CONTACT,
  ADD_PROJECT_CONTACT,
  SUBMIT_MEASUREMENT_APPOINTMENT_MODAL,
  ADD_MEASUREMENT_APPOINTMENT,
} from '../constants';

import {
  ADD_CLIENT_CONTACT_MODAL_FORM,
  ADD_PROJECT_CONTACT_MODAL_FORM,
  ADD_MEASUREMENT_APPOINTMENT_MODAL_FORM
} from '../constants/form-names';

import {ClientContact, ProjectContact} from '../models/contactModels'
import {MeasurementAppointment} from '../models/measurements'
const {reset,change}  =  require('redux-form');

import createInstanceFromJson from '../utils/from-js-to-class'

export function createClientContact() {
  return (dispatch, getState) => {
    return dispatch({
      type: 
        UPDATE_CLIENT_INFO_PENDING,
    });
  };
}

export function addAdditionalPhoneNumber(number) {
  return (dispatch, getState) => {
    return dispatch({
      type:  ADD_ADDITIONAL_PHONE_NUMBER_TO_CLIENT,
      payload: number 
      })
    };
  };
  


export function removeExtraPhone(number) {
  return (dispatch, getState) => {
    return dispatch({
      type:  REMOVE_ADDITIONAL_PHONE_NUMBER_TO_CLIENT,
        payload: number
    });
  };
}

export const openClientContactModalForPrimary = ( isClientContactModalOpened = true, isClientContactModalPrimary = true ) => ({
      type: OPEN_ADD_CLIENT_CONTACT_MODAL,
      payload:{isClientContactModalOpened, isClientContactModalPrimary}
});

export const openClientContactModalForSecondary = ( isClientContactModalOpened = true, isClientContactModalPrimary= false   ) => ({
      type: OPEN_ADD_CLIENT_CONTACT_MODAL,
      payload:{isClientContactModalOpened, isClientContactModalPrimary}
});

export const closeClientContactModal = ( isClientContactModalOpened = false ) => ({
      type: CLOSE_ADD_CLIENT_CONTACT_MODAL,
      payload:{isClientContactModalOpened}
});

export const openProjectContactModal = ( isProjectContactModalOpened = true ) => ({
      type: OPEN_ADD_PROJECT_CONTACT_MODAL,
      payload:{isProjectContactModalOpened}
});

export const closeProjectContactModal = ( isProjectContactModalOpened = false ) => ({
      type: CLOSE_ADD_PROJECT_CONTACT_MODAL,
      payload:{isProjectContactModalOpened}
});

export const openMeasurementAppointmentModal = ( isMeasurementAppointmentModalOpened = true ) => ({
      type: OPEN_MEASUREMENT_APPOINTMENT_MODAL,
      payload:{isMeasurementAppointmentModalOpened}
});

export const closeMeasurementAppointmentModal = ( isMeasurementAppointmentModalOpened = false ) => ({
      type: CLOSE_MEASUREMENT_APPOINTMENT_MODAL,
      payload:{isMeasurementAppointmentModalOpened}
});

 export const saveToClientContacts = (clientContact) =>({
   type: ADD_CLIENT_CONTACT,
   payload: clientContact
 })

 export const setPrimaryClientContact = ( selectedPrimaryContact ) =>({
   type: SET_PRIMARY_CLIENT_CONTACT,
   payload: {selectedPrimaryContact}
 })

export function submitPrimaryClientContactModal(values) {
  return dispatch => {
    var clientContact = createInstanceFromJson(ClientContact ,values)
    return dispatch({
      type: SUBMIT_PRIMARY_CLIENT_CONTACT_MODAL,
      payload: Promise.all([
        dispatch(setPrimaryClientContact(clientContact)),
        dispatch(saveToClientContacts(clientContact)),
        dispatch(reset(ADD_CLIENT_CONTACT_MODAL_FORM)),
        dispatch(closeClientContactModal())
      ])
    })
  };
}

 export const setSecondaryClientContact = ( selectedSecondaryContact ) =>({
   type: SET_SECONDARY_CLIENT_CONTACT,
   payload: {selectedSecondaryContact}
 })

export function submitSecondaryClientContactModal(values) {
  return dispatch => {
    var clientContact = createInstanceFromJson(ClientContact ,values)
    return dispatch({
      type: SUBMIT_SECONDARY_CLIENT_CONTACT_MODAL,
      payload: Promise.all([
        dispatch(setSecondaryClientContact(clientContact)),
        dispatch(saveToClientContacts(clientContact)),
        dispatch(reset(ADD_CLIENT_CONTACT_MODAL_FORM)),
        dispatch(closeClientContactModal())
      ])
    })
  };
}

 export const saveToProjectContacts = (projectContact) =>({
   type: ADD_PROJECT_CONTACT,
   payload: projectContact
 })

export function submitProjectContactModal(values) {
  return dispatch => {
    var projectContact = createInstanceFromJson(ProjectContact ,values)
    return dispatch({
      type: SUBMIT_PROJECT_CONTACT_MODAL,
      payload: Promise.all([
        dispatch(saveToProjectContacts(projectContact)),
        dispatch(reset(ADD_PROJECT_CONTACT_MODAL_FORM)),
        dispatch(closeProjectContactModal())
      ])
    })
  };
}
 export const saveToMeasurementAppointments = (appointment) =>({
   type: ADD_MEASUREMENT_APPOINTMENT,
   payload: appointment
 })

export function submitMeasurementAppointmentModal(values) {
  return dispatch => {
    var appointment = createInstanceFromJson(MeasurementAppointment ,values)
    return dispatch({
      type: SUBMIT_MEASUREMENT_APPOINTMENT_MODAL,
      payload: Promise.all([
        dispatch(saveToMeasurementAppointments(appointment)),
        dispatch(reset(ADD_MEASUREMENT_APPOINTMENT_MODAL_FORM)),
        dispatch(closeMeasurementAppointmentModal())
      ])
    })
  };
}

export function changeField(form,field, value){
  return dispatch => {
    return dispatch(change(form,field,value))
  }
} 