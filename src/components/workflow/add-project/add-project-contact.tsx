import * as React from 'react';
import { Modal, ModalContent } from '../../common/modal';
const ReduxForm = require('redux-form');
import { connect } from 'react-redux';
const Field = require('redux-form').Field;
const {Checkbox} = require('redux-form-material-ui');

import {Input, Select} from '../../common/form/form-input';
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


import {ADD_PROJECT_CONTACT_MODAL_FORM} from '../../../constants/form-names';
import {ProjectContact} from '../../../models/contactModels';

interface IAddProjectFormProps extends React.Props<any> {
  isVisible: boolean;
  additionalPhoneNumber?: string;
  additionalPhoneType?:string;
  additionalPhoneNumbers?: string[];
  model: ProjectContact;
  onSubmit: () => void;
  onCancel: () => void;
  changeField: (field,form,value) => void;
  addAdditionalPhoneNumber: (val) => void;
  removeExtraPhone: (val) => void;
  handleSubmit: any; // some redux-form stuff
  invalid: boolean; // use to disable submit button 
};


class AddProjectContactModal extends React.Component<IAddProjectFormProps, void> {

  addAdditionalPhoneNumber(data){
    this.props.addAdditionalPhoneNumber(`${this.props.additionalPhoneNumber}  ${(this.props.additionalPhoneType) ?this.props.additionalPhoneType: "" }`);
    this.props.changeField(ADD_PROJECT_CONTACT_MODAL_FORM,"additionalPhoneNumber","");
 }

  render() {
    const {
      isVisible,
      addAdditionalPhoneNumber,
      removeExtraPhone,
      onSubmit,
      additionalPhoneNumber,
      additionalPhoneType,
      additionalPhoneNumbers,
      model,
      handleSubmit,
      changeField,
      onCancel
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
          autoScrollBodyContent={true}
          title='Project Contact'
          titleStyle={dialogStyles.dialogHeader}
        >
            <form>
            <GridList
                cols={4}
                cellHeight={70}
                padding={2}
              >
              <GridTile cols={1} />
              <GridTile cols={2} style={dialogStyles.firstField} >
                <Input
                   name='firstName'
                  label='First Name'
                />
              </GridTile>
              <GridTile cols={1} />
              <GridTile cols={1} />
              <GridTile cols={2} >
                <Input
                     name='lastName'
                    label='Last Name'
                  />
              </GridTile>
              <GridTile cols={1} />
              <GridTile cols={1} />
              <GridTile cols={2} >
                <GridList
                  cols={3}
                >
                  <GridTile cols={2}>
                  <Input
                       name='primaryPhone'
                      label='Primary Phone'
                    />
                  </GridTile>
                  <GridTile cols={1}>
                    <Select
                        name='primaryPhoneType'
                        label='Phone Type'
                        fullWidth={true}
                        value={''}
                        >
                      <MenuItem value={''} primaryText=''  />
                      <MenuItem value={'Cell'} primaryText='Cell'  />
                      <MenuItem value={'Home'} primaryText='Home'  />
                    </Select>
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
                      name='additionalPhoneNumber'
                      label='Additional Phone'
                    />
                  </GridTile>
                  <GridTile  cols={1}>
                    <Select
                        name='additionalPhoneType'
                        label='Phone Type'
                        fullWidth={true}
                    >
                      <MenuItem value={'Cell'} primaryText='Cell'  />
                      <MenuItem value={'Home'} primaryText='Home'  />
                    </Select>
                  </GridTile>
                  <GridTile cols={1}>
                    <FloatingActionButton
                       mini={true}
                       style={dialogStyles.addButtonMargin}
                       onClick={() => this.addAdditionalPhoneNumber(this)}
                       disabled={(additionalPhoneNumber) ? false:true}
                       >
                      <ContentAdd />
                    </FloatingActionButton>
                  </GridTile>
                </GridList>
              </GridTile>
          </GridList>
          <div className={"fit"}> 
            <List className={"max-width-1 block mx-auto"}>
                  {additionalPhoneNumbers.map(phone =>
                    <ListItem primaryText={phone} rightIconButton={<FloatingActionButton mini={true} secondary={true} onClick={() => removeExtraPhone(phone)}> 
                            <ContentRemove /> 
                        </FloatingActionButton>}>
                    </ListItem>
                  )}
              </List> 
          </div>
          <GridList
              className={"col col-12 fit"}
                cols={4}
                cellHeight={70}
                padding={2}
          >
              <GridTile cols={1} />
              <GridTile cols={2} >
                <Input
                  name='email'
                  label='Email'
                />
              </GridTile>
              <GridTile cols={1} />
              <GridTile cols={1} />
              <GridTile cols={2}
                        style={{height:'auto', marginTop:20}} >
                  <GridList
                    cols={3}
                  >
                    <GridTile cols={1}>
                    <label>Role</label>
                    </GridTile>
                    <GridTile cols={2}>
                        <Field name="isOwner" component={Checkbox}
                            label='Owner'
                          />
                        <Field name="isHouseManager" component={Checkbox}
                            label='House Manager'
                          />
                        <Field name="isJobSuperVisor" component={Checkbox}
                            label='Job Supervisor'
                          />
                        <Field name="isWindowWasher" component={Checkbox}
                            label='Window Washer'
                          />
                  </GridTile>
                </GridList>
              </GridTile>
              <GridTile cols={1} />
              <GridTile cols={1} />
            </GridList>
              <GridTile cols={1} />
              <GridTile cols={1} />
              <GridList
                cols={4}
                cellHeight={70}
                padding={2}
              >
              <GridTile cols={1} />
              <GridTile cols={1}
                       style={dialogStyles.toogleStyle}>
                  <Toggle
                      label='Active'
                      defaultToggled={true}
                      labelPosition='left' />
              </GridTile>
            </GridList>
          </form>
        </Dialog>
    );
  }
}

const validate = (values) => {
   const errors = {};
  const requiredFields = [ 'firstName', 'lastName', 'primaryPhone'];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
  });
  return errors;
};

let addProjectContactForm =  ReduxForm.reduxForm({
  form: ADD_PROJECT_CONTACT_MODAL_FORM,
  validate: validate,
})(AddProjectContactModal);


const selector = ReduxForm.formValueSelector(ADD_PROJECT_CONTACT_MODAL_FORM);
addProjectContactForm = connect(
  state => {
    const additionalPhoneNumber = selector(state, 'additionalPhoneNumber');
    const additionalPhoneType = selector(state, 'additionalPhoneType');
    return {
      additionalPhoneNumber,
      additionalPhoneType
    };
  }
)(addProjectContactForm);

export default addProjectContactForm;

