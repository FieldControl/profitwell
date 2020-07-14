/* eslint-disable camelcase */
const { _ } = require('underscore')

class Metrics {
  constructor (client) {
    this.client = client
  }

  getMonthly ({ plan_id, metrics = [] }) {
    return this.client.get('metrics/monthly/', {
      plan_id,
      metrics: _.isArray(metrics) ? metrics.join(',') : metrics
    })
  }

  getDaily ({ month, plan_id, metrics = [] }) {
    return this.client.get('metrics/daily/', {
      month,
      plan_id,
      metrics: _.isArray(metrics) ? metrics.join(',') : metrics
    })
  }

  getPlans ({ limit }) {
    return this.client.get('metrics/plans/', {
      limit
    })
  }

  excludeCustomer (userId) {
    return this.client.post(`metrics/exclude_customer/${userId}/`)
  }
}

module.exports = Metrics
