import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';

class Signup extends Component {

  renderField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input
          type="text"
          className="form-control"
          {...field.input} />
          {field.touched && field.error && <div className="error">{field.error}</div>}
      </div>
    );
  }

  handleFormSubmit(values) {
    this.props.signupUser(values);
  }

  renderAlert() {
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>OOPS!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
        label="Email"
        name="email"
        component={this.renderField}>
        </Field>
        <Field
        label="Password"
        name="password"
        component={this.renderField}
        >
        </Field>
        <Field
        label="Confirm Password"
        name="passwordConfirm"
        component={this.renderField}
        >
        </Field>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(values) {
  //console.log(values);
  const errors = {};
  if(!values.email){
    errors.email = 'Please enter a valid email';
  }
  if(values.password != values.passwordConfirm){
    errors.password = 'Password Must Match!!';
  }
  if(!values.password){
    errors.password = 'please provide password';
  }
  if(!values.passwordConfirm){
    errors.passwordConfirm = 'Please provide Confirm Password!!';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
    validate,
    form: 'signup'
})(
connect(mapStateToProps, actions)(Signup)
);
