class Plans {
  constructor (client) {
    this.client = client
  }

  list () {
    return this.client.get('plans')
  }

  get (id) {
    return this.client.get(`plans/${id}`)
  }

  create ({ id, name }) {
    return this.client.post('plans', { id, name })
  }

  update (id, { name }) {
    return this.client.put(`plans/${id}`, { name })
  }
}

module.exports = Plans
