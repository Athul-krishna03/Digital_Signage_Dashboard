import React from "react";

interface SidebarProps {
    onSelect: (page: string) => void;
    activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect, activePage }) => {
    const menuItems = [
        {
        id: "content",
        label: "Content",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        }
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="px-6 py-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">TEAM EVIDE</h1>
        </div>
        <nav className="flex-1 px-4 py-6">
            <ul className="space-y-1">
            {menuItems.map((item) => (
                <li key={item.id}>
                <button
                    onClick={() => onSelect(item.id)}
                    className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activePage === item.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                    <span className={`mr-3 flex-shrink-0 ${
                    activePage === item.id ? "text-blue-700" : "text-gray-400"
                    }`}>
                    {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                </button>
                </li>
            ))}
            </ul>
        </nav>
        <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center px-3 py-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="ml-3">
                <p className="text-xs font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Sidebar;