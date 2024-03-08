import dotenv from "dotenv";

function initLoadEnv() {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}

export default initLoadEnv;
