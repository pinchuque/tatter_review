import * as React from 'react';
import { connect } from 'react-redux';
const ReduxForm = require('redux-form');

const FloatingActionButton = require('material-ui').FloatingActionButton;
const ContentAdd = require('material-ui/svg-icons').ContentAdd;
const ContentRemove = require('material-ui/svg-icons').ContentRemove;
const List = require('material-ui').List;
const ListItem = require('material-ui').ListItem;
const GridList = require('material-ui').GridList;
const GridTile = require('material-ui').GridTile;
const SelectField = require('material-ui').SelectField;
const MenuItem = require('material-ui').MenuItem;
const Toggle = require('material-ui').Toggle;
const Dialog = require('material-ui').Dialog;
const FlatButton = require('material-ui').FlatButton;
import {dialogStyles} from '../../../styles/custom-theme';

import {Input} from '../../common/form/form-input';

import {ClientContact} from '../../../models/contactModels'  
import {ADD_CLIENT_CONTACT_MODAL_FORM} from '../../../constants/form-names';

interface IAddClientFormProps extends React.Props<any> {
  isVisible: boolean;
  isPending: boolean;
  hasError: boolean; 
  firstName: string;
  lastName: string;
  additionalPhoneNumber: string;
  additionalPhoneNumbers: string[];
  model: ClientContact;
  onSubmit: (values) => void;
  onCancel:()=>void;
  addAdditionalPhoneNumber: (val) => void;
  removeExtraPhone: (val) => void;
  handleSubmit:any; //some redux-form stuff
  invalid:boolean; //use to disable submit button 
};

 class AddClientContactModal extends React.Component<IAddClientFormProps, void> {
  render() {
    const {
      isVisible,
      addAdditionalPhoneNumber,
      removeExtraPhone,
      onSubmit,
      isPending,
      hasError,
      firstName,
      lastName,
      additionalPhoneNumber,
      additionalPhoneNumbers=[],
      onCancel,
      model,
      handleSubmit, //some redux-form stuff
      invalid //use to disable submit button 
    } = this.props;
  const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={onCancel}
        
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={handleSubmit(onSubmit)}
      />,
    ];
    return (
      <Dialog
          actions={actions}
          modal={true}
          open={isVisible}
          autoScrollBodyContent={true}
          title="Client Contact"
          titleStyle={dialogStyles.dialogHeader}
        >
            <form >
              <GridList
                  cols={4}
                  cellHeight={70}
                  padding={2}
                >
                <GridTile cols={1} />
                <GridTile cols={2} style={dialogStyles.firstField} >
                  <Input
                     name="firstName"
                    label="First Name"
                  />
                </GridTile>
                <GridTile cols={1} />
                <GridTile cols={1} />
                <GridTile cols={2} >
                  <Input
                       name="lastName"
                      label="Last Name"
                    />
                </GridTile>
                <GridTile cols={1} />
                <GridTile cols={1} />
                <GridTile cols={2} >
                  <Input
                       name="title"
                      label="Title"
                    />
                </GridTile>
                <GridTile cols={1} />
                <GridTile cols={1} />
                <GridTile cols={2} >
                  <GridList
                    cols={3}>
                    <GridTile cols={2}>
                    <Input 
                         name="primaryPhone"
                        label="Primary Phone"
                      />
                    </GridTile>
                    <GridTile cols={1}>
                      <SelectField
                          floatingLabelText="Phone Type"
                      fullWidth={true}
                          value={1}
                          >
                        <MenuItem value={1} primaryText="Cell V" />
                      </SelectField>
                    </GridTile>
                  </GridList>
                </GridTile>
                <GridTile cols={1} />
                <GridTile cols={1} />
                <GridTile cols={3} >
                  <GridList
                    cols={4}
                  >
                    <GridTile cols={2}>
                    <Input
                         name="additionalPhoneNumber"
                        
                        label="Additional Phone"
                      />
                    </GridTile>
                    <GridTile  cols={1}>
                      <SelectField 
                          floatingLabelText="Phone Type"
                      fullWidth={true}
                          value={1}>
                        <MenuItem value={1} primaryText="Cell V"  />
                      </SelectField>
                    </GridTile>
                    <GridTile cols={1}>
                      <FloatingActionButton
                          mini={true}
                          style={dialogStyles.addButtonMargin}
                          onClick={() => addAdditionalPhoneNumber(additionalPhoneNumber)}
                          >
                        <ContentAdd />
                      </FloatingActionButton>
                    </GridTile>
                  </GridList>
                </GridTile>
                <GridTile cols={1} />
                <GridTile cols={2} >
                  <Input
                     name="email"
                    
                    label="Email"
                  />
                </GridTile>
                <GridTile cols={1} />
                <GridTile cols={1} />
                <GridTile cols={2} >
                  <SelectField
                      fullWidth={true}
                      floatingLabelText="Contact Office"
                      value={1}>
                  </SelectField>
                </GridTile>
                <GridTile cols={1} />
                <GridTile cols={1} />
                <GridTile cols={1} >
                    <Toggle
                        label="Active"
                        defaultToggled={true}
                        labelPosition="right"
                          style={dialogStyles.toogleStyle}
                      />
                </GridTile>
              </GridList>
              <List >
                  {model.additionalPhoneNumbers.map(phone =>
                    <ListItem >
                      {phone}
                        <FloatingActionButton mini={true} secondary={true} onClick={() => removeExtraPhone(phone)}> 
                            <ContentRemove /> 
                        </FloatingActionButton>
                    </ListItem>
                  )}
                </List>
            </form>
        </Dialog>
    );
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'title',]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}

let addClientContactForm =  ReduxForm.reduxForm({
  form: ADD_CLIENT_CONTACT_MODAL_FORM,
  validate: validate,
})(AddClientContactModal);

/*const selector = ReduxForm.formValueSelector('addClientContact') 
addClientContactForm = connect(
  state => {
    const additionalPhoneNumber = selector(state, 'additionalPhoneNumber')
    return {
      additionalPhoneNumber
    }
  }
)(addClientContactForm)
*/
export default addClientContactForm

