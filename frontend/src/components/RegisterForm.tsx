import React from 'react';
import { useForm } from 'react-hook-form';
import { apiBaseUrl } from '../constants';
import axios from 'axios';

export interface RegisterFormFields {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, errors, getValues } = useForm<RegisterFormFields>();

  const onSubmit = async (details: RegisterFormFields) => {
    try {
      await axios.post<RegisterFormFields>(
        `${apiBaseUrl}/auth/register`,
        details
      );
    } catch (e) {
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="bg-blue-300 h-screen font-mono">
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="rounded bg-blue-100 max-w-md shadow-lg mx-2 px-6 py-6">
          <h2 className="text-center">Create an account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <input 
                name="username"
                placeholder="Username"
                ref={register({ required: true })}
              />
            </div>
            <div>
              {errors.username && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="mt-4">
              <input
                name="password"
                type="password"
                placeholder="Password"
                ref={register({ required: true })}
              />
            </div>
            <div>
              {errors.password && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="mt-4">
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                ref={register({ 
                  validate: value => value === getValues("password")
                })}
              />
            </div>
            <div>
              {errors.confirmPassword && <span className="text-red-600">Passwords do not match</span>}
            </div>
            <div className="text-center mt-4">
              <button 
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-700 border-blue-700
                          hover:border-blue-500 hover:text-blue-500 mt-4 lg:mt-0"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;