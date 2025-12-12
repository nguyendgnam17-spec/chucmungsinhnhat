module.exports.config = {
  name: "goibot",
  event_type: ["message"],
  version: "1.0.0",
  author: "Adapted from Zeid_Bot",
  description: "Gọi bot"
};

module.exports.run = async ({ event, api }) => {
  const { threadId, body } = event;
  const responses = ["Bot đây!", "Gọi gì thế?", "Yêu bạn <3", "Sao vậy?", "Bot nghe đây!"];
  if (body && body.toLowerCase().includes("bot")) {
    api.sendMessage(responses[Math.floor(Math.random() * responses.length)], threadId);
  }
};