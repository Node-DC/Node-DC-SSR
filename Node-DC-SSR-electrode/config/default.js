

const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.PORT, 10);
  /* istanbul ignore next */
  return (x !== null && !isNaN(x)) ? x : defaultListenPort;
};

const appName = 'Node-DC-SSR-electrode';

module.exports = {
  'plugins': {
    'inert': {
      'enable': true
    },
    'electrodeStaticPaths': {
      'enable': true,
      'options': {
        'pathPrefix': 'dist'
      }
    },
    'fakecdn': {
      module: './{{env.APP_SRC_DIR}}server/plugins/fakecdn',
    },
    'json-api': {
      module: './{{env.APP_SRC_DIR}}server/plugins/json-api',
    },
    'webapp': {
      'module': 'electrode-react-webapp/lib/hapi',
      'options': {
        'pageTitle': appName,
        'paths': {
          '/{args*}': {
            'content': {
              'module': './{{env.APP_SRC_DIR}}/server/views/index-view'
            }
          }
        }
      }
    }
  },
  'connections': {
    'default': {
      'host': process.env.HOST,
      'address': process.env.HOST_IP || '0.0.0.0',
      'port': portFromEnv(),
      'routes': {
        'cors': true
      },
      'state': {
        'ignoreErrors': true
      }
    }
  },
  app: {
    appMode: 'SSR-electrode',
    appVersion: appName + ' v0.8.0',
    server: {
      generator: {
        cache: true
      }
    }
  }
};
