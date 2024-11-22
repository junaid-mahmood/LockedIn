import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { deleteInputBox } from "../../redux/action/Action";
import { useDispatch, useSelector } from "react-redux";

const TermForm = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer.inputData);

  const onchangeHanlder = () => {
    console.log("onchange");
  };

  return (
    <div className="space-y-6">
      {state.length > 0 &&
        state.map((elem, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 relative pl-8 sm:pl-12"
          >
            <span className="absolute left-0 top-8 sm:top-10 w-6 h-6 flex items-center justify-center 
              bg-red-500 text-white rounded-full text-sm">
              {index + 1}
            </span>
            
            <div className="flex-1">
              <label className="block text-gray-600 font-medium mb-2">
                Enter Term*
              </label>
              <input
                type="text"
                value={elem.term}
                onChange={onchangeHanlder}
                placeholder="Write title here..."
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 
                  focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-600 font-medium mb-2">
                Enter Definition*
              </label>
              <textarea
                value={elem.defination}
                onChange={onchangeHanlder}
                placeholder="Write definition here..."
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 
                  focus:border-primary focus:outline-none transition-colors"
                rows="3"
              />
            </div>

            <div className="flex items-start space-x-2 pt-8">
              <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                <AiOutlineEdit className="text-xl" />
              </button>
              <button
                onClick={() => dispatch(deleteInputBox(index))}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <AiOutlineDelete className="text-xl" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TermForm;
