module.exports.config = {
  name: 'daily',
  version: '1.0.0',
  role: 0,
  author: 'Adapted from Zeid_Bot',
  description: 'Nhận thưởng mỗi ngày',
  category: 'Kiếm tiền',
  usage: 'daily',
  cooldowns: 2,
};

module.exports.run = async ({ event, api, Users }) => {
  const { threadId, senderID } = event;
  const rewardAmount = 10000;
  const cooldownTime = 12 * 60 * 60 * 1000;  // 12 hours

  let userData = (await Users.getData(senderID)).data || {};
  const lastClaim = userData.dailyCoolDown || 0;
  const timePassed = Date.now() - lastClaim;

  if (timePassed < cooldownTime) {
    const timeLeft = cooldownTime - timePassed;
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    return api.sendMessage(`Bạn đã nhận rồi! Quay lại sau ${hours} giờ ${minutes} phút.`, threadId);
  }

  userData.money = (userData.money || 0) + rewardAmount;
  userData.dailyCoolDown = Date.now();
  await Users.setData(senderID, userData);

  return api.sendMessage(`Bạn vừa nhận ${rewardAmount.toLocaleString()} VND! Quay lại sau 12 giờ.`, threadId);
};