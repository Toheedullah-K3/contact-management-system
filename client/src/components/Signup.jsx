import React, { useState } from 'react';
import { Input, Button } from './index.js';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit, setValue } = useForm();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());


  const createUser = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      const response = await axios.post(`${apiUrl}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      navigate('/login');
    } catch (error) {
      setError(error.response.data.error || "An unexpected error occurred.");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setValue("avatar", null);
    setFileInputKey(Date.now());
  }; 

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(createUser)}>
          <div className='space-y-5'>
            <div className="flex flex-col items-center">
              <label
                htmlFor="avatar"
                className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 bg-gray-200 rounded-full border-2 border-gray-300 hover:bg-gray-300 transition-all duration-200 relative group"
              >
                {avatarPreview ? (
                  <>
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleRemoveAvatar(); }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-gray-500">Upload Avatar</span>
                  </div>
                )}
                <input
                  key={fileInputKey}
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("avatar", {
                    onChange: handleAvatarChange,
                  })}
                />
              </label>
            </div>

            <Input
              label="Username: "
              type="text"
              placeholder="Enter your username"
              {...register("username", {
                required: true,
              })}
            />
            <Input
              label="Full Name: "
              type="text"
              placeholder="Enter your fullname"
              {...register("fullname", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Phone No: "
              type="text"
              placeholder="Enter your phone no"
              {...register("phone")}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Input
              label="Address: "
              type="text"
              placeholder="Enter your address"
              {...register("address")}
            />
            <Input
              label="About: "
              type="text"
              placeholder="Enter about yourself"
              {...register("about")}
            />

            <Button type="submit" className="w-full"> Sign Up </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
