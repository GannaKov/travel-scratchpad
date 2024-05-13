import { useState } from "react";
import axios from "axios";
import styles from "./ChatPage.module.css";
//-----------------
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
//------------------
const ChatPage = () => {
  //   const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "You",
      role: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: message },
          ],
          model: "gpt-3.5-turbo",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const content = response.data.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          direction: "incoming",
          sender: "chatGPT",
          role: "assistant",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p className={styles.chatTitle}>Looking for inspiration? Ask!</p>
          <p className={styles.chatTitle}>Have questions? Ask!</p>

          <div
            className={styles.chatContainer}
            // style={{ position: "relative", height: "700px", width: "700px" }}
          >
            <MainContainer style={{ fontSize: "1.1em", lineHeight: "1.4em " }}>
              <ChatContainer>
                <MessageInput
                  placeholder="Send a Message"
                  onSend={handleSendMessage}
                />
                <MessageList
                  scrollBehavior="smooth"
                  typingIndicator={
                    isTyping ? (
                      <TypingIndicator content="ChatGPT is typing" />
                    ) : null
                  }
                >
                  {messages.map((message, i) => (
                    // return <Message key={i} model={message} />;

                    <Message key={i} model={message} />
                  ))}
                </MessageList>
              </ChatContainer>
            </MainContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
