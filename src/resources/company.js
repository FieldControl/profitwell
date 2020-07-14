class Company {
  constructor (client) {
    this.client = client
  }

  getSettings () {
    return this.client.get('company/settings/')
  }
}

module.exports = Company
