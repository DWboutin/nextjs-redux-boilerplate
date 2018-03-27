import ACTIONS from '../utils/consts';

const initialState = {
  exampleData: '',
  exampleAsyncDataIsFetching: false,
  exampleAsyncData: null,
  exampleAsyncDataError: null,
};

export default function example(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIONS.EXAMPLE:
      return {
        ...state,
        exampleData: action.exampleData,
      };

    case ACTIONS.REQUEST_ASYNC_DATA:
      return {
        ...state,
        exampleAsyncDataIsFetching: true,
      };

    case ACTIONS.RECEIVE_ASYNC_DATA:
      return {
        ...state,
        exampleAsyncDataIsFetching: false,
        exampleAsyncData: action.data,
      };

    case ACTIONS.FAILED_RECEIVE_ASYNC_DATA:
      return {
        ...state,
        exampleAsyncDataIsFetching: false,
        exampleAsyncDataError: action.error,
      };

    default:
      return state;
  }
}
