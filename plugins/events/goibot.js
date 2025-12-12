const axios = require('axios');

module.exports.config = {
  name: "goibot",
  event_type: ["message"],
  version: "1.0.0",
  author: "Adapted from Zeid_Bot",
  description: "Gọi bot"
};

module.exports.run = async ({ event, api }) => {
  const { threadId, data } = event;
  const body = data?.content?.title ?? data?.content;
  if (!body || typeof body !== 'string') return;
  const lowerBody = body.toLowerCase();
  if (!lowerBody.includes("bot")) return;

  const afterBot = body.slice(body.toLowerCase().indexOf("bot") + 3).trim();
  if (afterBot) {
    // Use chatgpt for questions
    try {
      const response = await axios.get('https://api.zeidteam.xyz/ai/chatgpt4?prompt=' + encodeURIComponent(afterBot));
      const text = response.data.response;
      const safeText = text.length > 2000 ? text.substring(0, 2000) + '...' : text;
      return api.sendMessage(safeText, threadId);
    } catch (error) {
      return api.sendMessage("Bot không hiểu!", threadId);
    }
  } else {
    const responses = ["Bot đây!", "Gọi gì thế?", "Yêu bạn <3", "Sao vậy?", "Bot nghe đây!"];
    return api.sendMessage(responses[Math.floor(Math.random() * responses.length)], threadId);
  }
};