// Cloudflare Worker: forwards Daytulo connector routes on daytulo.com to Convex prod.
// GitHub Pages cannot proxy, so this only takes effect once deployed (see proxy/README.md).
const ORIGIN = 'https://fast-platypus-205.eu-west-1.convex.site';
const EXACT = new Set([
  '/mcp',
  '/.well-known/oauth-protected-resource',
  '/.well-known/oauth-protected-resource/mcp',
  '/.well-known/oauth-authorization-server',
  '/.well-known/openai-apps-challenge',
]);
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (!(EXACT.has(url.pathname) || url.pathname.startsWith('/oauth/'))) return fetch(request);
    const target = new URL(url.pathname + url.search, ORIGIN);
    return fetch(new Request(target, request), { redirect: 'manual' });
  },
};
