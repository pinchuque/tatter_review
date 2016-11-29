import * as React from 'react';
const Field = require('redux-form').Field;

const TextField = require('material-ui').TextField;
const SelectField = require('material-ui').SelectField;
const MenuItem = require('material-ui').MenuItem;
const {
  DatePicker,
  TimePicker,
} = require('redux-form-material-ui');

interface IFormField  extends React.Props<any>{
  id?: string;
  name?:string;
  label?:string;
  underlineShow?:boolean;
  style?:any;
  fullWidth?:boolean;
  value?:any;
}

interface IInputProps extends IFormField {
  multiLine?: boolean; 
  rows?:number;
};

interface IMenuItemProps extends React.Props<any> {
  value?:any;
  primaryText?:string;
};

interface ISelectProps extends IFormField {
  children?:IMenuItemProps[],
};

interface IDateTimePickerProps extends IFormField {
};


const renderTextField = ({ rows, multiLine, underlineShow, input, label, meta: { touched, error }}) =>{
  return (
  <TextField 
    floatingLabelText={label}
    hintText={label}
    errorText={touched && error}
    underlineShow={underlineShow}
    multiLine={multiLine}
    rows={rows}hh
    {...input}
  />
)}

class Input extends React.Component<IInputProps, void> {
    render() {
      const {
        name,
        label,
        multiLine,
        underlineShow,
        rows,
        style
      } = this.props;
      return ( <Field name={name} component={renderTextField} label={label} rows={rows} multiLine={multiLine} underlineShow={underlineShow} style={style} />);
  }
}

const renderSelectField = ({ input, label, fullWidth, value, meta: { touched, error }, children}) => (
  <SelectField
    fullWidth={fullWidth}
    value={value}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    />
)


class Select extends React.Component<ISelectProps, void> {
    render() {
      const {
        name,
        label,
        fullWidth,
        value,
        children,
        underlineShow
      } = this.props;
      return ( 
        <Field name={name} component={renderSelectField}  label={label} value={value} fullWidth={fullWidth} underlineShow={underlineShow}>
            {children}
        </Field>
      )
  }
}

class DatePick extends React.Component<IDateTimePickerProps, void> {
    render() {
      const {
        name,
        label,
        fullWidth,
        value,
        underlineShow
      } = this.props;
      return ( 
        <Field name={name} component={DatePicker}  hintText={label} floatingLabelText={label} label={label} value={value} fullWidth={fullWidth} underlineShow={underlineShow}>
        </Field>
      )
  }
}

class TimePick extends React.Component<IDateTimePickerProps, void> {
    render() {
      const {
        name,
        label,
        fullWidth,
        value
      } = this.props;
      return ( 
        <Field name={name} component={TimePicker}  hintText={label} floatingLabelText={label} label={label} value={value} fullWidth={fullWidth}>
        </Field>
      )
  }
}

export {Input, Select, DatePick,TimePick}