'use strict'

const fastifyPlugin = require('fastify-plugin')

async function fastifyCloudFlareTurnstile (fastify, options, done) {
  if (!Object.prototype.hasOwnProperty.call(options, 'sitekey')) {
    throw new Error('sitekey must be set as a string in the options object.')
  }
  if (typeof options.sitekey !== 'string') {
    throw new Error('sitekey must be a string in the options object.')
  }
  if (!Object.prototype.hasOwnProperty.call(options, 'privatekey')) {
    throw new Error('privatekey must be set as a string in the options object.')
  }
  if (typeof options.privatekey !== 'string') {
    throw new Error('privatekey must be a string in the options object.')
  }
  fastify.decorate('cfTurnstile', cfTurnstile)

  async function cfTurnstile (req, reply, next) {
    const token = req.body['cf-turnstile-response']?.value || req.body['cf-turnstile-response']
    await verify(req, token, options.privatekey, next)
  }

  done()
}
async function verify (req, token, privatekey, next) {
  const ip = req.headers['cf-connecting-ip']

  const formData = new FormData()
  formData.append('secret', privatekey)
  formData.append('response', token)
  formData.append('remoteip', ip)

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
  const result = await fetch(url, {
    body: formData,
    method: 'POST'
  })
  const outcome = await result.json()
  if (!outcome.success) {
    const err = new Error('Invalid Captcha')
    err.status = 400
    throw err
  }
  return next()
}
module.exports = fastifyPlugin(fastifyCloudFlareTurnstile, { name: 'fastify-cf-turnstile' })
module.exports.default = fastifyCloudFlareTurnstile
module.exports.fastifyCfTurnstile = fastifyCloudFlareTurnstile
