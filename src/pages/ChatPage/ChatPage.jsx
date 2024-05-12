import { useState } from "react";
import axios from "axios";
import styles from "./ChatPage.module.css";
// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   // { text: "Hello, I'm ChatGPT! Ask me anything!", isBot: true },
//   const [inputValue, setInputValue] = useState("");

//   const handleMessageSubmit = async (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;
//     console.log("inputValue", inputValue);
//     // Добавляем сообщение пользователя к чату
//     setMessages([...messages, { text: inputValue, isBot: false }]);
//     setInputValue("");
//     const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
//     console.log("KEY", API_KEY);
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${API_KEY}`,
//     };
//     try {
//       // Отправляем сообщение к API OpenAI и получаем ответ
//       const response = await axios.post(
//         "https://api.openai.com/v1/completions",
//         {
//           prompt: inputValue,
//           max_tokens: 150,
//         },
//         { headers }
//       );

//       // Добавляем ответ от ChatGPT к чату
//       setMessages([
//         ...messages,
//         { text: response.data.choices[0].text.trim(), isBot: true },
//       ]);
//     } catch (error) {
//       console.error("Error fetching response from OpenAI API:", error);
//       // Можно добавить обработку ошибок, если нужно
//     }
//   };

//   return (
//     <div className={styles.pageWrpapper}>
//       <div className={styles.sectionBlog}>
//         <div className={styles.containerBlog}>
//           {" "}
//           <div className="chat-container">
//             <div className="messages">
//               {messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`message ${message.isBot ? "bot" : "user"}`}
//                 >
//                   {message.text}
//                 </div>
//               ))}
//             </div>
//             <form onSubmit={handleMessageSubmit}>
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 placeholder="Type your message here..."
//               />
//               <button type="submit">Send</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
const ChatPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

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
export default ChatPage;

//Where are the best place for windsurfing
