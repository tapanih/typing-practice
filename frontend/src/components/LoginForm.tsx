import React from 'react';
import { LoginDetails } from '../../../backend/src/types';
import { useForm } from 'react-hook-form';
import { useStateValue, login } from '../state';
import userService from '../services/userService';

const LoginForm: React.FC = () => {
  const [, dispatch] = useStateValue();
  const { register, handleSubmit, errors, setError } = useForm<LoginDetails>();

  const onSubmit = async (details: LoginDetails) => {
    try {
      const user = await userService.login(details);
      dispatch(login(user));
    } catch (error) {
      setError("username", "notMatch", error.response.data);
    }
  };

  return (
    <div className="bg-blue-300 h-screen font-mono">
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="rounded bg-blue-100 max-w-md shadow-lg mx-2 px-6 py-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input 
                name="username"
                placeholder="Username"
                ref={register({ required: true })}
              />
            </div>
            <div>
              {errors.username?.type === "required" && <span className="text-red-600">This field is required</span>}
              {errors.username?.type === "notMatch" && <span className="text-red-600">{errors.username.message}</span>}
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
            <div className="text-center mt-4">
              <button 
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-700 border-blue-700
                          hover:border-blue-500 hover:text-blue-500 mt-4 lg:mt-0"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;