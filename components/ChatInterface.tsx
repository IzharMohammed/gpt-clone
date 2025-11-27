"use client";

import { useState } from "react";
import { Menu, SquarePen } from "lucide-react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import ChatInput from "./ChatInput";

export default function ChatInterface() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#212121] text-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-3 md:hidden bg-[#212121] text-gray-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-800 rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-medium">ChatGPT</span>
          <button className="p-2 hover:bg-gray-800 rounded-md">
            <SquarePen className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Header (Optional, usually just model selector) */}
        <div className="hidden md:flex items-center justify-between px-4 py-2 w-full max-w-3xl mx-auto">
             <div className="text-lg font-medium text-gray-200 cursor-pointer flex items-center gap-1 hover:bg-[#2f2f2f] px-3 py-2 rounded-lg transition-colors">
                ChatGPT 4o <span className="text-gray-500 text-xs">▼</span>
             </div>
        </div>


        {/* Chat Area */}
        <ChatArea />

        {/* Input Area */}
        <ChatInput />
      </div>
    </div>
  );
}
