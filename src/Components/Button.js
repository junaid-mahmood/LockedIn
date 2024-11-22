import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { HiPlus, HiCollection, HiClock, HiStar, HiChartBar, HiTag, HiLightBulb, HiChartPie, HiOutlineAcademicCap, HiTrendingUp, HiCalendar } from "react-icons/hi";

const calculateStudyMetrics = (studySessions) => {
  const metrics = {
    totalTime: 0,
    averageSessionLength: 0,
    bestDay: null,
    worstDay: null,
    totalSessions: studySessions.length,
    weeklyProgress: new Array(7).fill(0),
  };

  studySessions.forEach(session => {
    metrics.totalTime += session.duration;
    const dayOfWeek = new Date(session.date).getDay();
    metrics.weeklyProgress[dayOfWeek] += session.duration;
  });

  metrics.averageSessionLength = metrics.totalTime / metrics.totalSessions;

  const dayTotals = studySessions.reduce((acc, session) => {
    const date = new Date(session.date).toDateString();
    acc[date] = (acc[date] || 0) + session.duration;
    return acc;
  }, {});

  const sortedDays = Object.entries(dayTotals).sort((a, b) => b[1] - a[1]);
  metrics.bestDay = sortedDays[0]?.[0] || null;
  metrics.worstDay = sortedDays[sortedDays.length - 1]?.[0] || null;

  return metrics;
};

const calculateNextReview = (card) => {
  const intervals = [1, 3, 7, 14, 30, 90, 180];
  const currentLevel = Math.min(card.successCount, intervals.length - 1);
  const baseInterval = intervals[currentLevel];
  
  const performanceMultiplier = (card.lastReviewScore / 5) * 1.5;
  const adjustedInterval = Math.round(baseInterval * performanceMultiplier);
  
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + adjustedInterval);
  
  return nextReview;
};

const useTagSystem = () => {
  const [tags, setTags] = useState([]);
  const [taggedCards, setTaggedCards] = useState({});

  const addTag = (tagName) => {
    if (!tags.includes(tagName)) {
      setTags([...tags, tagName]);
    }
  };

  const removeTag = (tagName) => {
    setTags(tags.filter(t => t !== tagName));
    const newTaggedCards = { ...taggedCards };
    delete newTaggedCards[tagName];
    setTaggedCards(newTaggedCards);
  };

  const tagCard = (cardId, tagName) => {
    setTaggedCards(prev => ({
      ...prev,
      [tagName]: [...(prev[tagName] || []), cardId]
    }));
  };

  const untagCard = (cardId, tagName) => {
    setTaggedCards(prev => ({
      ...prev,
      [tagName]: prev[tagName].filter(id => id !== cardId)
    }));
  };

  return { tags, taggedCards, addTag, removeTag, tagCard, untagCard };
};

const generateLearningPath = (cards, difficulty = 'medium') => {
  const difficultyWeights = {
    easy: { new: 0.4, review: 0.3, mastered: 0.3 },
    medium: { new: 0.3, review: 0.5, mastered: 0.2 },
    hard: { new: 0.2, review: 0.6, mastered: 0.2 }
  };

  const weights = difficultyWeights[difficulty];
  const categorizedCards = {
    new: cards.filter(card => card.attempts === 0),
    review: cards.filter(card => card.attempts > 0 && card.mastered === false),
    mastered: cards.filter(card => card.mastered === true)
  };

  const pathLength = Math.min(20, cards.length);
  const path = [];

  Object.entries(weights).forEach(([category, weight]) => {
    const count = Math.round(pathLength * weight);
    const selectedCards = categorizedCards[category]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
    path.push(...selectedCards);
  });

  return path.sort(() => Math.random() - 0.5);
};

const AchievementSystem = ({ studyHistory, cardsMastered }) => {
  const achievements = [
    {
      id: 'firstCard',
      title: 'First Steps',
      description: 'Master your first flashcard',
      icon: <HiOutlineAcademicCap className="text-2xl text-green-500" />,
      condition: () => cardsMastered > 0
    },
    {
      id: 'tenStreak',
      title: 'Consistent Learner',
      description: 'Maintain a 10-day study streak',
      icon: <HiTrendingUp className="text-2xl text-blue-500" />,
      condition: () => calculateStreak(studyHistory) >= 10
    },
    {
      id: 'hundredCards',
      title: 'Century Club',
      description: 'Master 100 flashcards',
      icon: <HiStar className="text-2xl text-yellow-500" />,
      condition: () => cardsMastered >= 100
    }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Achievements</h3>
      <div className="space-y-3">
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`flex items-center gap-3 p-3 rounded-lg border
              ${achievement.condition() ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
          >
            {achievement.icon}
            <div>
              <h4 className="font-medium">{achievement.title}</h4>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StudyCalendar = ({ studyHistory }) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(startOfMonth);
    date.setDate(i + 1);
    return date;
  });

  const getActivityLevel = (date) => {
    const studyMinutes = studyHistory
      .filter(h => h.toDateString() === date.toDateString())
      .reduce((sum, h) => sum + h.duration, 0);

    if (studyMinutes === 0) return 'bg-gray-100';
    if (studyMinutes < 30) return 'bg-green-200';
    if (studyMinutes < 60) return 'bg-green-300';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <HiCalendar />
        Study Calendar
      </h3>
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        {days.map((date, i) => (
          <div
            key={i}
            className={`aspect-square rounded-sm ${getActivityLevel(date)}
              flex items-center justify-center text-xs`}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

const estimateCardDifficulty = (card) => {
  const factors = {
    failureRate: (card.attempts > 0) ? (card.failures / card.attempts) * 0.4 : 0,
    averageResponseTime: Math.min(card.averageResponseTime / 10000, 1) * 0.3,
    lastReviewScore: ((5 - (card.lastReviewScore || 0)) / 5) * 0.3
  };

  const difficultyScore = Object.values(factors).reduce((sum, factor) => sum + factor, 0);
  
  if (difficultyScore < 0.3) return 'Easy';
  if (difficultyScore < 0.7) return 'Medium';
  return 'Hard';
};

const AnalyticsDashboard = ({ studyData }) => {
  const metrics = useMemo(() => calculateStudyMetrics(studyData), [studyData]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <HiChartPie />
        Analytics
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Total Study Time</p>
          <p className="text-2xl font-bold">{Math.round(metrics.totalTime / 60)}h</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Avg. Session</p>
          <p className="text-2xl font-bold">{Math.round(metrics.averageSessionLength)}m</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Best Day</p>
          <p className="text-lg font-bold">{metrics.bestDay}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Total Sessions</p>
          <p className="text-2xl font-bold">{metrics.totalSessions}</p>
        </div>
      </div>
    </div>
  );
};

const StudyTips = () => {
  const tips = [
    { icon: <HiLightBulb />, text: "Review cards right before sleeping to improve retention" },
    { icon: <HiStar />, text: "Study in short, focused sessions of 25-30 minutes" },
    { icon: <HiTrendingUp />, text: "Mix up your study material to enhance learning" },
    { icon: <HiChartBar />, text: "Test yourself frequently to reinforce memory" }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Study Tips</h3>
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
            <span className="text-primary text-xl">{tip.icon}</span>
            <p className="text-sm text-gray-600">{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
const OriginalButton = () => {
  const [activeBtn, setActiveBtn] = useState("createBtn");

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-text mb-6">Flashcards</h2>

      <div className="bg-gray-50 rounded-xl shadow-md">
        <div className="flex">
          <Link
            to="/"
            onClick={() => setActiveBtn("createBtn")}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 
              transition-colors border-b-2 font-medium
              ${activeBtn === "createBtn"
                ? "text-primary border-primary"
                : "text-gray-600 border-transparent hover:text-primary/70"
              }`}
          >
            <HiPlus className="text-xl" />
            <span>Create New</span>
          </Link>

          <Link
            to="/myflashcard"
            onClick={() => setActiveBtn("flashBtn")}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 
              transition-colors border-b-2 font-medium
              ${activeBtn === "flashBtn"
                ? "text-primary border-primary"
                : "text-gray-600 border-transparent hover:text-primary/70"
              }`}
          >
            <HiCollection className="text-xl" />
            <span>My Flashcards</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const calculateStreak = (studyHistory) => {
  if (!studyHistory.length) return 0;
  
  const today = new Date();
  let streak = 0;
  let currentDate = today;
  
  for (const date of studyHistory.sort((a, b) => b - a)) {
    const diffDays = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
      streak++;
      currentDate = date;
    } else {
      break;
    }
  }
  
  return streak;
};

const useStudyTimer = () => {
  const [studyTime, setStudyTime] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  
  useEffect(() => {
    let interval;
    if (isStudying) {
      interval = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudying]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return { studyTime, isStudying, setIsStudying, formatTime };
};

const ProgressStats = ({ totalCards, masteredCards }) => {
  const progress = (masteredCards / totalCards) * 100 || 0;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Progress</h3>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">
        {masteredCards} of {totalCards} cards mastered
      </p>
    </div>
  );
};

const StudyReminder = () => {
  const [reminderTime, setReminderTime] = useState('');
  const [reminders, setReminders] = useState([]);
  
  const addReminder = () => {
    if (reminderTime) {
      setReminders([...reminders, reminderTime]);
      setReminderTime('');
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
      <h3 className="text-lg font-semibold mb-2">Study Reminders</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          onClick={addReminder}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {reminders.map((time, index) => (
          <li key={index} className="flex items-center gap-2">
            <HiClock className="text-gray-500" />
            <span>{time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const EnhancedButton = () => {
  const [activeBtn, setActiveBtn] = useState("createBtn");
  const { studyTime, isStudying, setIsStudying, formatTime } = useStudyTimer();
  const [studyHistory] = useState([
    new Date(),
    new Date(Date.now() - 86400000),
    new Date(Date.now() - 172800000),
  ]);
  
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-text mb-6">Flashcards</h2>
      
      <div className="bg-gray-50 rounded-xl shadow-md">
        <div className="flex">
          <Link
            to="/"
            onClick={() => setActiveBtn("createBtn")}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 
              transition-colors border-b-2 font-medium
              ${activeBtn === "createBtn"
                ? "text-primary border-primary"
                : "text-gray-600 border-transparent hover:text-primary/70"
              }`}
          >
            <HiPlus className="text-xl" />
            <span>Create New</span>
          </Link>

          <Link
            to="/myflashcard"
            onClick={() => setActiveBtn("flashBtn")}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 
              transition-colors border-b-2 font-medium
              ${activeBtn === "flashBtn"
                ? "text-primary border-primary"
                : "text-gray-600 border-transparent hover:text-primary/70"
              }`}
          >
            <HiCollection className="text-xl" />
            <span>My Flashcards</span>
          </Link>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Study Session</h3>
              <button
                onClick={() => setIsStudying(!isStudying)}
                className={`px-4 py-2 rounded ${
                  isStudying 
                    ? "bg-red-500 text-white" 
                    : "bg-primary text-white"
                }`}
              >
                {isStudying ? "Stop" : "Start"}
              </button>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{formatTime(studyTime)}</p>
              <p className="text-sm text-gray-600">Current Session</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Study Streak</h3>
            <div className="flex items-center gap-2">
              <HiStar className="text-yellow-500 text-2xl" />
              <span className="text-3xl font-bold">
                {calculateStreak(studyHistory)}
              </span>
              <span className="text-gray-600">days</span>
            </div>
          </div>
          
          <ProgressStats totalCards={50} masteredCards={23} />
          
          <StudyReminder />
        </div>
      </div>
    </div>
  );
};

export default EnhancedButton; 