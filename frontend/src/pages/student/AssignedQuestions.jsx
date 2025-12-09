import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

const AssignedQuestions = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [startTimes, setStartTimes] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [completedAssignments, setCompletedAssignments] = useState(new Set());
  
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchAssignedQuestions();
  }, []);

  const fetchAssignedQuestions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/students/assigned-questions');
      const questions = response.data;
      
      // Group questions by assignment and filter non-answered ones
      const groupedByAssignment = {};
      const completed = new Set();
      
      questions.forEach(q => {
        if (!groupedByAssignment[q.assignmentId]) {
          groupedByAssignment[q.assignmentId] = {
            assignmentId: q.assignmentId,
            title: q.assignmentTitle,
            description: q.assignmentDescription,
            className: q.className,
            classId: q.classId,
            isCompleted: q.assignmentCompleted,
            questions: []
          };
        }
        
        // Only add non-answered questions
        if (!q.isAnswered) {
          groupedByAssignment[q.assignmentId].questions.push(q);
        }
        
        // Track completed assignments
        if (q.assignmentCompleted) {
          completed.add(q.assignmentId);
        }
      });

      setAssignments(Object.values(groupedByAssignment).filter(a => a.questions.length > 0));
      setCompletedAssignments(completed);
      setError('');
    } catch (err) {
      setError('Failed to load assignments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = (assignment) => {
    // Prevent opening completed quizzes
    if (completedAssignments.has(assignment.assignmentId)) {
      setError('This quiz has already been completed. You cannot attempt it again.');
      return;
    }
    
    setActiveQuiz(assignment);
    setCurrentQuestionIndex(0);
    setResponses({});
    setElapsedTime(0);
    setQuizStartTime(Date.now());
    
    // Capture start time for FIRST question when quiz starts
    const times = {};
    times[assignment.questions[0].questionId] = Date.now();
    setStartTimes(times);
  };

  const handleSelectAnswer = (questionId, answerIndex) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitAnswer = async () => {
    if (submitting) return;
    
    const question = activeQuiz.questions[currentQuestionIndex];
    const selectedAnswer = responses[question.questionId];

    if (selectedAnswer === undefined) {
      setError('Please select an answer');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const startTime = startTimes[question.questionId];
      
      await api.post('/students/submit-answer', {
        questionId: question.questionId,
        selectedAnswer,
        classId: question.classId,
        startTime: startTime,
        assignmentId: activeQuiz.assignmentId
      });

      // Move to next question
      if (currentQuestionIndex < activeQuiz.questions.length - 1) {
        // Set start time for NEXT question when clicking "Next"
        const nextQuestion = activeQuiz.questions[currentQuestionIndex + 1];
        setStartTimes(prev => ({
          ...prev,
          [nextQuestion.questionId]: Date.now()
        }));
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Quiz completed
        setActiveQuiz(null);
        setError('');
        setQuizStartTime(null);
        fetchAssignedQuestions(); // Refresh to show updated status
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to submit answer';
      if (!errorMessage.includes('already answered')) {
        setError(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      // Set start time for NEXT question when skipping
      const nextQuestion = activeQuiz.questions[currentQuestionIndex + 1];
      setStartTimes(prev => ({
        ...prev,
        [nextQuestion.questionId]: Date.now()
      }));
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setActiveQuiz(null);
      setQuizStartTime(null);
      fetchAssignedQuestions();
    }
  };

  const handleQuitQuiz = () => {
    if (confirm('Are you sure you want to quit? Your progress will not be saved.')) {
      setActiveQuiz(null);
      setCurrentQuestionIndex(0);
      setResponses({});
      setStartTimes({});
      setQuizStartTime(null);
      setElapsedTime(0);
    }
  };

  // Timer effect for quiz
  useEffect(() => {
    if (!activeQuiz || !quizStartTime) return;

    const timer = setInterval(() => {
      setElapsedTime(Date.now() - quizStartTime);
    }, 100);

    return () => clearInterval(timer);
  }, [activeQuiz, quizStartTime]);

  // Format time display
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

  // Quiz View
  if (activeQuiz) {
    const question = activeQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100;
    const selectedAnswer = responses[question.questionId];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with Timer at Top */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{activeQuiz.title}</h2>
                <p className="text-gray-600 text-sm sm:text-base">{activeQuiz.className}</p>
              </div>
              <div className="flex items-center gap-4">
                {/* Timer Display */}
                <div className="bg-blue-50 border-2 border-blue-600 rounded-lg px-4 py-2 text-center">
                  <p className="text-xs text-gray-600 font-semibold">TIME ELAPSED</p>
                  <p className="text-2xl font-bold text-blue-600 font-mono">{formatTime(elapsedTime)}</p>
                </div>
                <button
                  onClick={handleQuitQuiz}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 whitespace-nowrap"
                >
                  Quit Quiz
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                </span>
                <span className="text-sm font-semibold text-blue-600">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
            {/* Question Image */}
            {question.imageUrl && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <img
                  src={question.imageUrl}
                  alt="Question"
                  className="w-full h-auto object-cover max-h-64 sm:max-h-96"
                />
              </div>
            )}

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{question.question}</h3>

            {/* Options */}
            <div className="space-y-3 sm:space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(question.questionId, index)}
                  className={`w-full text-left p-4 sm:p-5 rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 ${
                        selectedAnswer === index
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedAnswer === index && (
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-base sm:text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <button
              onClick={handleSkipQuestion}
              className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200 font-semibold"
            >
              Skip
            </button>
            <button
              onClick={handleSubmitAnswer}
              disabled={submitting || selectedAnswer === undefined}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : currentQuestionIndex === activeQuiz.questions.length - 1 ? 'Submit & Finish' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Assignments List View
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Assignments</h1>
          <p className="text-gray-600">Complete your assigned quizzes below</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {assignments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600 text-lg mb-4">No assignments available</p>
            <p className="text-gray-500">All quizzes have been completed or are not yet available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignments.map((assignment) => (
              <div
                key={assignment.assignmentId}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{assignment.title}</h3>
                  <p className="text-blue-100 text-sm sm:text-base">{assignment.className}</p>
                </div>

                <div className="p-6 sm:p-8">
                  {assignment.description && (
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">{assignment.description}</p>
                  )}

                  <div className="mb-6 bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Questions to Attempt:</span> {assignment.questions.length}
                    </p>
                  </div>

                  {completedAssignments.has(assignment.assignmentId) ? (
                    <div className="w-full px-6 py-3 bg-gray-300 text-gray-700 rounded-lg text-center font-semibold cursor-not-allowed">
                      ✓ Completed
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStartQuiz(assignment)}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                    >
                      Start Quiz
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedQuestions;