import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import withRedux from 'next-redux-wrapper';
import { FormattedMessage } from 'react-intl';

import WithIntl from '../wrapper/WithIntl';

import Layout from '../wrapper/Layout';

import { exampleAction, exampleAsyncAction } from '../actions/example-actions';

import makeStore from '../utils/store';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };

    this.exampleDataFetching = this.exampleDataFetching.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    setInterval(() => {
      // we don't have to do this with redux, for example only
      this.setState({
        count: this.state.count + 1,
      });

      dispatch(exampleAction(`App is mounted ${this.state.count} seconds ago`));
    }, 1000);
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props, nextProps);
  }

  exampleDataFetching() {
    const { dispatch } = this.props;

    dispatch(exampleAsyncAction());
  }

  render() {
    const {
      exampleData,
      exampleAsyncData,
      exampleAsyncDataError,
      locale,
    } = this.props;
    const newLocale = (locale === 'en') ? 'fr' : 'en';

    return (
      <Layout>
        <h1>Next.js bootsrap</h1>
        <p>Count from exampleData in redux: {exampleData}</p>
        <button onClick={this.exampleDataFetching}>Load some data</button>
        <button onClick={() => { this.props.changeLocale(newLocale); }}>Change locale</button>
        <FormattedMessage id="greeting" defaultMessage="Hello, World!" />
        {exampleAsyncData &&
        (Object.keys(exampleAsyncData).map(key => (
          <p key={`async-${key}`}><strong>{key}: </strong>{exampleAsyncData[key]}</p>
        )))
        }
        {exampleAsyncDataError && <h2 className="error">{exampleAsyncDataError}</h2>}
      </Layout>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.func.isRequired,
  exampleData: PropTypes.string,
  exampleAsyncData: PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
  exampleAsyncDataError: PropTypes.string,
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

Index.defaultProps = {
  exampleData: '',
  exampleAsyncData: null,
  exampleAsyncDataError: null,
};

export default withRedux(makeStore, state => ({
  exampleData: state.example.exampleData,
  exampleAsyncData: state.example.exampleAsyncData,
  exampleAsyncDataError: state.example.exampleAsyncDataError,
  locale: state.application.locale,
}), dispatch => ({ dispatch }))(WithIntl(Index));
