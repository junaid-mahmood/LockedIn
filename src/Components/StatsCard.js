import React from 'react';















import { HiDocumentText, HiClock, HiStar } from 'react-icons/hi';















import { useSelector } from 'react-redux';































const StatsCard = () => {















  const groupData = useSelector((state) => state.Reducer.groupData);















  















  // Calculate statistics















  const totalCards = groupData.reduce((acc, group) => acc + (group.state?.length || 0), 0);















  const totalSets = groupData.length;















  const averageCardsPerSet = totalSets ? Math.round(totalCards / totalSets) : 0;































  return (















    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-border/50 p-6">















      <h3 className="text-lg font-semibold mb-4 text-text-dark">Your Progress</h3>















      















      <div className="space-y-4">















        <div className="flex items-center justify-between p-4 bg-accent-blue/10 rounded-lg border border-accent-blue/20">















          <div className="flex items-center space-x-3">















            <div className="p-2.5 bg-accent-blue/20 rounded-lg">















              <HiDocumentText className="text-xl text-accent-blue" />















            </div>















            <div>















              <p className="text-sm text-text-light">Total Cards</p>















              <p className="font-semibold text-text-dark">{totalCards}</p>















            </div>















          </div>















        </div>































        <div className="flex items-center justify-between p-4 bg-accent-purple/10 rounded-lg border border-accent-purple/20">















          <div className="flex items-center space-x-3">















            <div className="p-2.5 bg-accent-purple/20 rounded-lg">















              <HiStar className="text-xl text-accent-purple" />















            </div>















            <div>















              <p className="text-sm text-text-light">Total Sets</p>















              <p className="font-semibold text-text-dark">{totalSets}</p>















            </div>















          </div>















        </div>































        <div className="flex items-center justify-between p-4 bg-accent-green/10 rounded-lg border border-accent-green/20">















          <div className="flex items-center space-x-3">















            <div className="p-2.5 bg-accent-green/20 rounded-lg">















              <HiClock className="text-xl text-accent-green" />















            </div>















            <div>















              <p className="text-sm text-text-light">Cards per Set</p>















              <p className="font-semibold text-text-dark">{averageCardsPerSet}</p>















            </div>















          </div>















        </div>















      </div>















    </div>















  );















};































export default StatsCard; 














