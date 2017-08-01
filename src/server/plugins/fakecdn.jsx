import Chalk from 'chalk';

const after = (options) => (server, next) => {
  console.log(Chalk.inverse.green('Serving content from /cdn'));

  const connections = options.connections || "default";
  const connection = server.select(connections);

  connection.route({
    method: "GET",
    path: '/cdn/{param*}',
    handler: {
      directory: {
        path: 'cdn'
      }
    },
  });

  next();
};


const FakeCdn = (server, options, next) => {
  server.dependency("inert", after(options));
  next();
};

FakeCdn.attributes = {
  pkg: {
    name: "facecdn",
    version: "1.0.0"
  }
};

export default FakeCdn;
