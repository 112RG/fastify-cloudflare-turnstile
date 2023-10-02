import {
    FastifyPluginAsync,
  } from 'fastify';
  
  type fastifyCloudFlareTurnstile = FastifyPluginAsync<fastifyCloudFlareTurnstile.fastifyCloudFlareTurnstileOptions>;
  
  /**
   * Namespace for fastify-cf-turnstyle plugin.
   *
   * @namespace fastifyCloudFlareTurnstile
   */
  declare namespace fastifyCloudFlareTurnstile {
  
    export interface fastifyCloudFlareTurnstileOptions {
        sitekey: string;
        privatekey: string;
    }

    export const fastifyCfTurnstile: fastifyCloudFlareTurnstile
    export { fastifyCloudFlareTurnstile as default }
  }
  
  declare function fastifyCloudFlareTurnstile(...params: Parameters<fastifyCloudFlareTurnstile>): ReturnType<fastifyCloudFlareTurnstile>
  export = fastifyCloudFlareTurnstile
  