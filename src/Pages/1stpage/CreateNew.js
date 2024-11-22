import React from "react";
import AddMore from "./AddMore";
import TermForm from "./TermForm";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../../redux/action/Action";

const CreateNew = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer.inputData);

  const initialValues = {
    groupName: "",
    description: "",
    term: "",
    defination: "",
  };

  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const curentValue = {
      term: formik.values.term,
      defination: formik.values.defination,
    };
    state.push(curentValue);
    dispatch(
      addGroup({
        state,
        group: {
          groupName: formik.values.groupName,
          description: formik.values.description,
        },
      })
    );
    formik.resetForm();
  };

  const validate = (values) => {
    let errors = {};

    if (!values.groupName) {
      errors.groupName = "Group name is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    if (values.term && values.term.length < 1) {
      errors.term = "Term is required";
    }
    if (values.defination && values.defination.length < 1) {
      errors.defination = "Definition is required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="groupName" className="block text-gray-600 font-medium mb-2">
                Group Name*
              </label>
              <input
                id="groupName"
                name="groupName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.groupName}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 
                  focus:border-primary focus:outline-none transition-colors"
                placeholder="Enter group name"
              />
              {formik.errors.groupName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.groupName}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-600 font-medium mb-2">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 
                  focus:border-primary focus:outline-none transition-colors"
                rows="3"
                placeholder="Enter description"
              />
              {formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg shadow-md p-6">
          <TermForm />
          <AddMore formik={formik} />
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-medium 
              px-8 py-2 rounded-lg transition-colors duration-200"
          >
            Create Flashcard
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNew;
