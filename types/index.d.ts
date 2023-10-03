import {
    FastifyPluginAsync,
  } from 'fastify';
  
  type fastifyCloudFlareTurnstile = FastifyPluginAsync<fastifyCloudFlareTurnstile.fastifyCloudFlareTurnstileOptions>;
  
  /**
   * Namespace for fastify-cf-turnstile plugin.
   *
   * @namespace fastifyCloudFlareTurnstile
   */
  declare namespace fastifyCloudFlareTurnstile {
  
    export interface fastifyCloudFlareTurnstileOptions {
        sitekey: string;
        privatekey: string;
    }

    export const fastifyCloudFlareTurnstile: fastifyCloudFlareTurnstile
    export { fastifyCloudFlareTurnstile as default }
  }
  
  declare function fastifyCloudFlareTurnstile(...params: Parameters<fastifyCloudFlareTurnstile>): ReturnType<fastifyCloudFlareTurnstile>
  export = fastifyCloudFlareTurnstile
  
