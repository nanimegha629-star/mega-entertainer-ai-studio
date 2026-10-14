module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"Use POST for this endpoint."});
  const expected = process.env.STUDIO_RUN_SECRET;
  const supplied = (req.headers["x-studio-secret"] || "").trim();
  if (expected && supplied !== expected) return res.status(401).json({error:"Unauthorized. Configure the run secret before using automated runs."});
  const missing = [];
  if (!process.env.IMAGE_API_URL || !process.env.IMAGE_API_KEY) missing.push("image-generation provider");
  if (!process.env.VIDEO_API_URL || !process.env.VIDEO_API_KEY) missing.push("video-generation provider");
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) missing.push("Telegram delivery");
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON || !process.env.GOOGLE_DRIVE_FOLDER_ID) missing.push("Google Drive delivery");
  return res.status(200).json({
    ok: false,
    message: "Safe check completed. No content was generated or delivered.",
    blockers: missing,
    nextStep: missing.length ? "Configure the integrations listed in blockers. Free tiers and provider APIs may have usage limits." : "Integrations appear configured, but provider-specific adapters and end-to-end tests must be completed before enabling production."
  });
};