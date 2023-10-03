import fastify from 'fastify'
import fastifyCloudFlareTurnstile from '..'
import { expectAssignable, expectError, expectType } from 'tsd';

const server = fastify()

expectError(server.register(fastifyCloudFlareTurnstile, {}));
expectError(server.register(fastifyCloudFlareTurnstile, { sitekey: 'test' }));
expectError(server.register(fastifyCloudFlareTurnstile, { privatekey: 'test' }));

server.register(fastifyCloudFlareTurnstile, {
  privatekey: 'test',
  sitekey: 'test',
});

expectError(
  server.register(fastifyCloudFlareTurnstile, {
    privatekey: 'test',
    sitekey: 1,
  })
);

expectError(
  server.register(fastifyCloudFlareTurnstile, {
    privatekey: 1,
    sitekey: 'test',
  })
);

expectError(
  server.register(fastifyCloudFlareTurnstile, {
    privatekey: 1,
    sitekey: 1,
  })
);

expectType<typeof fastifyCloudFlareTurnstile>(fastifyCloudFlareTurnstile);
expectAssignable<typeof fastifyCloudFlareTurnstile>(fastifyCloudFlareTurnstile);
