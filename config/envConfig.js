const { env } = process;

const envConfig = {
  PORT: env.PORT,
  SECRET_KEY: env.SECRET_KEY,
};

module.exports = { env: envConfig };
