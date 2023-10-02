const tap = require('tap')

const Fastify = require('fastify')
const fastifyCloudFlareTurnstile = require('..')

tap.test('Plugin should register successfully', async (t) => {
  const fastify = Fastify()
  fastify.register(fastifyCloudFlareTurnstile, {
    sitekey: 'your-sitekey',
    privatekey: 'your-privatekey'
  })
  try {
    await fastify.ready()
    t.pass('Passed')
  } catch (err) {
    t.fail('Failed to register plugin')
  }
})

tap.test('Plugin should throw an error without privatekey', async (t) => {
  const fastify = Fastify()
  try {
    await fastify.register(fastifyCloudFlareTurnstile, { sitekey: 'your-sitekey' })
    await fastify.ready()
    t.fail('Expected an error, but the plugin initialized successfully.')
  } catch (err) {
    t.equal(err.message, 'privatekey must be set as a string in the options object.')
  }
})
tap.test('Plugin should throw an error without sitekey', async (t) => {
  const fastify = Fastify()
  try {
    await fastify.register(fastifyCloudFlareTurnstile, { privatekey: 'your-sitekey' })
    await fastify.ready()
    t.fail('Expected an error, but the plugin initialized successfully.')
  } catch (err) {
    t.equal(err.message, 'sitekey must be set as a string in the options object.')
  }
})
tap.test('Plugin should throw an error if sitekey not a string', async (t) => {
  const fastify = Fastify()
  try {
    await fastify.register(fastifyCloudFlareTurnstile, { sitekey: 1 })
    await fastify.ready()
    t.fail('Expected an error, but the plugin initialized successfully.')
  } catch (err) {
    t.equal(err.message, 'sitekey must be a string in the options object.')
  }
})
tap.test('Plugin should throw an error if privatekey not a string', async (t) => {
  const fastify = Fastify()
  try {
    await fastify.register(fastifyCloudFlareTurnstile, { sitekey: 'test', privatekey: 1 })
    await fastify.ready()
    t.fail('Expected an error, but the plugin initialized successfully.')
  } catch (err) {
    t.equal(err.message, 'privatekey must be a string in the options object.')
  }
})
tap.test('Plugin should pass when captcha is valid', async (t) => {
  const fastify = Fastify()

  await fastify.register(fastifyCloudFlareTurnstile, { sitekey: '1x00000000000000000000AA', privatekey: '1x0000000000000000000000000000000AA' })
  fastify.post('/login', {
    preValidation: fastify.cfTurnstile,
    schema: {
      summary: 'User login'
    }
  },
  async function (req, reply) {
    reply.send('hello')
  })

  const response = await fastify.inject({
    method: 'POST',
    url: '/login',
    body: {
      'cf-turnstile-response': 'test'
    }
  })
  t.equal(response.statusCode, 200)
  t.equal(response.body, 'hello')
})
tap.test('Plugin should throw an error captcha is invalid', async (t) => {
  const fastify = Fastify()

  await fastify.register(fastifyCloudFlareTurnstile, { sitekey: '1x00000000000000000000AA', privatekey: '1x0000000000000000000000000000000AB' })
  fastify.post('/login', {
    preValidation: fastify.cfTurnstile,
    schema: {
      summary: 'User login'
    }
  },
  async function (req, reply) {
    reply.send('hello')
  })

  const response = await fastify.inject({
    method: 'POST',
    url: '/login',
    body: {
      'cf-turnstile-response': 'test'
    }
  })
  t.equal(response.statusCode, 400)
  t.equal(response.body, JSON.stringify({ statusCode: 400, error: 'Bad Request', message: 'Invalid Captcha' }))
})
