import React from 'react';
import { Login as LoginComponent } from '../components';
const Login = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="mt-4 text-lg text-gray-600">
          Sign in to access your account and manage your contacts.
        </p>
      </div>
      <div className="w-full max-w-md">
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
