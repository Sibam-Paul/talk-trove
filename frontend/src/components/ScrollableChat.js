import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { Icon } from "@chakra-ui/icons";
import { FaBan } from "react-icons/fa";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div
            style={{
              display: "flex",
              justifyContent: m.sender._id === user._id ? "flex-end" : "flex-start",
              alignItems: "center",
              margin: "5px 0",
            }}
            key={m._id}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={m.sender._id === user._id ? 0 : 1}
                  ml={m.sender._id === user._id ? 1 : 0}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: m.sender._id === user._id ? "flex-end" : "flex-start",
                maxWidth: "75%",
              }}
            >
              <span
                style={{
                  backgroundColor: m.content === "This message was deleted."
                    ? "#2f2f2f"
                    : m.sender._id === user._id
                    ? "#BEE3F8"
                    : "#B9F5D0",
                  borderRadius: "10px",
                  padding: "10px 15px",
                  color: m.content === "This message was deleted." ? "#a0a0a0" : "black",
                  fontStyle: m.content === "This message was deleted." ? "italic" : "normal",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginRight: isSameSenderMargin(messages, m, i, user._id),
                }}
              >
                {m.content === "This message was deleted." && (
                  <Icon as={FaBan} color="#a0a0a0" boxSize={4} />
                )}
                {m.content}
              </span>
              {/* Timestamp styling */}
              <span
                style={{
                  fontSize: "10px",
                  color: "gray",
                  marginTop: "3px", // Creates a small gap between message and timestamp
                  alignSelf: m.sender._id === user._id ? "flex-end" : "flex-start",
                }}
              >
                {new Date(m.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
