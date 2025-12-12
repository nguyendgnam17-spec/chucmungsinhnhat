const animals = ["bau", "cua", "ca", "nai", "ga", "tom"];

module.exports.config = {
  name: "baucua",
  version: "1.0.5",
  role: 0,
  author: "Adapted from Zeid_Bot",
  description: "Game bầu cua",
  category: "game",
  usage: "baucua <animal>:<amount>",
  cooldowns: 10,
};

module.exports.run = async ({ args, event, api, Users }) => {
  const { threadId, senderID } = event;
  const bet = args[0]?.split(":");
  if (!bet || !animals.includes(bet[0])) return api.sendMessage("Cách dùng: baucua bau:1000", threadId);

  const animal = bet[0];
  const amount = parseInt(bet[1]);
  if (isNaN(amount) || amount <= 0) return api.sendMessage("Số tiền không hợp lệ!", threadId);

  let userData = (await Users.getData(senderID)).data || {};
  if ((userData.money || 0) < amount) return api.sendMessage("Không đủ tiền!", threadId);

  // Simulate roll (random 3 animals)
  const result = Array.from({ length: 3 }, () => animals[Math.floor(Math.random() * animals.length)]);
  const win = result.includes(animal);
  const payout = win ? amount * 2 : 0;  // Simple 2x win

  userData.money += payout - amount;
  await Users.setData(senderID, userData);

  const msg = `Kết quả: ${result.join(", ")}\n${win ? "Thắng!" : "Thua!"} Số dư: ${userData.money.toLocaleString()} VND`;
  return api.sendMessage(msg, threadId);
};