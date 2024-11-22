import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInputBox } from "../../redux/action/Action";

const AddMore = ({ formik }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer.inputData);

  const addInputValue = () => {
    dispatch(
      addInputBox({
        term: formik.values.term,
        defination: formik.values.defination,
      })
    );
    formik.values.term = "";
    formik.values.defination = "";
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 relative pl-8 sm:pl-12">
        <span className="absolute left-0 top-8 sm:top-10 w-6 h-6 flex items-center justify-center 
          bg-red-500 text-white rounded-full text-sm">
          {state.length + 1}
        </span>

        <div className="flex-1">
          <label className="block text-gray-600 font-medium mb-2">
            Enter Term*
          </label>
          <input
            type="text"
            name="term"
            value={formik.values.term}
            onChange={formik.handleChange}
            placeholder="Write title here..."
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 
              focus:border-primary focus:outline-none transition-colors"
          />
          {formik.errors.term && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.term}</p>
          )}
        </div>

        <div className="flex-1">
          <label className="block text-gray-600 font-medium mb-2">
            Enter Definition*
          </label>
          <textarea
            name="defination"
            value={formik.values.defination}
            onChange={formik.handleChange}
            placeholder="Write definition here..."
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 
              focus:border-primary focus:outline-none transition-colors"
            rows="3"
          />
          {formik.errors.defination && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.defination}</p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={addInputValue}
        className="mt-6 text-primary hover:text-primary-dark font-medium 
          flex items-center space-x-2 transition-colors"
      >
        <span>+ Add more</span>
      </button>
    </div>
  );
};

export default AddMore;
