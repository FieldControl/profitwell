
<div align="center">
  <a target="_blank" href="https://www.profitwell.com/"><img src=".github/assets/logo.png" alt="ProfitWell logo" height="109px"></a>
  <div><code>npm install profitwell --save</code></div>
  <br>
  <p>
    :money_with_wings: Unofficial Node.js bindings to the ProfitWell API - <a target="_blank" href="https://profitwellapiv2.docs.apiary.io/">https://profitwellapiv2.docs.apiary.io/</a>
  </p>
  <p>

![Field Control ♥](https://img.shields.io/badge/Field%20Control-%20%20%20%20%20%20♥-blue.svg)

  </p>
  <small>
    Built with ❤ by 
      <a href="https://github.com/FieldControl">FieldControl</a> and
      <a href="https://github.com/FieldControl/contaazul/graphs/contributors">contributors</a> - <a href="https://fieldcontrol.com.br/vaga-para-desenvolvedor.html?utm_source=github&utm_medium=opensource&utm_campaign=contaazul">We are hiring</a>
  </small>
</div>

---

## Installation

This client is intended for server side use only.

```
npm install profitwell --save
```

<div align="center">
  <img height="30px" src=".github/assets/separator.png"/>
</div>


## Usage

```js
const ProfitWell = require('profitwell')
const profitWell = new ProfitWell({
  apiToken: 'Wx15BlcpDfVPWbsTdNX<3'
})
```

<div align="center">
  <img height="30px" src=".github/assets/separator.png"/>
</div>

### Resources
- [Subscriptions](#subscriptions)
- [Users](#users)
- [Plans](#plans)
- [Metrics](#metrics)
- [Company](#company)


### Subscriptions

```js
// Create a subscription
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
```

```js
// Upgrade/downgrade an existing subscription.
const response = await profitWell.subscriptions.update('7927fc01', {
    plan_id: 'standard_plan',
    plan_interval: planInterval.yearly,
    status: subscriptionStatus.trialing,
    value: 7500,
    effective_date: 1522432854
})
```

```js
// Churn subscription
const response = await profitWell.subscriptions.churn('7927fc01', {
    churn_type: churnType.delinquent,
    effective_date: 1522432854
})
```

```js
// Unchurn subscription - Remove the churn event associated with a subscription.
const response = await profitWell.subscriptions.unchurn('7927fc01')
```

<div align="right">
  <a href="https://github.com/FieldControl/profitwell/blob/master/test/resources/subscriptions.spec.js" target="_blank">see tests</a> - <a href="https://profitwellapiv2.docs.apiary.io/#reference/manually-added-customers/creating-subscriptions" target="_blank">see docs</a>
</div>

<div align="center">
  <img height="30px" src=".github/assets/separator.png"/>
</div>


### Users

```js
// Get the history of subscription updates you've made to a user
const response = await profitWell.users.getSubscriptions('field')
```

```js
// Update a user's email address
// This can actually be any sort of text, not necessarily an email address. Some prefer to store a name here instead 
const response = await profitWell.users.update('luiz', { email: 'luiz@fieldcontrol.io' })
```

```js
// Completely delete a user and his subscription history
const response = await profitWell.users.delete('luiz')
```


<div align="right">
  <a href="https://github.com/FieldControl/profitwell/blob/master/test/resources/users.spec.js" target="_blank">see tests</a> - <a href="https://profitwellapiv2.docs.apiary.io/#reference/manually-added-customers/users" target="_blank">see docs</a>
</div>

<div align="center">
  <img height="30px" src=".github/assets/separator.png"/>
</div>

### Plans

```js
// List all plans.
const response = await profitWell.plans.list()
```

```js
// Create a new plan
const response = await profitWell.plans.create({
    id: 'foo_plan',
    name: 'Foo plan'
})
```

```js
// Update the name of an existing plan
const response = await profitWell.plans.update('foo_plan', {
    name: 'Foo plan'
})
```

<div align="right">
  <a href="https://github.com/FieldControl/profitwell/blob/master/test/resources/plans.spec.js" target="_blank">see tests</a> - <a href="https://profitwellapiv2.docs.apiary.io/#reference/manually-added-customers/plans-listcreate" target="_blank">see docs</a>
</div>

<div align="center">
  <img height="30px" src=".github/assets/separator.png"/>
</div>

### Metrics

```js
// Retrieve all monthly financial metrics for your company.
// Optionally scope to an individual metric and/or plan.
const response = await profitWell.metrics.getMonthly({
    plan_id: 'field_plan',
    metrics: [
      monthlyMetrics.activeCustomers,
      monthlyMetrics.churnedCustomersCancellations,
      monthlyMetrics.churnedRecurringRevenue
    ]
})
```

```js
// Retrieve financial metrics broken down by day for either the current month or the last.
// Optionally scope to an individual metric and/or plan.
const response = await profitWell.metrics.getDaily({
    month: '2020-07',
    plan_id: 'field_plan3',
    metrics: [
      dailyMetrics.futureChurnMRR,
      dailyMetrics.upgradedRecurringRevenue,
      dailyMetrics.reactivatedRecurringRevenue
    ]
})
```

```js
// Exclude user's data from the calculation of all metrics.
const response = await profitWell.metrics.excludeCustomer('da044c6e')
```


<div align="right">
  <a href="https://github.com/FieldControl/profitwell/blob/master/test/resources/metrics.spec.js" target="_blank">see tests</a> - <a href="https://profitwellapiv2.docs.apiary.io/#reference/metrics" target="_blank">see docs</a>
</div>

<div align="center">
  <img height="30px" src=".github/assets/separator.png"/>
</div>


### Company

```js
// Get your company's ProfitWell account settings.
const response = await profitWell.company.getSettings()
```

<div align="right">
  <a href="https://github.com/FieldControl/profitwell/blob/master/test/resources/company.spec.js" target="_blank">see tests</a> - <a href="https://profitwellapiv2.docs.apiary.io/#reference/company" target="_blank">see docs</a>
</div>

<div align="center">
  <img height="30px" src=".github/assets/separator.png"/>
</div>

## Pull Requests

- **Add tests!** Your patch won't be accepted if it doesn't have tests.
- **Document any change in behaviour**. Make sure the README and any other
  relevant documentation are kept up-to-date.
- **Create topic branches**. Don't ask us to pull from your master branch.
- **One pull request per feature**. If you want to do more than one thing, send
  multiple pull requests.

<div align="center">
  <img height="30px" src=".github/assets/separator.png"/>
</div>

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <br/>
  <br/>
  <br/>
  <br/>
</div>

<div align="center">
  <p>
    <sub>
      Open source, from <a href="https://instagram.com/fieldcontrolapp" target="_blank">Field Control</a> with ❤ - <a href="https://fieldcontrol.com.br/vaga-para-desenvolvedor.html?utm_source=github&utm_medium=opensource&utm_campaign=contaazul">We are hiring!</a>
    </sub>
  </p> 
</div>