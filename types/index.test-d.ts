import fastify from 'fastify'
import fastifyCloudFlareTurnstyle from '..'
import { expectAssignable, expectError, expectType } from 'tsd';

const server = fastify()

expectError(server.register(fastifyCloudFlareTurnstyle, {}));
expectError(server.register(fastifyCloudFlareTurnstyle, { sitekey: 'test' }));
expectError(server.register(fastifyCloudFlareTurnstyle, { privatekey: 'test' }));

server.register(fastifyCloudFlareTurnstyle, {
  privatekey: 'test',
  sitekey: 'test',
});

expectError(
  server.register(fastifyCloudFlareTurnstyle, {
    privatekey: 'test',
    sitekey: 1,
  })
);

expectError(
  server.register(fastifyCloudFlareTurnstyle, {
    privatekey: 1,
    sitekey: 'test',
  })
);

expectError(
  server.register(fastifyCloudFlareTurnstyle, {
    privatekey: 1,
    sitekey: 1,
  })
);

expectType<fastifyCloudFlareTurnstyle>(fastifyCloudFlareTurnstyle.fastifyCfTurnstile);
expectAssignable<fastifyCloudFlareTurnstyle>(fastifyCloudFlareTurnstyle.default);
