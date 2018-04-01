/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';

import { changeLocale } from '../actions/application-actions';

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.jsx`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

export default (Page) => {
  const IntlPage = injectIntl(Page);

  class PageWithIntl extends React.Component {
    static async getInitialProps(context) {
      let props;

      if (typeof Page.getInitialProps === 'function') {
        props = await Page.getInitialProps(context);
      }

      // Get the `locale` and `messages` from the request object on the server.
      // In the browser, use the same values that the server serialized.
      const { req } = context;
      /* eslint no-underscore-dangle: 0 */
      const { locale, messages, languages } = req || window.__NEXT_DATA__.props;

      // Always update the current time on page load/transition because the
      // <IntlProvider> will be a new instance even with pushState routing.
      const now = Date.now();

      return {
        ...props,
        locale,
        messages,
        languages,
        now,
      };
    }

    constructor(props) {
      super(props);

      this.state = {
        messages: props.messages,
      };

      this.changeLocale = this.changeLocale.bind(this);
    }

    changeLocale(nextLocale) {
      const { dispatch, locale } = this.props;

      if (locale !== nextLocale) {
        addLocaleData(require(`react-intl/locale-data/${nextLocale}`));

        this.setState({
          messages: require(`../lang/${nextLocale}.json`),
        });

        dispatch(changeLocale(nextLocale));
      }
    }

    render() {
      const { now, ...props } = this.props;
      const pageProps = { ...props };

      pageProps.changeLocale = this.changeLocale;

      return (
        <IntlProvider locale={this.props.locale} messages={this.state.messages} initialNow={now}>
          <IntlPage {...pageProps} />
        </IntlProvider>
      );
    }
  }

  PageWithIntl.propTypes = {
    dispatch: PropTypes.func.isRequired,
    now: PropTypes.number.isRequired,
    locale: PropTypes.string.isRequired,
    messages: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  return connect(state => ({
    locale: state.application.locale,
  }))(PageWithIntl);
};
