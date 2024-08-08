// CustomFileInput.jsx
import React from 'react';

const CustomFileInput = ({ register, preview, onChange }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
        {preview ? (
          <img src={preview} alt="Avatar Preview" className="object-cover w-full h-full" />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            <span className="text-lg">No Image</span>
          </div>
        )}
      </div>
      <label htmlFor="avatar" className="cursor-pointer bg-primary text-white py-2 px-4 rounded">
        Choose Image
        <input
          id="avatar"
          type="file"
          className="hidden"
          {...register("avatar")}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default CustomFileInput;
