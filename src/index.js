const axios = require('axios')
const baseUrl = 'https://api.profitwell.com/v2'
const {
  Subscriptions,
  Users,
  Plans,
  Metrics,
  Company
} = require('./resources')

const responseWith = (response) => ({
  status: response.status,
  data: response.data || undefined
})

const responseErrWith = (err) => ({
  status: err.response.status,
  data: err.response.data || undefined
})

class ProfitWell {
  constructor ({ apiToken }) {
    this.baseUrl = baseUrl
    this.headers = {
      'User-Agent': 'profitwell/1.0.0 - unofficial node bindings by Field Control <3',
      Authorization: apiToken
    }
    this.subscriptions = new Subscriptions(this)
    this.users = new Users(this)
    this.plans = new Plans(this)
    this.metrics = new Metrics(this)
    this.company = new Company(this)
  }

  get (resourceUri, params = {}) {
    return axios.get(`${this.baseUrl}/${resourceUri}`, {
      params: params,
      headers: this.headers,
      auth: this.auth
    }).then(responseWith).catch(responseErrWith)
  }

  post (resourceUri, payload = {}) {
    return axios.post(`${this.baseUrl}/${resourceUri}`, payload, {
      headers: this.headers,
      auth: this.auth
    }).then(responseWith).catch(responseErrWith)
  }

  put (resourceUri, payload) {
    return axios.put(`${this.baseUrl}/${resourceUri}`, payload, {
      headers: this.headers,
      auth: this.auth
    }).then(responseWith).catch(responseErrWith)
  }

  delete (resourceUri, params = {}) {
    return axios.delete(`${this.baseUrl}/${resourceUri}`, {
      params: params,
      headers: this.headers,
      auth: this.auth
    }).then(responseWith).catch(responseErrWith)
  }
}

module.exports = ProfitWell
