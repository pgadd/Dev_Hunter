import React from 'react';

export function DashboardHeader() {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between max-w-[1600px] mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">D</span>
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900">DevHunter AI</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-sm text-gray-600 hover:text-gray-900">Notifications</button>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
            </div>
        </header>
    );
}
