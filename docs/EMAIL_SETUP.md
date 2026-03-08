# Email Setup Guide: Cloudflare + Resend + Gmail

Complete setup instructions for sending and receiving emails as `hello@codeagentswarm.com`.

**What you get after this setup:**
- Receive emails at `hello@codeagentswarm.com` in your personal Gmail
- Send emails from Gmail as `hello@codeagentswarm.com`
- Programmatically send emails via Resend API (for surveys, notifications, etc.)
- Full SPF, DKIM, and DMARC authentication (no spam folder)

---

## Part 1: Cloudflare Email Routing (FREE)

Cloudflare Email Routing forwards incoming emails from your custom domain to your personal Gmail. No mail server needed.

### 1.1 Prerequisites

- A domain registered somewhere (e.g., Namecheap, GoDaddy, Google Domains)
- A Cloudflare account (free tier works)

### 1.2 Add Domain to Cloudflare

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **"Add a site"**
3. Enter `codeagentswarm.com`
4. Select the **Free** plan
5. Cloudflare will scan existing DNS records -- review and confirm

### 1.3 Change Nameservers at Your Registrar

Cloudflare will provide two nameservers (e.g., `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`).

**For Namecheap:**
1. Go to **Domain List** > click on your domain
2. Under **Nameservers**, select **"Custom DNS"**
3. Add both Cloudflare nameservers
4. Save changes

**For other registrars:** Find the nameserver/DNS settings and replace with the Cloudflare nameservers.

### 1.4 Wait for Propagation

- Usually takes 5-30 minutes, can take up to 24 hours
- Cloudflare will email you when it is active
- You can check status at [dash.cloudflare.com](https://dash.cloudflare.com) -- the domain should show "Active"

### 1.5 Enable Email Routing

1. In Cloudflare dashboard, select your domain
2. Go to **Email** > **Email Routing**
3. Click **"Get started"** or **"Enable Email Routing"**
4. Cloudflare will automatically add the required MX and TXT records

### 1.6 Create Email Routes

Create forwarding rules for your custom addresses:

| Custom Address | Forwards To | Purpose |
|---|---|---|
| `hello@codeagentswarm.com` | `your-personal@gmail.com` | General / outbound sender |
| `support@codeagentswarm.com` | `your-personal@gmail.com` | Support inquiries |

**To create a route:**
1. Go to **Email** > **Email Routing** > **Routing rules**
2. Click **"Create address"**
3. Enter the custom address (e.g., `hello`)
4. Select destination: your personal Gmail
5. Save

### 1.7 Verify Destination Email

- Cloudflare will send a verification email to your personal Gmail
- Click the verification link
- Status should change to "Verified"

---

## Part 2: Resend Setup (FREE - 3,000 emails/month)

Resend is used for sending transactional and marketing emails programmatically.

### 2.1 Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up (GitHub OAuth works)
3. Free tier includes 3,000 emails/month and 100 emails/day

### 2.2 Add Your Domain

1. Go to **Domains** in the Resend dashboard
2. Click **"Add Domain"**
3. Enter `codeagentswarm.com`
4. Region: select the closest to your users (e.g., "us-east-1")

### 2.3 Add DNS Records in Cloudflare

Resend will show you DNS records to add. Go to your Cloudflare dashboard > **DNS** > **Records** and add each one:

#### SPF Record

| Type | Name | Content | TTL |
|------|------|---------|-----|
| TXT | `@` | `v=spf1 include:send.resend.com ~all` | Auto |

> **Note:** If you already have an SPF record (e.g., from Cloudflare Email Routing), merge them into a single TXT record. Example: `v=spf1 include:_spf.mx.cloudflare.net include:send.resend.com ~all`

#### DKIM Records (3 CNAME records)

Resend provides three CNAME records for DKIM signing. Add all three:

| Type | Name | Target | TTL |
|------|------|--------|-----|
| CNAME | `resend._domainkey` | (value from Resend dashboard) | Auto |
| CNAME | `resend2._domainkey` | (value from Resend dashboard) | Auto |
| CNAME | `resend3._domainkey` | (value from Resend dashboard) | Auto |

> Copy the exact values from your Resend dashboard. They look like: `xxxxxxxx.dkim.resend.dev`

#### DMARC Record

| Type | Name | Content | TTL |
|------|------|---------|-----|
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:hello@codeagentswarm.com` | Auto |

> Start with `p=none` (monitor only). After verifying everything works, you can tighten to `p=quarantine` or `p=reject`.

### 2.4 Verify Domain

1. Go back to **Domains** in Resend
2. Click **"Verify"** next to your domain
3. DNS propagation usually takes 1-5 minutes with Cloudflare
4. All records should show green checkmarks

### 2.5 Generate API Key

1. Go to **API Keys** in Resend dashboard
2. Click **"Create API Key"**
3. Name it (e.g., `codeagentswarm-landing`)
4. Permission: **"Sending access"** is enough for just sending
5. Domain: restrict to `codeagentswarm.com` for safety
6. Copy the key (starts with `re_`)

### 2.6 Add to Environment

Add to your `.env` file (or `.env.local` for Next.js):

```bash
RESEND_API_KEY=re_your_api_key_here
```

**Never commit this key to git.** Make sure `.env` is in your `.gitignore`.

---

## Part 3: Gmail "Send As" Configuration

This lets you send emails from Gmail as `hello@codeagentswarm.com` using Resend as the SMTP relay.

### 3.1 Open Gmail Settings

1. Open [Gmail](https://mail.google.com)
2. Click the **gear icon** (top right) > **"See all settings"**
3. Go to the **"Accounts and Import"** tab

### 3.2 Add "Send Mail As" Address

1. Find **"Send mail as:"** section
2. Click **"Add another email address"**
3. Fill in:
   - **Name:** `CodeAgentSwarm` (or your preferred sender name)
   - **Email address:** `hello@codeagentswarm.com`
   - Uncheck **"Treat as an alias"** (optional, depends on your preference)
4. Click **"Next Step"**

### 3.3 SMTP Configuration

Enter these settings:

| Setting | Value |
|---------|-------|
| **SMTP Server** | `smtp.resend.com` |
| **Port** | `465` |
| **Username** | `resend` |
| **Password** | Your Resend API key (`re_xxxxx`) |
| **Secured connection** | SSL (should be auto-selected with port 465) |

Click **"Add Account"**.

### 3.4 Verify the Address

1. Gmail will send a verification email to `hello@codeagentswarm.com`
2. Since Cloudflare routes this to your Gmail, you will receive it in the same inbox
3. Click the verification link or enter the confirmation code
4. The address should now appear as verified

### 3.5 Set as Default (Optional)

If you want Gmail to default to sending as `hello@codeagentswarm.com`:

1. Go back to **Settings** > **Accounts and Import**
2. Find `hello@codeagentswarm.com` in the "Send mail as" list
3. Click **"make default"**

---

## Part 4: DNS Records Summary

Complete list of all DNS records needed in Cloudflare:

### Email Routing Records (added automatically by Cloudflare)

| Type | Name | Content | Purpose |
|------|------|---------|---------|
| MX | `@` | `isaac.mx.cloudflare.net` (priority 69) | Cloudflare email routing |
| MX | `@` | `linda.mx.cloudflare.net` (priority 6) | Cloudflare email routing |
| TXT | `@` | `v=spf1 include:_spf.mx.cloudflare.net include:send.resend.com ~all` | SPF (merged) |

> Note: MX record values may vary. Use the values Cloudflare provides during Email Routing setup.

### Resend Records (added manually)

| Type | Name | Content | Purpose |
|------|------|---------|---------|
| CNAME | `resend._domainkey` | _(from Resend dashboard)_ | DKIM signature 1 |
| CNAME | `resend2._domainkey` | _(from Resend dashboard)_ | DKIM signature 2 |
| CNAME | `resend3._domainkey` | _(from Resend dashboard)_ | DKIM signature 3 |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:hello@codeagentswarm.com` | DMARC policy |

### Verification Checklist

- [ ] MX records pointing to Cloudflare (auto-added)
- [ ] SPF record includes both Cloudflare and Resend
- [ ] Three DKIM CNAME records for Resend
- [ ] DMARC TXT record in place
- [ ] Resend domain shows "Verified"
- [ ] Cloudflare Email Routing shows "Active"

---

## Part 5: Testing

### 5.1 Test Receiving (Cloudflare Routing)

1. From a **different email account** (not your Gmail), send an email to `hello@codeagentswarm.com`
2. Check your personal Gmail inbox
3. You should receive the email within a few seconds
4. Repeat for `support@codeagentswarm.com`

### 5.2 Test Sending from Gmail

1. In Gmail, click **Compose**
2. Click the **From** field and select `hello@codeagentswarm.com`
3. Send an email to a different address you control
4. Verify:
   - The "From" shows `hello@codeagentswarm.com`
   - The email does not land in spam
   - Check email headers for SPF=pass, DKIM=pass

### 5.3 Test the Sending Script (Dry Run)

```bash
cd codeagentswarm-landing

# Make sure env vars are set
export RESEND_API_KEY=re_your_key
export SUPABASE_URL=https://your-project.supabase.co
export SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Preview without sending
npx tsx scripts/send-discovery-email.ts --dry-run
```

This will show you all the users that would receive the email without actually sending anything.

### 5.4 Test Send to Yourself

```bash
# Send to just 1 user (make sure you're first in the list, or use a test user)
npx tsx scripts/send-discovery-email.ts --limit 1
```

Check your inbox:
- Email arrived from `hello@codeagentswarm.com`
- Subject: "We'd love your feedback on CodeAgentSwarm"
- Dark themed design renders correctly
- CTA button links to the survey page
- Your name appears in the greeting (if available in Supabase)

### 5.5 Verify Email Authentication

Use one of these tools to check that SPF, DKIM, and DMARC all pass:

1. **Gmail:** Open the received email > click the three dots > "Show original" > check authentication results
2. **[mail-tester.com](https://www.mail-tester.com):** Send a test email to the provided address and check your score
3. **[mxtoolbox.com](https://mxtoolbox.com/SuperTool.aspx):** Enter your domain and check DNS records

### 5.6 Full Send

Once everything checks out:

```bash
# Send to all users
npx tsx scripts/send-discovery-email.ts
```

Monitor the console output for any failures. The script will print a summary at the end.

---

## Troubleshooting

### Emails going to spam
- Check SPF, DKIM, and DMARC records are all properly set
- Make sure the SPF record is merged (only one TXT record with `v=spf1`)
- Use [mail-tester.com](https://www.mail-tester.com) to diagnose
- Start with a small batch and build sender reputation

### Cloudflare Email Routing not working
- Verify nameservers are pointing to Cloudflare
- Check that MX records are present in DNS
- Make sure the destination email is verified
- Check Cloudflare Email Routing activity logs

### Gmail "Send As" verification email not arriving
- Make sure Cloudflare Email Routing is active
- Check that `hello@codeagentswarm.com` routes to your Gmail
- Check spam/junk folder
- Try resending the verification

### Resend domain verification stuck
- DNS propagation can take up to 48 hours (rare with Cloudflare)
- Double-check CNAME values match exactly (no trailing dots unless required)
- Try the "Re-verify" button in Resend dashboard

### Script errors
- `RESEND_API_KEY not set`: Export the environment variable or add to `.env`
- `No users found`: Check your Supabase connection and that the users table has email data
- `Rate limit exceeded`: The free tier allows 100 emails/day. Wait or upgrade.

---

## Cost Summary

| Service | Plan | Monthly Cost | Limits |
|---------|------|-------------|--------|
| Cloudflare Email Routing | Free | $0 | Unlimited forwarding |
| Resend | Free | $0 | 3,000 emails/month, 100/day |
| Gmail | Free (personal) | $0 | Send as custom domain |
| **Total** | | **$0** | |

For higher volumes, Resend Pro is $20/month for 50,000 emails/month.
