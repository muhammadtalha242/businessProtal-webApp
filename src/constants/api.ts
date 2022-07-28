const { NODE_ENV } = process.env;

interface IEnvApi {
  development: string;
  test: string;
  production: string;
}

const envApi: IEnvApi = {
  development: "http://localhost:8080",
  test: "http://localhost:8080",
  production: "http://localhost:8080",
};

export default envApi[NODE_ENV];
