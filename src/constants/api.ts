const { NODE_ENV } = process.env;

interface IEnvApi {
  development: string;
  test: string;
  production: string;
}

const envApi: IEnvApi = {
  development: 'http://localhost:8080',
  test: 'http://localhost:8080',
  production: 'http://104.155.107.86:4042',
};
console.log('NODE_ENV: ', NODE_ENV);

export default envApi[NODE_ENV];
