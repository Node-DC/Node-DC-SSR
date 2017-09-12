
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { ArgumentParser } from 'argparse';
import format from 'python-format';
import { routes } from '../../client/routes';
import rootReducer from '../../client/reducers';
import {generateProduct} from '../data/generator';


const NS_PER_SEC = 1e9;
const DIGITS = 3;
const MS_PER_SEC = 1000;

export const runMe = () => {

  const parser = new ArgumentParser({
    version: '0.0.1',
    help: 'Directly call renderToString, bypassing http server'
  });

  parser.addArgument(['-u', '--url'], {
    help: 'URL to query (default: /count/10000)',
    defaultValue: '/count/10000'
  });
  parser.addArgument(['-w', '--warm-up'], {
    help: 'Number of warm-up renders (default: 1)',
    dest: 'warmUp',
    type: 'int',
    defaultValue: 1
  });
  parser.addArgument(['-n', '--count'], {
    help: 'Number of renders to do (default: 100)',
    type: 'int',
    defaultValue: 100
  });
  parser.addArgument(['-p', '--pause'], {
    action: 'storeTrue',
    help: 'Pause at the end of the run. Useful for --inspect (default: false)',
    defaultValue: false
  });

  const defaultAgent = (
    'Mozilla/5.0 (Windows NT 6.3; Win64; x64)' +
    ' AppleWebKit/537.36 (KHTML, like Gecko)' +
    ' Chrome/59.0.3071.115 Safari/537.36');
  parser.addArgument(['-a', '--user-agent'], {
    dest: 'userAgent',
    help: `User-agent to use during render (default: ${defaultAgent})`,
    defaultValue: defaultAgent
  });

  const args = parser.parseArgs();

  const initialState = {};

  console.log(`Starting render with
warm-up: ${args.warmUp}
count: ${args.count}
url: ${args.url}
user-agent: ${args.userAgent}`);

  match({routes, location: args.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log('Error 500');
    } else if (redirectLocation) {
      console.log('Error: 302');
    } else if (renderProps) {
      injectTapEventPlugin();
      global.navigator = global.navigator || {};
      global.navigator.userAgent = args.userAgent;

      if(args.url.toLowerCase().includes('/product')) {
        initialState.product = generateProduct(renderProps.params.id);
      }

      const store = createStore(rootReducer, initialState);

      const render = (count) => {
        if(count < 1) {
          return;
        }
        const time = process.hrtime();
        for(let ii = 0; ii < count; ++ii) {
          var html = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>);
          //console.log(html);
        }
        const [sec, ns] = process.hrtime(time);
        const total = sec + ns/NS_PER_SEC;

        console.log(`Total: ${(total * MS_PER_SEC).toFixed(DIGITS)} ms
Average Per Render: ${(total * MS_PER_SEC / count).toFixed(DIGITS)} ms
`);
      };

      console.log('renderToString warm-up');
      render(args.warmUp);

      console.log('renderToString');
      render(args.count);

      if(args.pause) {
        process.stdin.resume();
        var fs = require('fs');
        var bb = new Buffer(1);
        console.log('\nPress Enter to exit')
        var response = fs.read(process.stdin.fd, bb, 0, 1, 0,()=>{
          console.log('Exiting');
          process.stdin.pause();
        });
      }

    } else {
      console.log('Error: 404');
    }
  });
};
