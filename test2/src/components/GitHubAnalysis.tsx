import React from 'react';
import { GitBranch, Star, AlertTriangle, CheckCircle } from 'lucide-react';

interface GitHubAnalysisProps {
    analysis: any;
}

export function GitHubAnalysis({ analysis }: GitHubAnalysisProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">GitHub Analysis</h3>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <GitBranch className="w-4 h-4" />
                        <span className="text-sm">Branches</span>
                    </div>
                    <p className="text-xl font-semibold">{analysis.branches}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">Stars</span>
                    </div>
                    <p className="text-xl font-semibold">{analysis.stars}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">Issues</span>
                    </div>
                    <p className="text-xl font-semibold">{analysis.vulnerabilities?.length || 0}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                        {analysis.techStack?.map((tech: string) => (
                            <span key={tech} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Vulnerabilities</h4>
                    <div className="space-y-2">
                        {analysis.vulnerabilities?.map((vuln: any, i: number) => (
                            <div key={i} className="flex gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-red-900">{vuln.description}</p>
                                    <p className="text-xs text-red-700 mt-1">{vuln.file}:{vuln.line}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
