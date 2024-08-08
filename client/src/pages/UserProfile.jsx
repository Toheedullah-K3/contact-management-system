import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
//   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    } else {
    //   setIsLoading(false);
    }
  }, [userData, navigate]);

//   if (isLoading) {
//     return <h1 className="text-5xl flex justify-center">Loading...</h1>;
//   }

  if (!userData) {
    return <h1 className="text-5xl flex justify-center">Please Login to see this Page</h1>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex flex-col items-center mb-4">
          <img
            src={userData.avatar || 'https://via.placeholder.com/150'}
            alt={`${userData.username}'s profile`}
            className="w-32 h-32 rounded-full mb-4"
          />
          <h1 className="text-4xl font-bold mb-2">{userData.username}</h1>
          <p className="text-xl text-gray-600">{userData.fullname || "N/A"}</p>
        </div>
        <div className="w-full mt-4">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-xl mb-2"><strong>Email:</strong> {userData.email}</p>
          <p className="text-xl mb-2"><strong>Phone:</strong> {userData.phone || "N/A"}</p>
          <p className="text-xl mb-2"><strong>Address:</strong> {userData.address || "N/A"}</p>
        </div>
        <div className="w-full mt-6">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-lg text-gray-700">{userData.about || "No additional information provided."}</p>
        </div>
        <button
          onClick={() => navigate('/edit-profile')}
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
