/* eslint-disable no-undef */
const nock = require('nock')
const ProfitWell = require('../../src/index')
const profitWell = new ProfitWell({
  apiToken: 'Field<3ProfitWell'
})

describe('Users', () => {
  it('should get user\'s subscription history', async () => {
    nock('https://api.profitwell.com/v2').get('/users/field').reply(200, {})
    const response = await profitWell.users.getSubscriptions('field')
    expect(response.status).toBe(200)
  })

  it('should update user\'s email', async () => {
    nock('https://api.profitwell.com/v2').put('/users/luiz', { email: 'luiz@fieldcontrol.io' }).reply(200, {})
    const response = await profitWell.users.update('luiz', { email: 'luiz@fieldcontrol.io' })
    expect(response.status).toBe(200)
  })

  it('should delete user', async () => {
    nock('https://api.profitwell.com/v2').delete('/users/luiz').reply(204, {})
    const response = await profitWell.users.delete('luiz')
    expect(response.status).toBe(204)
  })
})
