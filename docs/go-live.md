# Go live

1. Install dependencies:
   - `npm install`
2. Start locally:
   - `npm start`
3. Deploy to Railway (from this repository).
4. Point DNS `mcp.commandlayer.org` to Railway app.
5. Set ENS TXT:
   - `cl.mcp = https://mcp.commandlayer.org/mcp`
   - `cl.family = trust-verification`
   - `cl.verb = verify` (add additional verbs as they go live)
   - `cl.verifier = https://www.commandlayer.org/api/verify`
