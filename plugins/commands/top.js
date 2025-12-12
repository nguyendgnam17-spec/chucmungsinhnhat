module.exports.config = {
  name: 'top',
  version: '1.0.0',
  role: 0,
  author: 'Adapted',
  description: 'Xem top tương tác',
  category: 'Tiện ích',
  usage: 'top',
  cooldowns: 5,
};

module.exports.run = async ({ event, api, Users }) => {
  const { threadId } = event;
  const allUsers = await Users.getAll();
  const topUsers = allUsers
    .filter(u => u.data?.tuongtac?.[threadId])
    .sort((a, b) => (b.data.tuongtac[threadId] || 0) - (a.data.tuongtac[threadId] || 0))
    .slice(0, 10);

  if (topUsers.length === 0) return api.sendMessage("Chưa có dữ liệu tương tác!", threadId);

  const msg = "Top tương tác:\n" + topUsers.map((u, i) => `${i+1}. ${u.data.name || u.userId}: ${u.data.tuongtac[threadId]}`).join("\n");
  return api.sendMessage(msg, threadId);
};