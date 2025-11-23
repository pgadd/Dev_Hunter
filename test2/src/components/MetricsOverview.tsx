import React from 'react';
import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function MetricsOverview() {
    const metrics = [
        { label: 'Active Candidates', value: '12', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pending Reviews', value: '5', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Completed', value: '28', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Action Required', value: '3', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    ];

    return (
        <div className="grid grid-cols-4 gap-6">
            {metrics.map((metric) => (
                <div key={metric.label} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">{metric.label}</p>
                            <p className="text-2xl font-semibold text-gray-900 mt-1">{metric.value}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${metric.bg}`}>
                            <metric.icon className={`w-6 h-6 ${metric.color}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
