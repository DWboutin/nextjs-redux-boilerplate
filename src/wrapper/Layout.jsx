import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Layout = (props) => {
  const { children, title } = props;

  return (
    <div>
      <Head>
        <title>{ title }</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      { children }
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string,
};

Layout.defaultProps = {
  title: 'Next.js project boilerplate',
};

export default Layout;
