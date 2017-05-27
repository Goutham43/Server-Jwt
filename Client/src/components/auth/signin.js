import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {signinUser} from '../../actions';
import {connect} from 'react-redux';

class Signin extends Component {

    renderField(field) {
      return (
          <div>
            <label>{field.label}</label>
            <input
              className="form-control"
              type="text"
              {...field.input}
            />
          </div>
        );
    }

    handleFormSubmit({email, password}) {
      this.props.signinUser({ email, password });

    }

    renderAlert() {
      if(this.props.errorMessage){
        return (
          <div className="alert alert-danger">
            <strong>Oops!!</strong>{this.props.errorMessage}
          </div>
        );
      }
    }

    render() {
      const { handleSubmit, fields: { email, password }} = this.props;

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
              component={this.renderField}>
          </Field>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign in</button>
        </form>
    );
    }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(
  connect( mapStateToProps, {signinUser})(Signin)
);
