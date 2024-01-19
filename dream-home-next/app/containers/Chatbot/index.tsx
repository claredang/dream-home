"use client";
import React, { useState } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "../../chatbot-style/main.scss";
import Image from "next/image";
import ChatbotButton from "../../_components/ChatbotButton";
import { systemMessage, processUserMessage } from "./systemMessage";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

interface Message {
  message: string;
  sender: string;
}

export default function Chatbot({ children }: { children?: React.ReactNode }) {
  const [isChatOpen, setChatOpen] = useState(false);

  const handleToggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Dream Home virtual assistant! Ask me anything!",
      // sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message: string) => {
    console.log("handle send request: ", typeof message);
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };
    console.log("message", message);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      let final_content = processUserMessage(content);

      if (final_content === "Irrelevant") {
        const chatGPTResponse = {
          message:
            "Our website only provide answer related to design. Do you want to want some suggestion about style",
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      } else {
        const apiRequestBody = {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: message },
            { role: "system", content: final_content },
          ],
          temperature: 0.42,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        };

        let final_response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
          }
        );

        if (!final_response.ok) {
          console.error("OpenAI API error:", await final_response.text());

          return;
        }

        const jsonResponse = await final_response.json();
        final_response = jsonResponse.choices[0]?.message?.content;
        console.log("final response: ", typeof final_response);

        if (typeof final_response === "string") {
          const chatGPTResponse = {
            message: final_response,
            sender: "ChatGPT",
          };

          setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
        } else {
          console.error(
            "Unexpected response content type:",
            typeof final_response
          );
        }
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages: Message[]) {
    const apiMessages = chatMessages.map((messageObject: Message) => {
      const role = messageObject.sender === "ChatGPT" ? "system" : "user";
      return { role, content: messageObject.message };
    });

    console.log(chatMessages, apiMessages);
    const apiRequestBody = {
      model: "gpt-3.5-turbo-1106",
      messages: [{ role: "system", content: systemMessage }, ...apiMessages],
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <div className={`chatbot-button  ${isChatOpen ? "chat-open" : ""}`}>
      {!isChatOpen && <ChatbotButton onClick={handleToggleChat} />}
      {isChatOpen && (
        <div className="chat-open-container relative h-[500px] w-[300px] rounded-lg">
          <div
            className="flex justify-between rounded-t-xl p-2"
            style={{
              backgroundImage:
                "linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%)",
            }}
          >
            <p className="text-white">Dream Home</p>
            <button
              className="absolute right-[10px] z-999"
              onClick={handleCloseChat}
            >
              <Image
                src="close-button.svg"
                alt="close-button"
                width={16}
                height={14}
              />
            </button>
          </div>
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="Chatbot is typing" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  const isFirstMessage = i === 0;
                  const messageStyle = isFirstMessage
                    ? { marginTop: "10px", textAlign: "left" }
                    : { textAlign: "left" };
                  return (
                    <Message key={i} model={message} style={messageStyle} />
                  );
                })}
              </MessageList>
              <MessageInput
                placeholder="Send a Message"
                onSend={handleSendRequest}
                style={{ textAlign: "left" }}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      )}
      {children}
    </div>
  );
}
