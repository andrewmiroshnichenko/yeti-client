import config from '../config'

export default {
  getAccounts: async function (token) {
    let apiResponse = {};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
    try {
      const response = await fetch (`${config.yeti.apiBaseUrl}/api/rest/customer/v1/accounts`, {
        method: 'get',
        headers: headers
      });
      apiResponse = await response.json();
    } catch (err) {
      apiResponse.error = err;
    }
    return apiResponse;
  }
}
