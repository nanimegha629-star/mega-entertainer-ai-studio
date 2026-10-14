# MEGA ENTERTAINER AI STUDIO — starter package

Mobile-first dashboard for a Sudigali Sudheer × NTR fan-content workflow. Designed to be managed from an Android phone with GitHub and Vercel.

## Important: what this ZIP does and does not do

**Included now**
- Responsive dashboard for phone screens.
- Vercel serverless API routes for status and a safe configuration check.
- GitHub Actions schedule set for 08:00 IST daily (02:30 UTC).
- Integration status checks for Telegram, Google Drive and generic image/video API credentials.
- Honest status reporting: the starter does not count placeholders as finished media.

**Not included yet**
- No actual AI image/video generation adapter is configured.
- No Google Drive upload or Telegram delivery has been executed.
- No research source/provider is configured.
- The scheduled action currently performs a safe production check; it does **not** create 2 videos and 4 posters.
- Free AI video generation at this volume cannot be guaranteed. Provider API access, free quotas, storage, and execution limits vary.

## Deploy from Android

1. Download and extract this ZIP using your phone's file manager.
2. Open GitHub in Chrome and create a new repository named `mega-entertainer-ai-studio`. Choose **Public** only if you are comfortable making the code public; never add credentials to files.
3. Upload the extracted project files and folders into the repository. Keep `.github/workflows/daily-check.yml` in its exact folder path. GitHub's browser uploader may be awkward for nested folders; if it cannot preserve folders, upload files using GitHub's web editor and create the folders as needed.
4. In Vercel, choose **Add New → Project**, import the GitHub repository, and deploy. Framework preset can be **Other**; no build command is required.
5. Open the deployed Vercel URL. The dashboard should load. API status should report that generation is not enabled.

## Add secrets safely in Vercel

Vercel project → **Settings → Environment Variables**. Add values there, not in `app.js`, `index.html`, README, or committed source files.

- `STUDIO_RUN_SECRET`: long random secret used to protect scheduled runs.
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`: Telegram BotFather token and your private chat ID.
- `GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_DRIVE_FOLDER_ID`: Google service account JSON and Drive folder ID. Share the destination folder with the service account email.
- `IMAGE_API_URL`, `IMAGE_API_KEY`, `VIDEO_API_URL`, `VIDEO_API_KEY`: only useful after implementing the matching provider-specific API adapter. These names alone do not make an arbitrary API compatible.

Redeploy after changing environment variables.

## Configure GitHub's daily check

1. Open repository → **Settings → Secrets and variables → Actions**.
2. Add repository secrets:
   - `STUDIO_URL` = your Vercel deployment URL, e.g. `https://your-project.vercel.app`
   - `STUDIO_RUN_SECRET` = exactly the same value as `STUDIO_RUN_SECRET` in Vercel.
3. Open **Actions** and enable workflows if GitHub asks.
4. Run **Daily studio check → Run workflow** once manually. Check the log for a successful HTTP response.
5. GitHub scheduled workflows can be delayed and may be disabled in inactive public repositories. 08:00 is a target, not a guaranteed delivery time.

## Telegram setup (later)

1. In Telegram, open the official `@BotFather` account and create a bot.
2. Send a message to your bot, then obtain your chat ID using a trusted method.
3. Add token and chat ID to Vercel environment variables. Never share your bot token in chat or upload it to GitHub.

## Google Drive setup (later)

1. Create the two main folders and child folders manually:
   - `MEGA ENTERTAINER AI STUDIO/SUDIGALI SUDHEER/VIDEOS`
   - `MEGA ENTERTAINER AI STUDIO/SUDIGALI SUDHEER/POSTERS`
   - `MEGA ENTERTAINER AI STUDIO/NTR/VIDEOS`
   - `MEGA ENTERTAINER AI STUDIO/NTR/POSTERS`
2. A Google Cloud service account and Drive API configuration are required for automated uploads. Share the target folder with the service account email.
3. Store the service account JSON in Vercel environment variables only. Do not commit it to GitHub.

## Production readiness checklist

Before enabling real daily production, implement and test:
- A research adapter that returns source links and avoids unverified claims.
- An image adapter and video adapter for the specific provider APIs selected.
- Output validation (HTTP success, file signature/MIME, nonzero file size, and playable MP4 checks).
- Upload adapters for Drive and Telegram, with retry/backoff and duplicate protection.
- A run manifest with timestamp, status, output URLs, provider IDs, and errors.
- Cost/quota guardrails so a failed or paid request cannot silently run up charges.

## Troubleshooting

- Dashboard loads but status says “Not connected”: check Vercel deployment logs and whether `api/status.js` deployed.
- Scheduled action fails: confirm both GitHub secrets exist, Vercel URL is correct, and `STUDIO_RUN_SECRET` matches.
- Do not paste tokens or service account JSON into this chat. If a credential was exposed publicly, revoke it and create a new one.
