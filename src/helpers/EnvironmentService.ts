export const getApiBase = () =>
  `https://portal-backend.${
    document.location.hostname.includes('.int.') ? 'int' : 'dev'
  }.demo.catena-x.net`

const EnvironmentService = {
  getApiBase,
}

export default EnvironmentService
