import React from 'react'

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white border rounded-2xl p-6 flex items-center gap-4 shadow-sm">
      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
        <Icon size={24} />
      </div>

      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h3 className="text-2xl font-extrabold text-slate-900">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard
