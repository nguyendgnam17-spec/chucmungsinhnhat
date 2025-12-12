module.exports.config = {
  name: "messageCounter",
  event_type: ["message"],
  version: "1.0.0",
  author: "Adapted",
  description: "Đếm tin nhắn cho top"
};

module.exports.run = async ({ event, api, Users }) => {
  const { threadId, senderID } = event;
  let userData = (await Users.getData(senderID)).data || {};
  if (!userData.tuongtac) userData.tuongtac = {};
  userData.tuongtac[threadId] = (userData.tuongtac[threadId] || 0) + 1;
  await Users.setData(senderID, userData);
};