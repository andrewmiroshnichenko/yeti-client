import Api from 'devour-client';

import { RELATIONSHIPS, RESOURCES } from '../static/constants/api';

export class JsonApi {
  constructor() {
    this.instance = new Api({
      apiUrl: `${CONFIG.yeti.apiBaseUrl}/api/rest/customer/v1`,
      pluralize: false,
    });

    this.initializeResources();
  }

  initializeResources = () => {
    Object.values(RESOURCES).forEach((resource) => {
      this.addRelationship(resource);
    });
  };

  addRelationship = (resource) => {
    this.instance.define(resource, RELATIONSHIPS[resource]);
  };

  findAllResources = (resourceName, data) => this.instance.findAll(resourceName, data);

  setToken = (token) => {
    this.instance.headers.Authorization = `Bearer ${token}`;
  };

  createResource = (resourceName, data) => this.instance.create(resourceName, data)
}

export const jsonApi = new JsonApi();
