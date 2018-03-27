import axios from 'axios';

import ACTIONS from '../utils/consts';

export function exampleAction(exampleData) {
  return {
    type: ACTIONS.EXAMPLE,
    exampleData,
  };
}

export function requestAsyncData() {
  return {
    type: ACTIONS.REQUEST_ASYNC_DATA,
  };
}

export function receiveAsyncData(data) {
  return {
    type: ACTIONS.RECEIVE_ASYNC_DATA,
    data,
  };
}

export function failedReceiveAsyncData(error) {
  return {
    type: ACTIONS.FAILED_RECEIVE_ASYNC_DATA,
    error: JSON.stringify(error),
  };
}

export const exampleAsyncAction = () => (dispatch) => {
  dispatch(requestAsyncData());

  axios
    .get('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => {
      dispatch(receiveAsyncData(response.data));
    })
    .catch((error) => {
      dispatch(failedReceiveAsyncData(error.message));
    });
};
