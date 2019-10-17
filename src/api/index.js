import Api from 'devour-client'
import { RELATIONSHIPS } from '../static/constants/api'

export class JsonApi {
  instance = new Api({
    apiUrl: `${CONFIG.yeti.apiBaseUrl}/api/rest/customer/v1`
  })

  addRelationship = resource => {

    console.log(resource)

    this.instance.define(resource, RELATIONSHIPS[resource])
  }

  findAllResources = ({ resourceName, filter, page }) => this.instance.findAll(resourceName, { filter, page })

  setToken = (token) => {
    this.instance.headers['Authorization'] = `Bearer ${token}`
  }
}

export const jsonApi = new JsonApi();