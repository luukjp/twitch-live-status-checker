# Twitch Live Status Checker

I couldn’t find any documented way to check a channel’s live status without a user or app access token—and parsing the streamer’s page HTML just to determine if they’re live is far from ideal. So this repository demonstrates how to use Twitch's undocumented GraphQL endpoint to check if a channel is live without requiring a user or app access token.

## Endpoint

**POST** `https://gql.twitch.tv/gql`

## Required Headers

- `Client-ID`: `kimne78kx3ncx6brgo4mv6wki5h1ko`
- `Content-Type`: `application/json`

> **Note:** `kimne78kx3ncx6brgo4mv6wki5h1ko` is Twitch’s own public API Client‑ID (as used on twitch.tv). You can use it for simple queries, but twitch may throttle or flag requests originating from this public Client‑ID.

## GraphQL Query

```json
[
  {
    "operationName": "VideoPlayerStatusOverlayChannel",
    "query": "query VideoPlayerStatusOverlayChannel($channel: String!) { user(login: $channel) { id stream { id type __typename } __typename }}",
    "variables": { "channel": "<CHANNEL_NAME>" }
  }
]
```

Replace `<CHANNEL_NAME>` with the Twitch channel login you want to check.

## Disclaimer

Use this tool at your own risk. Twitch may change or restrict this undocumented API endpoint without notice, and using it could result in unexpected errors, rate limiting, IP bans?, or your requests being flagged as bot traffic.

## Credits

[GraphQL in Production – Analyzing Public GraphQL APIs #1: twitch.tv](https://wundergraph.com/blog/graphql_in_production_analyzing_public_graphql_apis_1_twitch_tv)
