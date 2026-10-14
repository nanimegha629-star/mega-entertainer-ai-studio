module.exports = async function handler(req, res) {
  const configured = {
    telegram: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) ? "Configured" : "Not configured",
    drive: Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON && process.env.GOOGLE_DRIVE_FOLDER_ID) ? "Configured" : "Not configured",
    imageGeneration: Boolean(process.env.IMAGE_API_URL && process.env.IMAGE_API_KEY) ? "Configured" : "Not configured",
    videoGeneration: Boolean(process.env.VIDEO_API_URL && process.env.VIDEO_API_KEY) ? "Configured" : "Not configured"
  };
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    status: "Starter deployed — generation not yet enabled",
    lastRun: "No production run recorded",
    counts: { sudheer: { videos: 0, posters: 0 }, ntr: { videos: 0, posters: 0 } },
    integrations: configured,
    steps: [
      {name:"Research & concepts", detail:"Research provider not connected; no concepts claimed as generated.", status:"NOT CONFIGURED"},
      {name:"Generate artwork and video", detail:"No provider request has been completed.", status:"NOT CONFIGURED"},
      {name:"Validate real output files", detail:"Only files with verified bytes and expected media type may count as complete.", status:"READY"},
      {name:"Deliver to Drive and Telegram", detail:"Integration status is shown above.", status:"CHECK SETUP"}
    ]
  });
};
