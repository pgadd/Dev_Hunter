import React from 'react';
import { cn } from '../lib/utils'; // Assuming utils exists or I might need to create it. 
// Actually, let's check if lib/utils exists. If not, I'll inline a simple cn.
// But wait, shadcn usually has lib/utils.
// I'll assume standard shadcn structure or just use clsx/tailwind-merge directly if needed.
// For now, I'll use a simple className.

export type Candidate = {
    id: string;
    name: string;
    position: string;
    githubUrl: string;
    status: "new" | "analyzing" | "scheduled" | "completed" | "interviewing";
    score?: number;
    interviewDate?: string;
    avatar: string;
    analysis?: any;
    questions?: any[];
};

interface CandidatePipelineProps {
    candidates: Candidate[];
    onSelectCandidate: (candidate: Candidate) => void;
    selectedCandidate?: Candidate;
}

export function CandidatePipeline({ candidates, onSelectCandidate, selectedCandidate }: CandidatePipelineProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
                <input
                    type="text"
                    placeholder="Search candidates..."
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <div className="divide-y divide-gray-100">
                {candidates.map((candidate) => (
                    <div
                        key={candidate.id}
                        onClick={() => onSelectCandidate(candidate)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedCandidate?.id === candidate.id ? 'bg-purple-50 hover:bg-purple-50' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                                {candidate.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-gray-900 truncate">{candidate.name}</h3>
                                <p className="text-xs text-gray-500 truncate">{candidate.position}</p>
                            </div>
                            <div className="text-right">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                  ${candidate.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        candidate.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                            candidate.status === 'analyzing' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'}`}>
                                    {candidate.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
