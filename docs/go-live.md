# Go live

1. Install dependencies:
   - `npm install`
2. Start locally:
   - `npm start`
3. Deploy to Railway (from this repository).
4. Point DNS `mcp.commandlayer.org` to Railway app.
5. Set ENS TXT:
   - `agent-endpoint[mcp] = https://mcp.commandlayer.org/mcp`
   - `agent-context` with runtime/service metadata.
