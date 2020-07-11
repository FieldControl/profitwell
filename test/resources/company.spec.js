/* eslint-disable no-undef */
const nock = require('nock')
const ProfitWell = require('../../src/index')
const profitWell = new ProfitWell({
  apiToken: 'Field<3ProfitWell'
})

describe('Company', () => {
  it('should get company\'s settings', async () => {
    nock('https://api.profitwell.com/v2').get('/company/settings').reply(200, {})
    const response = await profitWell.company.getSettings()
    expect(response.status).toBe(200)
  })
})
