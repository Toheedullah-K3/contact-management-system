import React from 'react';
import { Signup as SignUpComponent } from '../components';

const SignUp = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Join Us Today!</h1>
        <p className="mt-4 text-lg text-gray-600">
          Create an account to start managing your contacts effortlessly.
        </p>
      </div>
      <div className="w-full max-w-md">
        <SignUpComponent />
      </div>
    </div>
  );
}

export default SignUp;
