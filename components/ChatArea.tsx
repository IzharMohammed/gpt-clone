import { Bot, User } from "lucide-react";
import { Message } from "./ChatInterface";
import AITextLoading from "./kokonutui/ai-text-loading";

interface ChatAreaProps {
  messages: Message[];
  isLoading?: boolean;
}

export default function ChatArea({ messages, isLoading }: ChatAreaProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center text-center mt-20 px-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
            <Bot className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-8">
            How can I help you today?
          </h2>
        </div>
      ) : (
        <div className="flex flex-col gap-6 pb-32 max-w-3xl mx-auto px-4 w-full pt-8">
          {messages.map((message, index) => (
            <div key={index} className="flex gap-4">
              <div
                className={`w-8 h-8 rounded-sm flex-shrink-0 flex items-center justify-center ${
                  message.role === "assistant" ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                {message.role === "assistant" ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-0">
              <AITextLoading className="text-lg text-white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
