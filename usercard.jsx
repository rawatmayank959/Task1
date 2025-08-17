import React from "react";

export default function UserCard({ name, email }) {
  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-2xl shadow-md p-5">
      <div className="flex items-center space-x-4">
        {/* Avatar Circle */}
        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
          {name?.charAt(0).toUpperCase()}
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{name}</h2>
          <p className="text-sm text-slate-500">{email}</p>
        </div>
      </div>
    </div>
  );
}
