import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

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
      dispatch(exampleAction(`App is mounted ${this.state.count + 1} seconds ago`));
    }, 1000);
  }

  exampleDataFetching() {
    const { dispatch } = this.props;

    dispatch(exampleAsyncAction());
  }

  render() {
    const { exampleData, exampleAsyncData, exampleAsyncDataError } = this.props;

    return (
      <div>
        <h1>Next.js bootsrap</h1>
        <p>Count from exampleData in redux: {exampleData}</p>
        <button onClick={this.exampleDataFetching}>Load some data</button>
        {exampleAsyncData &&
          (Object.keys(exampleAsyncData).map(key => (
            <p key={`async-${key}`}><strong>{key}: </strong>{exampleAsyncData[key]}</p>
          )))
        }
        {exampleAsyncDataError && <h2 className="error">{exampleAsyncDataError}</h2>}
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.func.isRequired,
  exampleData: PropTypes.string,
  exampleAsyncData: PropTypes.oneOfType([
    PropTypes.string,
  ]),
  exampleAsyncDataError: PropTypes.string,
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
}), dispatch => ({ dispatch }))(Index);
