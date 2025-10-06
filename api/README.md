# Ignira API (JavaScript Version for Vercel)

## Endpoints

- `/api/epc` → POST with `{ postcode, addressLine }`
- `/api/notify` → POST with survey results
- `/api/waitlist` → POST with waitlist signup

## Deployment

1. Push this folder to a GitHub repo
2. Connect it to Vercel
3. Add environment variables in Vercel:

```
EPC_EMAIL=your@email.com
EPC_API_KEY=your-epc-api-key
NOTIFY_EMAIL=your@domain.com
```

4. That's it. The endpoints will go live after deployment.
