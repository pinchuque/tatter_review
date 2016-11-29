import * as React from 'react';
const connect = require('react-redux').connect;
const Link = require('react-router').Link;
import { createClientContact, addAdditionalPhoneNumber, removeExtraPhone} from '../actions/create-project';

interface IAppProps extends React.Props<any> {
  createClientContact: () => void;
  addAdditionalPhoneNumber: (val) => void;
  removeAdditionalPhoneNumber: (val) =>void
  createProject:any;
  firstName: string;
  lastName: string;
  additionalPhoneNumbers: string[];
};

function mapStateToProps(state){
  return {
    router: state.router,
    firstName: state.createProject.get('firstName'),
    lastName: state.createProject.get('lastName'),
    additionalPhoneNumbers:state.createProject.get('additionalPhoneNumbers'),
    createProject: state.createProject
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createClientContact: () => dispatch(createClientContact()),
    addAdditionalPhoneNumber: (number) => dispatch(addAdditionalPhoneNumber(number)),
    removeAdditionalPhoneNumber: (number) => dispatch(removeExtraPhone(number)),
  };
}

class App extends React.Component<IAppProps, void> {
  render() {
    const { createProject, createClientContact,
       addAdditionalPhoneNumber,firstName,lastName,removeAdditionalPhoneNumber,additionalPhoneNumbers} = this.props;
    return (
      <div className="col col-12">

          <div style={{display:'none'}}>
              <div className="border col col-12">
                    <h2>website top toolbar is under develop</h2>
              </div>
              <div className="border clearfix  col col-9">
             
              </div>
              <div className="border col col-3">
                    <h2>Notes Section. Currently not available</h2>
              </div>
          </div>
      </div>
    );
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);