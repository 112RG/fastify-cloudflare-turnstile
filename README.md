# fastify-cf-turnstile
![CI](https://github.com/112RG/fastify-cf-turnstile/workflows/CI/badge.svg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

A [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) plugin for fastify.

This plugin does the [Server-side Validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) for cloudflare turnstile and it is upto you to implement [Client-side Validation](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
## Example

```javascript
const cfTurnstile = require('fastify-cf-turnstile')
fastify.register(cfTurnstile,{
    sitekey:"your_sitekey",
    privatekey:"your_privatekey",
})
```

Using in a route

```javascript
  fastify.post('/login', {
    preValidation: fastify.cfTurnstile,
    schema: {
      summary: 'User login',
      body: {
        type: 'object',
        properties: {
          email: {
            anyOf: [
              { type: 'string' },
              { type: 'object' }
            ]
          },
          password: {
            anyOf: [
              { type: 'string' },
              { type: 'object' }
            ]
          }
        },
        required: ['email', 'password']
      }
    }
  },
  async function (req, reply) {
    // Login logic
  })
```