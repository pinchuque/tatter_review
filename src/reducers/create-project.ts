import {
  UPDATE_CLIENT_INFO_PENDING,
  UPDATE_CLIENT_INFO_SUCCESS,
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
  SET_PRIMARY_CLIENT_CONTACT,
  SET_SECONDARY_CLIENT_CONTACT,
  ADD_PROJECT_CONTACT,
  ADD_MEASUREMENT_APPOINTMENT,
} from '../constants';

import {ClientContact, ProjectContact} from '../models/contactModels';
import {MeasurementAppointment} from '../models/measurements';

import { fromJS} from 'immutable';
import createInstanceFromJson from '../utils/from-js-to-class';

const INITIAL_STATE = fromJS({
  hasError: false,
  isLoading: false,
  clientContact: new ClientContact(),
  projectContact: new ProjectContact(),
  selectedPrimaryContact: new ClientContact(),
  selectedSecondaryContact: new ClientContact(),
  clientContacts: [],
  projectContacts: [],
  measurementAppointments: [],
  isClientContactModalOpened: false,
  isProjectContactModalOpened: false,
  isMeasurementAppointmentModalOpened: false,
  isClientContactModalPrimary: false,
  projectContactAdditionalPhoneNumbers: []
});

function createProject(state = INITIAL_STATE, action = { type: '', payload: null }) {
  switch (action.type) {

  case UPDATE_CLIENT_INFO_PENDING:
    return state.merge(fromJS({
      hasError: false,
      isLoading: true,
    }));

  case UPDATE_CLIENT_INFO_SUCCESS:
    return state.merge(fromJS({
      hasError: false,
      isLoading: false,
    }));

  case UPDATE_CLIENT_INFO_ERROR:
    return state.merge(fromJS({
      hasError: true,
      isLoading: false,
    }));

  case ADD_ADDITIONAL_PHONE_NUMBER_TO_CLIENT: {
    return state.update('projectContactAdditionalPhoneNumbers', (value) => value.push(action.payload));
  }

  case REMOVE_ADDITIONAL_PHONE_NUMBER_TO_CLIENT: {
    let numbers = state.get('additionalPhoneNumbers');
    let index = numbers.keyOf(action.payload);
    return state.update('additionalPhoneNumbers' , (value) => value.delete(index));
  }

  case OPEN_ADD_CLIENT_CONTACT_MODAL :
  case CLOSE_ADD_CLIENT_CONTACT_MODAL :
  case OPEN_ADD_PROJECT_CONTACT_MODAL :
  case CLOSE_ADD_PROJECT_CONTACT_MODAL:
  case OPEN_MEASUREMENT_APPOINTMENT_MODAL :
  case CLOSE_MEASUREMENT_APPOINTMENT_MODAL :
  case SET_PRIMARY_CLIENT_CONTACT:
  case SET_SECONDARY_CLIENT_CONTACT: {
    return state.merge(action.payload);
  }

  case  ADD_CLIENT_CONTACT: {
    return state.update('clientContacts', (value) => value.push(action.payload));
  }

  case  ADD_PROJECT_CONTACT: {
    return state.update('projectContacts', (value) => value.push(action.payload));
  }

  case ADD_MEASUREMENT_APPOINTMENT: {
    return state.update('measurementAppointments', (value) => value.push(action.payload));
  }

  default:
    return state;
  }
}

export default createProject;
