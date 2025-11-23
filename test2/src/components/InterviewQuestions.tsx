import React from 'react';

interface InterviewQuestionsProps {
    questions: any[];
}

export function InterviewQuestions({ questions }: InterviewQuestionsProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Questions</h3>
            <div className="space-y-4">
                {questions.map((q) => (
                    <div key={q.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium
                ${q.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                                    q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'}`}>
                                {q.difficulty}
                            </span>
                            <span className="text-xs text-gray-500 capitalize">{q.category}</span>
                        </div>
                        <p className="text-sm text-gray-900 font-medium">{q.question}</p>
                        <p className="text-xs text-gray-500 mt-2">Context: {q.context}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
