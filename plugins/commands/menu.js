module.exports.config = {
    name: 'menu',
    version: '1.0.0',
    role: 0,
    author: 'Integrated Bot',
    description: 'Hien thi danh sach lenh',
    category: 'Tien ich',
    usage: 'menu',
    cooldowns: 2,
    aliases: ['help', 'cmd']
};

module.exports.run = async ({ args, event, api }) => {
    const { threadId, type, data } = event;
    const commands = global.client.commands;
    const senderId = data?.uidFrom;

    let msg = `=== DANH SACH LENH ===\nID Bot: ${global.api?.zaloId || 'N/A'}\nID User: ${senderId || 'N/A'}\n\n`;

    const categories = {};
    const icons = {
        "game": "🎮",
        "Kiếm tiền": "💰",
        "Tiện ích": "🛠️",
        "Hành động": "👋",
        "Giải trí": "🎉",
        "image": "🖼️",
        "video": "🎥",
        "other": "📋",
        "Khac": "❓"
    };

    for (const [name, cmd] of commands) {
        const cat = cmd.config.category || "Khac";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push({
            name: cmd.config.name,
            description: cmd.config.description || "Khong co mo ta"
        });
    }

    for (const [cat, cmds] of Object.entries(categories)) {
        const icon = icons[cat.toLowerCase()] || "📋";
        msg += `${icon} [${cat}]\n`;
        cmds.forEach(c => {
            msg += `  ${global.config.prefix}${c.name} - ${c.description}\n`;
        });
        msg += "\n";
    }

    msg += `Tong cong: ${commands.size} lenh`;

    return api.sendMessage({ msg }, threadId, type);
};
