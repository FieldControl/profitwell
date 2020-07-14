class Users {
  constructor (client) {
    this.client = client
  }

  update (id, { email }) {
    return this.client.put(`users/${id}/`, { email })
  }

  delete (id) {
    return this.client.delete(`users/${id}/`)
  }

  getSubscriptions (id) {
    return this.client.get(`users/${id}/`)
  }
}

module.exports = Users
