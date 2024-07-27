import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center md:space-x-8 p-6 md:p-12">
        {/* Left Section */}
        <div className="flex-1 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
            Welcome to <span className="text-blue-500">Contact Management</span>
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            Effortlessly manage your contacts and stay organized with our user-friendly system.
          </p>
          <button className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
        </div>

        {/* Right Section */}
        <div className="flex-1 mt-12 md:mt-0">
          <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-bold text-blue-500 mb-6">Why Choose Us?</h3>
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl shadow-md transform hover:bg-blue-200 transition duration-300">
                  <span>✨</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Simplicity</h4>
                  <p className="text-gray-600">
                    Intuitive and easy to use.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl shadow-md transform hover:bg-blue-200 transition duration-300">
                  <span>🔒</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Security</h4>
                  <p className="text-gray-600">
                    Advanced protection for your data.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl shadow-md transform hover:bg-blue-200 transition duration-300">
                  <span>🚀</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Efficiency</h4>
                  <p className="text-gray-600">
                    Fast and productive contact management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
