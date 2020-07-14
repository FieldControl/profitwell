/* eslint-disable no-undef */
const nock = require('nock')
const ProfitWell = require('../../src/index')
const { monthlyMetrics, dailyMetrics } = require('./../../src/core')
const profitWell = new ProfitWell({
  apiToken: 'Field<3ProfitWell'
})

describe('Metrics', () => {
  it('should get monthly metrics', async () => {
    nock('https://api.profitwell.com/v2')
      .get('/metrics/monthly/?plan_id=field_plan&metrics=active_customers,churned_customers_cancellations,churned_recurring_revenue')
      .reply(200, {})

    const response = await profitWell.metrics.getMonthly({
      plan_id: 'field_plan',
      metrics: [
        monthlyMetrics.activeCustomers,
        monthlyMetrics.churnedCustomersCancellations,
        monthlyMetrics.churnedRecurringRevenue
      ]
    })
    expect(response.status).toBe(200)
  })

  it('should get monthly metrics [2]', async () => {
    nock('https://api.profitwell.com/v2')
      .get('/metrics/monthly/?plan_id=field_plan&metrics=active_customers,churned_customers_cancellations')
      .reply(200, {})

    const response = await profitWell.metrics.getMonthly({
      plan_id: 'field_plan',
      metrics: 'active_customers,churned_customers_cancellations'
    })
    expect(response.status).toBe(200)
  })

  it('should get daily metrics', async () => {
    nock('https://api.profitwell.com/v2')
      .get('/metrics/daily/?month=2020-07&plan_id=field_plan3&metrics=future_churn_mrr,upgraded_recurring_revenue,reactivated_recurring_revenue')
      .reply(200, {})

    const response = await profitWell.metrics.getDaily({
      month: '2020-07',
      plan_id: 'field_plan3',
      metrics: [
        dailyMetrics.futureChurnMRR,
        dailyMetrics.upgradedRecurringRevenue,
        dailyMetrics.reactivatedRecurringRevenue
      ]
    })
    expect(response.status).toBe(200)
  })

  it('should get daily metrics [2]', async () => {
    nock('https://api.profitwell.com/v2')
      .get('/metrics/daily/?month=2020-07&plan_id=field_plan2&metrics=cumulative_net_new_mrr,downgraded_customers')
      .reply(200, {})

    const response = await profitWell.metrics.getDaily({
      month: '2020-07',
      plan_id: 'field_plan2',
      metrics: 'cumulative_net_new_mrr,downgraded_customers'
    })
    expect(response.status).toBe(200)
  })

  it('should get plan ids', async () => {
    nock('https://api.profitwell.com/v2')
      .get('/metrics/plans/?limit=100')
      .reply(200, {})

    const response = await profitWell.metrics.getPlans({
      limit: 100
    })
    expect(response.status).toBe(200)
  })

  it('should exclude customer from metrics', async () => {
    nock('https://api.profitwell.com/v2')
      .post('/metrics/exclude_customer/da044c6e/')
      .reply(200, {})

    const response = await profitWell.metrics.excludeCustomer('da044c6e')
    expect(response.status).toBe(200)
  })
})
