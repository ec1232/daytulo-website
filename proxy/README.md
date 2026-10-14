# Connector proxy

daytulo.com is served by GitHub Pages, which cannot rewrite or proxy paths. These routes must reach Convex prod (`https://fast-platypus-205.eu-west-1.convex.site`) with path and query preserved (see `docs/assistant-connector.md` in ec1232/daytulo):

- `/mcp`
- `/.well-known/oauth-protected-resource` and `/.well-known/oauth-protected-resource/mcp`
- `/.well-known/oauth-authorization-server`
- `/oauth/*` (register, authorize, token, revoke)
- `/.well-known/openai-apps-challenge` (ChatGPT domain check)

The legal pages (`/legal/privacy`, `/legal/terms`, `/support`, `/docs/assistants`) are served as static files from this repo; Convex serves identical copies.

`worker.js` + `wrangler.toml` do this as a Cloudflare Worker in front of Pages. Not active until:

1. The daytulo.com zone is added to Cloudflare and the Namecheap nameservers point to Cloudflare (keep the GitHub Pages A records and the `www` CNAME, proxied).
2. `cd proxy && npx wrangler deploy`.
3. `npx convex env set CONNECTOR_ORIGIN https://daytulo.com`, then `curl -s https://daytulo.com/.well-known/oauth-protected-resource` must contain `"resource":"https://daytulo.com/mcp"`.
