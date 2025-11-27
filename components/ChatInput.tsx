import { Send, Paperclip, Mic } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4">
      <div className="relative flex items-end w-full p-3 bg-[#2f2f2f] rounded-xl border border-transparent focus-within:border-gray-500/50 ring-offset-2 focus-within:ring-offset-2 ring-white/5">
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <Paperclip className="w-5 h-5" />
        </button>
        <textarea
          className="flex-1 max-h-48 min-h-[24px] bg-transparent border-0 focus:ring-0 resize-none py-2 px-3 text-white placeholder-gray-400"
          placeholder="Message ChatGPT..."
          rows={1}
          style={{ height: "44px" }} // Initial height
        />
        <button className="p-2 bg-white rounded-lg text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <Send className="w-4 h-4" />
        </button>
      </div>
      <div className="text-center mt-2">
        <p className="text-xs text-gray-500">
          ChatGPT can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}
