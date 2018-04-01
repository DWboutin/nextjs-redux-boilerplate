import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

// noinspection JSUnusedGlobalSymbols
export default class MyDocument extends Document {
  // noinspection JSUnusedGlobalSymbols
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { req: { locale, localeDataScript } } = context;
    const {
      html,
      head,
      errorHtml,
      chunks,
    } = context.renderPage();

    return {
      ...props,
      html,
      head,
      errorHtml,
      chunks,
      locale,
      localeDataScript,
    };
  }

  render() {
    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${this.props.locale}`;

    return (
      <html lang={this.props.locale}>
        <Head>
          <title>Next.js Bootstrap</title>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <script src={polyfill} />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript,
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
