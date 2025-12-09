import { useState } from 'react'

const ResearchSummary = () => {
  const [expandedSection, setExpandedSection] = useState('purpose')

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">📚 Questify Research Platform</h1>
          <p className="text-xl text-gray-700">
            A smart online quiz and engagement analytics platform for academic research
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold text-sm">
              📊 Data Analytics
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold text-sm">
              👥 Student Engagement
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-semibold text-sm">
              🔬 Research-Ready
            </span>
          </div>
        </div>

        {/* Purpose Section */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <button
            onClick={() => toggleSection('purpose')}
            className="w-full px-6 py-6 text-left hover:bg-blue-50 transition duration-200 border-b-2 border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">🎯 Why This Platform?</h2>
              <span className={`text-2xl transition-transform duration-300 ${expandedSection === 'purpose' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </div>
          </button>
          {expandedSection === 'purpose' && (
            <div className="px-6 py-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <span className="text-3xl">📤</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Send Questions Instantly</h3>
                    <p className="text-gray-600">
                      Send MCQ questions to students during online classes in real-time. No delays, instant delivery.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">⏱️</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Measure Response Time</h3>
                    <p className="text-gray-600">
                      Track response time in milliseconds. Understand how quickly students answer questions.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">📈</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Track Engagement Levels</h3>
                    <p className="text-gray-600">
                      Monitor student engagement patterns. Identify who is actively participating vs. disengaged.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">🔬</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Collect Real Research Data</h3>
                    <p className="text-gray-600">
                      Gather authentic data from actual students. Perfect for educational research studies.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">🎓</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Manage Everything in One Place</h3>
                    <p className="text-gray-600">
                      Classes, students, exams, questions, and results all in a single unified system.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-3xl">📊</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Scale to 1000+ Students</h3>
                    <p className="text-gray-600">
                      Handle large groups simultaneously. Built for universities and large-scale online classes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Research Features Section */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <button
            onClick={() => toggleSection('research')}
            className="w-full px-6 py-6 text-left hover:bg-green-50 transition duration-200 border-b-2 border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">🔍 Research Features</h2>
              <span className={`text-2xl transition-transform duration-300 ${expandedSection === 'research' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </div>
          </button>
          {expandedSection === 'research' && (
            <div className="px-6 py-6 space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Engagement Analytics</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-green-600">✓</span>
                    <span><strong>Participation Rate:</strong> Percentage of students who attempt each quiz</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-green-600">✓</span>
                    <span><strong>Accuracy Rate:</strong> Percentage of correct answers per student/question</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-green-600">✓</span>
                    <span><strong>Response Time Patterns:</strong> Average time taken to answer questions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-green-600">✓</span>
                    <span><strong>Class-wise Analytics:</strong> Compare engagement across different classes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-green-600">✓</span>
                    <span><strong>Leaderboard Rankings:</strong> Identify top performers and struggling students</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Data Collection</h3>
                <p className="text-gray-700 mb-4">
                  Only <strong>non-sensitive, educational data</strong> is collected for your research:
                </p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Student admission numbers, names, and class assignments</li>
                  <li>✓ Quiz questions, options, and correct answers</li>
                  <li>✓ Student responses (which option they selected)</li>
                  <li>✓ Response correctness (right/wrong)</li>
                  <li>✓ <strong>Response time in milliseconds</strong> (key metric for engagement)</li>
                  <li>✓ Timestamp of when answer was submitted</li>
                  <li>✓ Engagement level classification (Very High, High, Medium, Low)</li>
                </ul>
                <p className="text-gray-600 text-sm mt-4">
                  <strong>NOT collected:</strong> Video, audio, location, passwords, or personal sensitive information
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Data Export Section */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <button
            onClick={() => toggleSection('export')}
            className="w-full px-6 py-6 text-left hover:bg-purple-50 transition duration-200 border-b-2 border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">📥 Data Export & Analysis</h2>
              <span className={`text-2xl transition-transform duration-300 ${expandedSection === 'export' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </div>
          </button>
          {expandedSection === 'export' && (
            <div className="px-6 py-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📊 CSV Export</h3>
                  <p className="text-gray-700 mb-3">
                    Download research data in CSV format with all analytics included:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Quiz number & class information</li>
                    <li>• Student details (name, admission #, email)</li>
                    <li>• Question text and answer details</li>
                    <li>• Response time (milliseconds & seconds)</li>
                    <li>• Engagement level classification</li>
                    <li>• Accuracy metrics</li>
                    <li>• Summary statistics at bottom</li>
                  </ul>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border-l-4 border-indigo-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📈 JSON Export</h3>
                  <p className="text-gray-700 mb-3">
                    Get structured data for programmatic analysis:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Structured JSON format</li>
                    <li>• Easy integration with analysis tools</li>
                    <li>• Perfect for statistical analysis</li>
                    <li>• Compatible with Python, R, Excel</li>
                    <li>• Complete response history</li>
                    <li>• Ready for machine learning</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Typical Research Use Cases</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ Study how response time correlates with correctness</li>
                  <li>✓ Analyze student engagement patterns in online learning</li>
                  <li>✓ Identify at-risk students who are disengaging</li>
                  <li>✓ Compare learning outcomes across different teaching methods</li>
                  <li>✓ Track improvement over multiple quiz attempts</li>
                  <li>✓ Statistical analysis of student performance</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Data Fields Section */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <button
            onClick={() => toggleSection('fields')}
            className="w-full px-6 py-6 text-left hover:bg-orange-50 transition duration-200 border-b-2 border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">📋 Complete Data Fields Reference</h2>
              <span className={`text-2xl transition-transform duration-300 ${expandedSection === 'fields' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </div>
          </button>
          {expandedSection === 'fields' && (
            <div className="px-6 py-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">👤 Student Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><strong className="text-blue-600">Name:</strong> Student's full name</p>
                  <p><strong className="text-blue-600">Admission Number:</strong> Unique student ID</p>
                  <p><strong className="text-blue-600">Email:</strong> Student email address</p>
                  <p><strong className="text-blue-600">Class:</strong> Class/section assignment</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">📝 Question & Response Data</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><strong className="text-green-600">Quiz Number:</strong> Unique quiz identifier</p>
                  <p><strong className="text-green-600">Question:</strong> MCQ question text</p>
                  <p><strong className="text-green-600">Selected Answer:</strong> Student's choice (A, B, C, or D)</p>
                  <p><strong className="text-green-600">Correct Answer:</strong> Actual correct answer</p>
                  <p><strong className="text-green-600">Is Correct:</strong> Yes/No flag</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">⏱️ Timing Data (KEY METRIC)</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><strong className="text-purple-600">Response Time (ms):</strong> Millisecond precision timing</p>
                  <p><strong className="text-purple-600">Response Time (sec):</strong> Seconds format for readability</p>
                  <p><strong className="text-purple-600">Engagement Level:</strong> Classified as:</p>
                  <div className="ml-4 mt-2 space-y-1 text-xs">
                    <p>• <strong>Very High:</strong> Answered in &lt; 5 seconds (rapid response)</p>
                    <p>• <strong>High:</strong> Answered in 5-10 seconds (quick thinking)</p>
                    <p>• <strong>Medium:</strong> Answered in 10-20 seconds (thoughtful)</p>
                    <p>• <strong>Low-Medium:</strong> Answered in 20-30 seconds (careful)</p>
                    <p>• <strong>Low:</strong> Answered in &gt; 30 seconds (hesitant/struggling)</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">📊 Analytics Fields</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><strong className="text-indigo-600">Answered At:</strong> ISO timestamp of submission</p>
                  <p><strong className="text-indigo-600">Timestamp:</strong> Unix timestamp (milliseconds)</p>
                  <p><strong className="text-indigo-600">Attempt Status:</strong> Completed/Skipped</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📌 Summary Statistics (Bottom of Export)</h3>
                <p className="text-gray-700 mb-3">Each CSV export includes a summary section:</p>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>✓ Total number of questions in quiz</li>
                  <li>✓ Total student responses collected</li>
                  <li>✓ Number of correct responses</li>
                  <li>✓ <strong>Accuracy Rate %</strong> (most important metric)</li>
                  <li>✓ <strong>Average Response Time</strong> (engagement indicator)</li>
                  <li>✓ Export date and time</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Platform Highlights Section */}
        <div className="bg-white rounded-xl shadow-lg">
          <button
            onClick={() => toggleSection('highlights')}
            className="w-full px-6 py-6 text-left hover:bg-red-50 transition duration-200 border-b-2 border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">⭐ Platform Highlights</h2>
              <span className={`text-2xl transition-transform duration-300 ${expandedSection === 'highlights' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </div>
          </button>
          {expandedSection === 'highlights' && (
            <div className="px-6 py-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="font-bold text-gray-900">Precise Timing</p>
                    <p className="text-sm text-gray-600">Millisecond accuracy for response time measurement</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <p className="font-bold text-gray-900">Secure & Private</p>
                    <p className="text-sm text-gray-600">Only educational data collected, no sensitive info</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="font-bold text-gray-900">Real-time Delivery</p>
                    <p className="text-sm text-gray-600">Questions sent instantly to students during class</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                  <span className="text-2xl">📈</span>
                  <div>
                    <p className="font-bold text-gray-900">Scalable</p>
                    <p className="text-sm text-gray-600">Handle 1000+ students simultaneously</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="font-bold text-gray-900">Rich Analytics</p>
                    <p className="text-sm text-gray-600">Engagement levels, accuracy rates, patterns</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <p className="font-bold text-gray-900">Research Ready</p>
                    <p className="text-sm text-gray-600">Perfect for academic studies on online learning</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg">
                <h3 className="text-xl font-bold mb-2">🚀 Get Started Today</h3>
                <p>
                  Start collecting engagement data from your students. Download research-ready CSV exports for your analysis.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Questify © 2025 | Smart Online Quiz Platform for Educational Research
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResearchSummary
