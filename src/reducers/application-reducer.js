import ACTIONS from '../utils/consts';

const initialState = {
  locale: 'en',
};

export default function application(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIONS.APP_CHANGE_LOCALE:
      return {
        ...state,
        locale: action.locale,
      };

    default:
      return state;
  }
}
