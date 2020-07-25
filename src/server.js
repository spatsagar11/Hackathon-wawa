import axios from 'axios';
import { get } from 'lodash';

const apiHost = '/api';
export const RESOURCE_URI = Object.freeze({
  session: apiHost + '/session',
  login: apiHost + '/login.json',
  orders: apiHost + '/orders.json'
});

async function request(url, method, config = {}) {
  const axiosConfig = {
    url,
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    params: config.params || {},
    data: config.data || {}
  };
  try {
    const axiosResponse = await axios(axiosConfig);
    return {
      ok: true,
      status: 'OK',
      payload: axiosResponse.data.payload
    }
  } catch (exception) {
    const response = {
      ok: false,
      status: get(exception, 'response.data.status', 'UNKNOW_EXCEPTION'),
      errors: get(exception, 'response.data.errors', {}),
      message: get(exception, 'response.data.message', 'Some error occured'),
    }
    if (response.status === 504) {
      response.message = "Unable to connect to server."
    }
    return response;
  }
}


export default {
  get: async (url, params = {}) => ({ ...await request(url, 'GET', { params }) }),
  post: async (url, data = {}) => ({ ...await request(url, 'POST', { data }) }),
  delete: async (url, data) => ({ ...await request(url, 'DELETE', { data }) }),
  put: async (url, data) => ({ ...await request(url, 'PUT', { data }) })
};

