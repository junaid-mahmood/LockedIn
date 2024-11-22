import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiArrowLeft, HiShare, HiDownload, HiPrinter, HiX } from "react-icons/hi";
import { HiClipboard } from "react-icons/hi2";

const FlashcardDetails = () => {
  const state = useSelector((state) => state.Reducer);
  const [cardHandler, setCardHandle] = useState(0);
  const [share, setShare] = useState(false);
  const [copyStatus, setCopyStatus] = useState('copy');

  const navigateCards = (direction) => {
    if (direction === 'next' && state.groupData[state.showNum]?.state.length - 1 > cardHandler) {
      setCardHandle(prev => prev + 1);
    } else if (direction === 'prev' && cardHandler > 0) {
      setCardHandle(prev => prev - 1);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('copy'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fade-in">
      {state.groupData.map((elem, index) => (
        index === state.showNum && (
          <div key={index} className="space-y-6">
            <div className="flex items-center justify-between">
              <Link to="/myflashcard" 
                className="flex items-center space-x-2 text-text hover:text-primary transition-colors">
                <HiArrowLeft className="text-xl" />
                <span className="font-medium">{elem.group.groupName}</span>
              </Link>
            </div>

            <p className="text-text-light">{elem.group.description}</p>

            <div className="grid lg:grid-cols-12 gap-6">
              {/* Card List */}
              <div className="lg:col-span-3">
                <div className="card">
                  <h3 className="font-bold text-text mb-4">Flashcards</h3>
                  <div className="space-y-2">
                    {elem.state.map((card, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCardHandle(idx)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors
                          ${cardHandler === idx 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-slate-50 text-text-light'}`}
                      >
                        {idx + 1}. {card.term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Card */}
              <div className="lg:col-span-6">
                <div className="card min-h-[300px] flex flex-col justify-between">
                  {elem.state.map((card, idx) => (
                    cardHandler === idx && (
                      <div key={idx} className="prose max-w-none">
                        <p className="text-text">{card.defination}</p>
                      </div>
                    )
                  ))}
                  
                  <div className="flex items-center justify-center space-x-8 mt-8">
                    <button 
                      onClick={() => navigateCards('prev')}
                      className="btn-secondary"
                      disabled={cardHandler === 0}
                    >
                      Previous
                    </button>
                    <span className="text-text-light">
                      {cardHandler + 1} / {elem.state.length}
                    </span>
                    <button 
                      onClick={() => navigateCards('next')}
                      className="btn-secondary"
                      disabled={cardHandler === elem.state.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="lg:col-span-3 space-y-4">
                <button 
                  onClick={() => setShare(true)}
                  className="w-full card flex items-center justify-center space-x-2 
                    hover:bg-slate-50 transition-colors"
                >
                  <HiShare className="text-primary" />
                  <span>Share</span>
                </button>
                
                <button className="w-full card flex items-center justify-center space-x-2 
                  hover:bg-slate-50 transition-colors">
                  <HiDownload className="text-primary" />
                  <span>Download</span>
                </button>
                
                <button className="w-full card flex items-center justify-center space-x-2 
                  hover:bg-slate-50 transition-colors">
                  <HiPrinter className="text-primary" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>
        )
      ))}

      {/* Share Modal */}
      {share && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Share Flashcard</h3>
              <button 
                onClick={() => setShare(false)}
                className="text-text-light hover:text-text"
              >
                <HiX className="text-xl" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                value={window.location.href} 
                readOnly 
                className="input-field"
              />
              <button 
                onClick={copyToClipboard}
                className="btn-secondary flex items-center space-x-2"
              >
                <HiClipboard />
                <span>{copyStatus === 'copied' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardDetails;
