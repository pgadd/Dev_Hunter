import React from 'react';

interface CandidateScoreProps {
    overallScore: number;
    competencies: any[];
    recommendation: string;
    reasoning: string;
    strengths: string[];
    weaknesses: string[];
}

export function CandidateScore({ overallScore, competencies, recommendation, reasoning, strengths, weaknesses }: CandidateScoreProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Overall Score</h3>
                    <p className="text-sm text-gray-500">Based on technical analysis and interview</p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold text-purple-600">{overallScore}</div>
                    <div className={`text-sm font-medium uppercase mt-1 ${recommendation === 'hire' ? 'text-green-600' : 'text-red-600'}`}>
                        {recommendation}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
                {competencies.map((comp) => (
                    <div key={comp.category} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{comp.category}</span>
                            <span className="text-sm font-bold text-gray-900">{comp.score}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: `${comp.score}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="font-medium text-gray-900 mb-2">AI Reasoning</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{reasoning}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Strengths</h4>
                        <ul className="space-y-1">
                            {strengths.map((s, i) => (
                                <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                                    <span>•</span> {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Areas for Improvement</h4>
                        <ul className="space-y-1">
                            {weaknesses.map((w, i) => (
                                <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                                    <span>•</span> {w}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
