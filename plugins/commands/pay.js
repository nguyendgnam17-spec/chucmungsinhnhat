module.exports.config = {
  name: 'pay',
  version: '1.0.0',
  role: 0,
  author: 'Adapted from Zeid_Bot',
  description: 'Chuyển tiền cho người khác',
  category: 'Tiện ích',
  usage: 'pay [@tag] [số tiền]',
  cooldowns: 3,
};

module.exports.run = async ({ args, event, api, Users }) => {
  const { threadId, senderID, mentions } = event;
  if (!mentions || Object.keys(mentions).length === 0) return api.sendMessage("Tag người nhận!", threadId);

  const receiverID = Object.keys(mentions)[0];
  const amount = parseInt(args[args.length - 1]);
  if (isNaN(amount) || amount <= 0) return api.sendMessage("Số tiền không hợp lệ!", threadId);

  let senderData = (await Users.getData(senderID)).data || {};
  let receiverData = (await Users.getData(receiverID)).data || {};

  if ((senderData.money || 0) < amount) return api.sendMessage("Không đủ tiền!", threadId);

  senderData.money -= amount;
  receiverData.money = (receiverData.money || 0) + amount;

  await Users.setData(senderID, senderData);
  await Users.setData(receiverID, receiverData);

  return api.sendMessage(`Đã chuyển ${amount.toLocaleString()} VND cho ${mentions[receiverID]}!`, threadId);
};