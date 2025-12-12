module.exports.config = {
  name: "taixiu",
  version: "1.0.0",
  role: 0,
  author: "Adapted from Zeid_Bot",
  description: "Game tài xỉu",
  category: "game",
  usage: "taixiu <tai/xiu> <amount>",
  cooldowns: 10,
};

module.exports.run = async ({ args, event, api, Users }) => {
  const { threadId, senderID } = event;
  const betType = args[0]?.toLowerCase();
  const amount = parseInt(args[1]);
  if (!['tai', 'xiu'].includes(betType) || isNaN(amount) || amount <= 0) return api.sendMessage("Cách dùng: taixiu tai 1000", threadId);

  let userData = (await Users.getData(senderID)).data || {};
  if ((userData.money || 0) < amount) return api.sendMessage("Không đủ tiền!", threadId);

  // Roll 3 dice
  const dice = Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1);
  const sum = dice.reduce((a, b) => a + b, 0);
  const result = sum >= 11 ? 'tai' : 'xiu';
  const win = betType === result;
  const payout = win ? amount * 2 : 0;

  userData.money += payout - amount;
  await Users.setData(senderID, userData);

  const msg = `Xúc xắc: ${dice.join(', ')} = ${sum} (${result})\n${win ? "Thắng!" : "Thua!"} Số dư: ${userData.money.toLocaleString()} VND`;
  return api.sendMessage(msg, threadId);
};