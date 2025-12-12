const path = require("path");
const fs = require("fs");
const axios = require("axios");

module.exports.config = {
  name: 'hon',
  aliases: ['kiss', 'hôn'],
  version: '1.0.0',
  role: 0,
  author: 'Adapted from Zeid_Bot',
  description: 'Hôn người bạn tag',
  category: 'Hành động',
  usage: 'hon [@tag]',
  cooldowns: 2,
  dependencies: {}
};

module.exports.run = async ({ event, api }) => {
    const { threadId, type, data } = event;

    var link = [
"https://i.imgur.com/0rKeVFp.gif",
"https://i.imgur.com/V4JnRiq.gif"
   ];

    const mentions = data.mentions;
    const hasMention = mentions && mentions.length > 0;

    if (!hasMention) {
        return api.sendMessage("❌ Bạn cần tag người muốn hôn!", threadId, type);
    }

    const receiverID = mentions[0].uid;

    const info = await api.getUserInfo(receiverID);
    const user = info.changed_profiles[receiverID];

    const name = user.displayName;

    const tempPath = path.join(__dirname, 'temp');
    const honPath = path.join(tempPath, 'hon.gif');
    if (!fs.existsSync(tempPath)) {
        fs.mkdirSync(tempPath, { recursive: true });
    }
    const randomLink = link[Math.floor(Math.random() * link.length)];

    const response = await axios.get(randomLink, {
        responseType: 'arraybuffer',
        headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'image/gif'
    }});

    fs.writeFileSync(honPath, response.data);

    const msg = {
        body: `💋 ${data.uidFrom} đã hôn ${name}!`,
        attachment: fs.createReadStream(honPath)
    };

    api.sendMessage(msg, threadId, type);

    setTimeout(() => {
        fs.unlinkSync(honPath);
    }, 10000);
};