require('dotenv')
  .config({
    path: './app-variables.env',
  });

const IntlPolyfill = require('intl');

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const express = require('express');
const next = require('next');
const { readFileSync } = require('fs');
const { basename } = require('path');
const accepts = require('accepts');
const glob = require('glob');
const compression = require('compression');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './src', dev });
const handle = app.getRequestHandler();

// Get the supported languages by looking for translations in the `lang/` dir.
const languages = glob.sync('./src/lang/*.json').map(f => basename(f, '.json'));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
const getLocaleDataScript = (locale) => {
  const lang = locale.split('-')[0];

  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
    const localeDataScript = readFileSync(localeDataFile, 'utf8');
    localeDataCache.set(lang, localeDataScript);
  }

  return localeDataCache.get(lang);
};

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
// noinspection Eslint
const getMessages = locale => require(`./src/lang/${locale}.json`);

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());

    server.get('*', (req, res) => {
      const accept = accepts(req);
      const locale = accept.language(dev ? ['en'] : languages);

      req.locale = locale;
      req.languages = languages;
      req.localeDataScript = getLocaleDataScript(locale);
      req.messages = getMessages(locale);

      handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;

      // noinspection Eslint
      console.log(`> Ready on http://localhost:${port} in ${process.env.NODE_ENV}`);
    });
  })
  .catch((ex) => {
    // noinspection Eslint
    console.error(ex.stack);
    process.exit(1);
  });
