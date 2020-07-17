import React from 'react';
import { useForm } from 'react-hook-form';
import userService from '../services/userService';
import { ForgotPasswordFormFields } from '../../../backend/src/types';
import { useHistory, useLocation } from 'react-router-dom';

const ForgotPasswordForm: React.FC = () => {
  const { register, handleSubmit, errors, setError, getValues } = useForm<ForgotPasswordFormFields>();
  const history = useHistory();
  const location = useLocation();
  const isSubmitted = location.state ? true : false;

  const onSubmit = async (details: ForgotPasswordFormFields) => {
    try {
      await userService.forgotPassword(details);
      history.push("/forgotPassword", getValues("email"));
    } catch (error) {
      setError("email", "serverError", error.response.data);
    }
  };

  return (
    <div className="bg-blue-300 h-screen font-mono">
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="rounded bg-blue-100 max-w-md shadow-lg mx-2 px-6 py-6">
          {!isSubmitted ?
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-center mt-4">
                Enter the email associated with your account to receive a recovery link.
              </div>
              <div className="text-center mt-4">
                <input 
                  name="email"
                  placeholder="Email"
                  ref={register({ 
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+$/i,
                      message: "invalid email address"
                    } 
                  })}
                />
              </div>
              <div>
                {errors.email && <span className="validation-error">{errors.email.message}</span>}
              </div>
              <div className="text-center mt-4">
                <button 
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-700 border-blue-700
                            hover:border-blue-500 hover:text-blue-500 mt-4 lg:mt-0"
                  type="submit"
                >
                  Send recovery email
                </button>
              </div>
            </form>
          :
            <div>    
              An email with a recovery link has been sent to <i>{location.state}</i>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;