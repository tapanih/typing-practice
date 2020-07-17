import React from 'react';
import { useForm } from 'react-hook-form';
import userService from '../services/userService';
import { useHistory } from 'react-router-dom';
import { ResetPasswordFormFields } from '../../../backend/src/types';

interface ResetPasswordFormProps {
  match: {
    params: {
      key: string;
    };
  };
}

const ResetPasswordForm = ({ match }: ResetPasswordFormProps) => {
  const key = match.params.key;
  const { register, handleSubmit, errors, getValues, setError } = useForm<ResetPasswordFormFields>();
  const history = useHistory();

  const onSubmit = async ({ newPassword }: ResetPasswordFormFields) => {
    try {
      await userService.resetPassword({ newPassword, key });
      history.push("/login");
    } catch (error) {
      setError(error.response.data.type, "serverError", error.response.data.message);
    }
  };

  return (
    <div className="bg-blue-300 h-screen font-mono">
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="rounded bg-blue-100 max-w-md shadow-lg mx-2 px-6 py-6">
          <h2 className="text-center">Set new password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <input
                name="newPassword"
                type="password"
                placeholder="Password"
                ref={register({ required: true })}
              />
            </div>
            <div>
              {errors.newPassword && <span className="validation-error">This field is required</span>}
            </div>
            <div className="mt-4">
              <input
                name="confirmNewPassword"
                type="password"
                placeholder="Confirm password"
                ref={register({ 
                  validate: value => value === getValues("newPassword")
                })}
              />
            </div>
            <div>
              {errors.confirmNewPassword && <span className="validation-error">Passwords do not match</span>}
            </div>
            <div className="text-center mt-4">
              <button
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-700 border-blue-700
                          hover:border-blue-500 hover:text-blue-500 mt-4 lg:mt-0"
                type="submit"
              >
                Reset password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;