/* eslint-disable no-undef */
const nock = require('nock')
const ProfitWell = require('../../src/index')
const profitWell = new ProfitWell({
  apiToken: 'Field<3ProfitWell'
})

describe('Plans', () => {
  it('should list plans', async () => {
    nock('https://api.profitwell.com/v2').get('/plans/').reply(200, {})
    const response = await profitWell.plans.list()
    expect(response.status).toBe(200)
  })

  it('should create a new plan', async () => {
    nock('https://api.profitwell.com/v2').post('/plans/', {
      id: 'foo_plan',
      name: 'Foo plan'
    }).reply(201, {})

    const response = await profitWell.plans.create({
      id: 'foo_plan',
      name: 'Foo plan'
    })
    expect(response.status).toBe(201)
  })

  it('should get existing plan by id', async () => {
    nock('https://api.profitwell.com/v2').get('/plans/foo_plan/').reply(200, {})

    const response = await profitWell.plans.get('foo_plan')
    expect(response.status).toBe(200)
  })

  it('should update existing plan', async () => {
    nock('https://api.profitwell.com/v2').put('/plans/foo_plan/', {
      name: 'Foo plan'
    }).reply(200, {})

    const response = await profitWell.plans.update('foo_plan', {
      name: 'Foo plan'
    })
    expect(response.status).toBe(200)
  })
})
