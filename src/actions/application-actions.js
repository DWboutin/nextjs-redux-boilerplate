import ACTIONS from '../utils/consts';

export function changeLocale(locale) {
  return {
    type: ACTIONS.APP_CHANGE_LOCALE,
    locale,
  };
}
