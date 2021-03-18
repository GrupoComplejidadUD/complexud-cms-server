const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  let settings = {
    client: "sqlite",
    filename: env("DATABASE_FILENAME", ".tmp/data.db"),
  };

  if (env("DATABASE_URL")) {
    const { host, port, database, user, password } = parse(env("DATABASE_URL"));
    settings = {
      client: "postgres",
      host,
      port,
      database,
      username: user,
      password,
      ssl: { rejectUnauthorized: false },
    };
  }

  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings,
        options: {
          useNullAsDefault: true,
          ssl: false,
        },
      },
    },
  };
};
