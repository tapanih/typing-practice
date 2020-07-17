import React from 'react';
import { useForm } from 'react-hook-form';
import userService from '../services/userService';
import { ChangePasswordFormFields } from '../../../backend/src/types';
import handleErrors from '../helpers/handleErrors';
import { useStateValue } from '../state';


const ChangePasswordForm: React.FC = () => {
  const [, dispatch] = useStateValue();
  const { register, handleSubmit, errors, getValues, setError } = useForm<ChangePasswordFormFields>();

  const onSubmit = async (details: ChangePasswordFormFields) => {
    try {
      await userService.changePassword(details);
    } catch (error) {
      handleErrors(error, dispatch);
      setError(error.response.data.type, "serverError", error.response.data.message);
    }
  };

  return (
    <div className="bg-blue-300 h-screen font-mono">
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="rounded bg-blue-100 max-w-md shadow-lg mx-2 px-6 py-6">
          <h2 className="text-center">Change password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <input
                name="oldPassword"
                type="password"
                placeholder="Current password"
                ref={register({ required: "This field is required" })}
              />
            </div>
            <div>
              {errors.oldPassword && <span className="validation-error">{errors.oldPassword.message}</span>}
            </div>
            <div className="mt-4">
              <input
                name="newPassword"
                type="password"
                placeholder="New password"
                ref={register({ required: "This field is required" })}
              />
            </div>
            <div>
              {errors.newPassword && <span className="validation-error">{errors.newPassword.message}</span>}
            </div>
            <div className="mt-4">
              <input
                name="confirmNewPassword"
                type="password"
                placeholder="Confirm new password"
                ref={register({ 
                  validate: value => value === getValues("newPassword") ? true : "Passwords do not match"
                })}
              />
            </div>
            <div>
              {errors.confirmNewPassword && <span className="validation-error">{errors.confirmNewPassword.message}</span>}
            </div>
            <div className="text-center mt-4">
              <button
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-700 border-blue-700
                          hover:border-blue-500 hover:text-blue-500 mt-4 lg:mt-0"
                type="submit"
              >
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;