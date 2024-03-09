export const vars = {
  appVersion: +(process.env.APP_VERSION || 1),
  nodeEnv: process.env.NODE_ENV,
  encryption: {
    key: process.env.BASE_ENCRYPTION_KEY || "",
  },
  prisma: {
    tx: {
      maxWait: Number(process.env.DB_TX_MAX_WAIT || 30000),
      timeout: Number(process.env.DB_TX_TIMEOUT || 20000),
    },
  },
  auth: {
    hashRounds: +(process.env.HASH_ROUNDS || 10),
    jwt: {
      secret: String(process.env.JWT_SECRET),
      expiresIn: String(process.env.JWT_EXPIRES_IN),
      refreshExpiresIn: String(process.env.JWT_REFRESH_EXPIRES_IN),
      refreshSecret: String(process.env.JWT_REFRESH_SECRET),
    },
  },
};
