/* eslint-disable no-undef */
const nock = require('nock')
const ProfitWell = require('../../src/index')
const { subscriptionStatus, planInterval, planCurrency, churnType } = require('./../../src/core')
const profitWell = new ProfitWell({
  apiToken: 'Field<3ProfitWell'
})

describe('Subscriptions', () => {
  it('should create new subscription', async () => {
    nock('https://api.profitwell.com/v2').post('/subscriptions/', {
      user_id: '7927fc01',
      user_alias: 'luiz\'s alias',
      subscription_alias: 'subscription\'s alias',
      email: 'luiz@fieldcontrol.io',
      plan_id: 'standard_plan',
      plan_interval: 'month',
      plan_currency: 'brl',
      status: 'active',
      value: 12000,
      effective_date: 1514764800
    }).reply(201, {})

    const response = await profitWell.subscriptions.create({
      user_id: '7927fc01',
      user_alias: 'luiz\'s alias',
      subscription_alias: 'subscription\'s alias',
      email: 'luiz@fieldcontrol.io',
      plan_id: 'standard_plan',
      plan_interval: planInterval.monthly,
      plan_currency: planCurrency.BRL,
      status: subscriptionStatus.active,
      value: 12000,
      effective_date: 1514764800
    })
    expect(response.status).toBe(201)
  })

  it('should create update existing subscription (downgrade or update)', async () => {
    nock('https://api.profitwell.com/v2').put('/subscriptions/7927fc01/', {
      plan_id: 'standard_plan',
      plan_interval: 'year',
      status: 'trialing',
      value: 7500,
      effective_date: 1522432854
    }).reply(200, {})

    const response = await profitWell.subscriptions.update('7927fc01', {
      plan_id: 'standard_plan',
      plan_interval: planInterval.yearly,
      status: subscriptionStatus.trialing,
      value: 7500,
      effective_date: 1522432854
    })
    expect(response.status).toBe(200)
  })

  it('should churn given subscription', async () => {
    nock('https://api.profitwell.com/v2')
      .delete('/subscriptions/7927fc01/?effective_date=1522432854&churn_type=delinquent')
      .reply(204, {})

    const response = await profitWell.subscriptions.churn('7927fc01', {
      churn_type: churnType.delinquent,
      effective_date: 1522432854
    })
    expect(response.status).toBe(204)
  })

  it('should unchurn given subscription', async () => {
    nock('https://api.profitwell.com/v2').put('/unchurn/7927fc01/').reply(204, {})
    const response = await profitWell.subscriptions.unchurn('7927fc01')
    expect(response.status).toBe(204)
  })
})
