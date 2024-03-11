import dotenv from "dotenv";

function initLoadEnv() {
  const result = dotenv.config();
  if (result.error) {
    console.log(result.error);
  }
}

export default initLoadEnv;
