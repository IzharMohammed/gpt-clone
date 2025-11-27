import { Plus, MessageSquare, User, Settings, LogOut } from "lucide-react";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-gray-100 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col border-r border-white/10`}
      >
        <div className="p-3">
          <button className="flex items-center gap-3 w-full px-3 py-3 rounded-md border border-white/20 hover:bg-gray-900 transition-colors text-sm text-white">
            <Plus className="w-4 h-4" />
            New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          <div className="text-xs font-medium text-gray-500 mb-3 px-2">
            Today
          </div>
          <button className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-gray-900 transition-colors text-sm text-gray-100 group">
            <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-white" />
            <span className="truncate">React Server Components</span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-gray-900 transition-colors text-sm text-gray-100 group">
            <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-white" />
            <span className="truncate">Next.js 15 Features</span>
          </button>
        </div>

        <div className="p-3 border-t border-white/10">
          <button className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-gray-900 transition-colors text-sm text-gray-100">
            <User className="w-4 h-4" />
            <div>Upgrade plan</div>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-gray-900 transition-colors text-sm text-gray-100">
            <div className="w-5 h-5 rounded-sm bg-green-500 flex items-center justify-center text-xs font-bold text-white">
              I
            </div>
            <div className="font-medium">Izhar Mohammed</div>
          </button>
        </div>
      </div>
    </>
  );
}
