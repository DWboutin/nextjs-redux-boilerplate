import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

// noinspection JSUnusedGlobalSymbols
export default class MyDocument extends Document {
  // noinspection JSUnusedGlobalSymbols
  static getInitialProps({ renderPage }) {
    const {
      html,
      head,
      errorHtml,
      chunks,
    } = renderPage();

    return {
      html,
      head,
      errorHtml,
      chunks,
    };
  }

  static render() {
    return (
      <html lang="en">
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
