import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyResponses } from '../../redux/slices/studentSlice'

const MyResponses = () => {
  const dispatch = useDispatch()
  const { myResponses, loading, error } = useSelector((state) => state.student)

  useEffect(() => {
    dispatch(getMyResponses())
  }, [dispatch])

  const getAnswerLabel = (index) => String.fromCharCode(65 + index)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📝 My Responses</h1>
          <p className="text-gray-600">Review all your quiz answers and results</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading your responses...</p>
          </div>
        ) : myResponses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-2xl text-gray-500 mb-2">📭 No responses yet</p>
            <p className="text-gray-400">You haven't answered any questions yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-600 text-sm">Total Responses</p>
                <p className="text-3xl font-bold text-indigo-600">{myResponses.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-600 text-sm">Correct Answers</p>
                <p className="text-3xl font-bold text-green-600">
                  {myResponses.filter((r) => r.isCorrect).length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-600 text-sm">Accuracy</p>
                <p className="text-3xl font-bold text-blue-600">
                  {myResponses.length > 0
                    ? Math.round(
                        (myResponses.filter((r) => r.isCorrect).length / myResponses.length) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>
            </div>

            {/* Response Cards */}
            <div className="space-y-6">
              {myResponses.map((response, index) => (
                <div
                  key={response._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Card Header */}
                  <div
                    className={`px-6 py-4 ${
                      response.isCorrect
                        ? 'bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500'
                        : 'bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-gray-900">Class:</span>{' '}
                          {response.classId?.name || 'N/A'}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 text-sm font-bold rounded-full ${
                          response.isCorrect
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {response.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-6 py-6 space-y-6">
                    {/* Question */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        <span className="text-indigo-600">Q{index + 1}.</span> Question
                      </h3>
                      <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                        {response.questionId?.question || 'N/A'}
                      </p>
                    </div>

                    {/* Options and Answers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Your Answer */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide text-blue-600">
                          Your Answer
                        </h4>
                        <div className={`p-4 rounded-lg border-2 ${
                          response.isCorrect
                            ? 'border-green-300 bg-green-50'
                            : 'border-red-300 bg-red-50'
                        }`}>
                          <p className="text-lg font-bold">
                            {getAnswerLabel(response.selectedAnswer)}
                          </p>
                        </div>
                      </div>

                      {/* Correct Answer */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide text-green-600">
                          Correct Answer
                        </h4>
                        <div className="p-4 rounded-lg border-2 border-green-300 bg-green-50">
                          <p className="text-lg font-bold text-green-700">
                            {response.questionId?.correctAnswer !== undefined
                              ? getAnswerLabel(response.questionId.correctAnswer)
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Answer Options (if available) */}
                    {response.questionId?.options && response.questionId.options.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                          All Options
                        </h4>
                        <div className="space-y-2">
                          {response.questionId.options.map((option, optIndex) => {
                            const isUserAnswer = optIndex === response.selectedAnswer
                            const isCorrectAnswer =
                              optIndex === response.questionId?.correctAnswer
                            let bgColor = 'bg-gray-50'
                            let borderColor = 'border-gray-300'

                            if (isCorrectAnswer) {
                              bgColor = 'bg-green-50'
                              borderColor = 'border-green-400'
                            } else if (isUserAnswer && !response.isCorrect) {
                              bgColor = 'bg-red-50'
                              borderColor = 'border-red-400'
                            }

                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded border-2 ${bgColor} ${borderColor}`}
                              >
                                <p className="text-gray-700">
                                  <span className="font-bold text-gray-900">
                                    {getAnswerLabel(optIndex)}:
                                  </span>{' '}
                                  {option}
                                  {isCorrectAnswer && ' ✓'}
                                  {isUserAnswer && !isCorrectAnswer && ' (Your answer)'}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Answered:</span>{' '}
                      {new Date(response.answeredAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyResponses
