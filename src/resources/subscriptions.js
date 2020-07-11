/* eslint-disable camelcase */
class Subscriptions {
  constructor (client) {
    this.client = client
  }

  create (subscription) {
    return this.client.post('subscriptions', subscription)
  }

  update (id, { plan_id, plan_interval, value, status, effective_date }) {
    return this.client.put(`subscriptions/${id}`, {
      plan_id,
      plan_interval,
      value,
      status,
      effective_date
    })
  }

  churn (id, { effective_date, churn_type }) {
    return this.client.delete(`subscriptions/${id}`, {
      effective_date,
      churn_type
    })
  }

  unchurn (id) {
    return this.client.put(`unchurn/${id}`)
  }
}

module.exports = Subscriptions
