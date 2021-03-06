import axios from 'axios';
import { browserHistory } from 'react-router';
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password}) {
    return function(dispatch) {
      // submit email, pass to server
      axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
              //if request s good..
              // -update state to indicate user is authencicated
              dispatch({ type: AUTH_USER});
              // -save the JWT token
              localStorage.setItem('token', response.data.token);
              // -redirect to route '/feature'
              browserHistory.push('/feature');
            })
            .catch(response =>
              //if req is bad
              //show an error to user
              dispatch(authError('Bad login Info'))
            );
    }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signupUser({ email, password}) {
    return function(dispatch) {
      // submit email, pass to server
      axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
              //if request s good..
              // -update state to indicate user is authencicated
              dispatch({ type: AUTH_USER});
              // -save the JWT token
              localStorage.setItem('token', response.data.token);
              // -redirect to route '/feature'
              browserHistory.push('/feature');
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
          })
          .then(response => {
            dispatch({
              type: FETCH_MESSAGE,
              payload: response.data.message
            });
          });
  }
}
