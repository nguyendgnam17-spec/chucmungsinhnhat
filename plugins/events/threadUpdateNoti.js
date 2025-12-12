module.exports.config = {
  name: "threadUpdateNoti",
  event_type: ["event"],
  version: "1.0.0",
  author: "Adapted from Zeid_Bot",
  description: "Thông báo cập nhật nhóm"
};

module.exports.run = async ({ event, api }) => {
  const { threadId, logMessageType, logMessageData } = event;
  let msg = "";
  switch (logMessageType) {
    case "log:thread-name":
      msg = `Nhóm đổi tên thành: ${logMessageData.name}`;
      break;
    case "log:thread-image":
      msg = "Nhóm đổi ảnh đại diện!";
      break;
    case "log:thread-admins":
      if (logMessageData.ADMIN_EVENT === "add_admin") {
        msg = `${logMessageData.TARGET_ID} đã được thêm làm admin!`;
      } else if (logMessageData.ADMIN_EVENT === "remove_admin") {
        msg = `${logMessageData.TARGET_ID} đã bị gỡ admin!`;
      }
      break;
    case "log:user-nickname":
      msg = `${logMessageData.participant_id} đổi biệt danh thành: ${logMessageData.nickname}`;
      break;
    // Add more cases as needed
    default:
      return; // No message for unhandled events
  }
  if (msg) {
    api.sendMessage(msg, threadId);
  }
};