import React from 'react';

interface InterviewTranscriptProps {
    transcript: any[];
    duration: string;
    status: string;
}

export function InterviewTranscript({ transcript, duration, status }: InterviewTranscriptProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Interview Transcript</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Duration: {duration}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded capitalize">{status}</span>
                </div>
            </div>

            <div className="space-y-6">
                {transcript.map((entry) => (
                    <div key={entry.id} className={`flex gap-4 ${entry.speaker === 'ai' ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
              ${entry.speaker === 'ai' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {entry.speaker === 'ai' ? 'AI' : 'C'}
                        </div>
                        <div className={`max-w-[80%] p-4 rounded-lg text-sm
              ${entry.speaker === 'ai' ? 'bg-gray-50 text-gray-800 rounded-tl-none' : 'bg-blue-50 text-blue-900 rounded-tr-none'}`}>
                            <p>{entry.text}</p>
                            <span className="text-xs opacity-50 mt-2 block">{entry.timestamp}</span>

                            {entry.assessment && (
                                <div className="mt-3 pt-3 border-t border-blue-100">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-blue-800">Assessment</span>
                                        <span className="font-bold text-blue-800">{entry.assessment.score}/10</span>
                                    </div>
                                    <p className="text-blue-800">{entry.assessment.feedback}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
