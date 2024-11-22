import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiArrowRight, HiOutlineBookOpen } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showFalshCard } from "../../redux/action/Action";

const MyFlashcard = () => {
  const [cardHandle, setCardHandle] = useState(6);
  const state = useSelector((state) => state.Reducer.groupData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showAllcard = () => {
    setCardHandle(state.length);
  };

  const handleViewCard = (index) => {
    dispatch(showFalshCard(index));
    navigate(`/flashcarddetails/${index}`);
  };

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-text">My Flashcards</h2>
        <Link to="/" className="btn-secondary">
          Create New Set
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state && state.length > 0 ? (
          state.slice(0, cardHandle).map((ele, index) => (
            <div key={index} className="card group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary 
                  rounded-xl flex items-center justify-center text-xl font-bold text-white">
                  {ele.group?.groupName?.charAt(0) || 'F'}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text mb-1">
                    {ele.group?.groupName || 'Untitled Set'}
                  </h3>
                  <p className="text-sm text-text-light mb-4">
                    {ele.state?.length || 0} cards
                  </p>
                  <button
                    onClick={() => handleViewCard(index)}
                    className="inline-flex items-center text-primary font-medium 
                      hover:text-primary-dark transition-colors"
                  >
                    Study Now
                    <HiArrowRight className="ml-2 text-lg 
                      group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 card">
            <HiOutlineBookOpen className="mx-auto text-5xl text-text-light mb-4" />
            <p className="text-lg text-text-light mb-6">
              No flashcard sets created yet
            </p>
            <Link to="/" className="btn-primary inline-block">
              Create Your First Set
            </Link>
          </div>
        )}
      </div>
      
      {state?.length > 6 && cardHandle < state.length && (
        <div className="text-center mt-8">
          <button onClick={showAllcard} className="btn-secondary">
            Show All Sets
          </button>
        </div>
      )}
    </div>
  );
};

export default MyFlashcard;
