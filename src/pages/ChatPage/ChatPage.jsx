import { useState } from "react";
import axios from "axios";
import styles from "./ChatPage.module.css";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false); //

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    // Make a request to the ChatGPT API with the user input
    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: input },
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

    // Update the conversation history with the response from ChatGPT
    setMessages([
      ...messages,
      {
        role: "assistant",
        content: response.data.choices[0].message.content,
      },
    ]);

    // Clear the input field
    setInput("");
  };
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <h2>Looking for inspiration? Ask!</h2>
          <h2>Have questions? Ask!</h2>
          <div className={styles.chatContainer}>
            {" "}
            <div>
              {messages.map((message, index) => (
                <div key={index} className={message.role}>
                  {message.content}
                </div>
              ))}
            </div>
            <div className={styles.inputChatWrp}>
              <input
                className={styles.inputChat}
                type="text"
                value={input}
                onChange={handleInputChange}
              />
              <button className={styles.btnChat} onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
//   TypingIndicator,
// } from "@chatscope/chat-ui-kit-react";

// const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
// const ChatPage = () => {
//   //   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I'm ChatGPT! Ask me anything!",
//       sentTime: "just now",
//       sender: "ChatGPT",
//     },
//   ]);

//   const [isTyping, setIsTyping] = useState(false);

//   const handleSendRequest = async (message) => {
//     const newMessage = {
//       message,
//       direction: "outgoing",
//       sender: "user",
//     };

//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setIsTyping(true);

//     try {
//       const response = await processMessageToChatGPT([...messages, newMessage]);
//       const content = response.data.choices[0]?.message?.content;
//       if (content) {
//         const chatGPTResponse = {
//           message: content,
//           sender: "ChatGPT",
//         };
//         setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
//       }
//     } catch (error) {
//       console.error("Error processing message:", error);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     const apiMessages = chatMessages.map((messageObject) => {
//       const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
//       return { role, content: messageObject.message };
//     });

//     const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
//     console.log("key", API_KEY);
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",

//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json",
//         },

//         // body: JSON.stringify(apiRequestBody),
//       },
//       {
//         model: "gpt-3.5-turbo",
//         messages: [
//           {
//             role: "system",
//             content: "You are a helpful assistant.",
//           },
//           ...apiMessages,
//         ],
//       }
//     );
//     console.log(response);
//     return response;
//   }
//   return (
//     <div className={styles.pageWrpapper}>
//       <div className={styles.sectionBlog}>
//         <div className={styles.containerBlog}>
//           <div
//             style={{ position: "relative", height: "800px", width: "700px" }}
//           >
//             <MainContainer>
//               <ChatContainer>
//                 <MessageList
//                   scrollBehavior="smooth"
//                   typingIndicator={
//                     isTyping ? (
//                       <TypingIndicator content="ChatGPT is typing" />
//                     ) : null
//                   }
//                 >
//                   {messages.map((message, i) => {
//                     console.log(message);
//                     return <Message key={i} model={message} />;
//                   })}
//                 </MessageList>
//                 <MessageInput
//                   placeholder="Send a Message"
//                   onSend={handleSendRequest}
//                 />
//               </ChatContainer>
//             </MainContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
export default ChatPage;

//Where are the best place for windsurfing
