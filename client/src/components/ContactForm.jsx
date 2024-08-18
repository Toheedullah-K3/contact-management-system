import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Input, Button, Select } from './index.js';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactForm = ({ contact }) => {

  const { register, handleSubmit, reset } = useForm();
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    reset({
      name: contact?.name || "",
      phone: contact?.phone || "",
      email: contact?.email || "",
      address: contact?.address || "",
      relationShip: contact?.relationShip || "nothing",
      company: contact?.company || "",
      notes: contact?.notes || "",
      facebook: contact?.socialMedia?.facebook || "",
      github: contact?.socialMedia?.github || "",
      linkedIn: contact?.socialMedia?.linkedIn || ""
    });
  }, [contact, reset]);


  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;


  const submitContact = async (data) => {
    setLoading(true)
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (data.contactAvatar[0]) {
      formData.append("contactAvatar", data.contactAvatar[0]);
    }

    try {

      const url = contact ?
        `${apiUrl}/contact/editContact/${contact._id}` :
        `${apiUrl}/contact/addContact`;

      const response = await axios.post(url, formData, {
        withCredentials: true
      });

      navigate('/all-contacts');
      return 0;

    } catch (error) {
      console.log("Error, Adding Contact!!", error);
    } finally {
      setLoading(false)
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


  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      {loading && (
        <div className="loader-overlay">

          <div className="loader text-blue-500"></div>
        </div>
      )}
      {isMobile ? (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-5">
            {contact ? "Update Contact" : "Add Contact"}
          </h2>
          <form onSubmit={handleSubmit(submitContact)} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6">
              <img
                src="https://via.placeholder.com/100"
                alt="Illustration"
                className="w-18 h-18 object-cover mx-auto rounded-lg shadow-md"
              />
              <Input
                type="text"
                placeholder="Name"
                className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("name", { required: true })}
              />
              <Input
                type="text"
                placeholder="Phone No"
                className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("phone", { required: true })}
              />
              <Input
                type="email"
                placeholder="Email"
                className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("email")}
              />
              <Input
                type="text"
                placeholder="Address"
                className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("address")}
              />
              <Select
                options={["Friend", "Family", "Colleague", "Other"]}
                className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("relationShip")}
              />
              <Input
                type="text"
                placeholder="Company Name"
                className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("company")}
              />
              <Input
                type="text"
                placeholder="Any Notes"
                className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("notes")}
              />

              <Input
                type="text"
                placeholder="Facebook"
                className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                {...register("facebook")}
              />
              <Input
                type="text"
                placeholder="Github"
                className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                {...register("github")}
              />
              <Input
                type="text"
                placeholder="LinkedIn"
                className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                {...register("linkedIn")}
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {contact ? "Update Contact" : "Add Contact"}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row max-w-5xl w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="w-full md:w-1/2 p-4 space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center md:text-left">
              {contact ? "Update Contact Details" : "Add a New Contact"}
            </h2>
            <p className="text-sm text-gray-600 text-center md:text-left">Fill in the details to add a new contact to your list.</p>

            <form onSubmit={handleSubmit(submitContact)} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6">
                <Input
                  type="text"
                  placeholder="Name"
                  className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("name", { required: true })}
                />
                <Input
                  type="text"
                  placeholder="Phone No"
                  className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("phone", { required: true })}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("email")}
                />
                <Input
                  type="text"
                  placeholder="Address"
                  className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("address")}
                />
                <Select
                  options={["Friend", "Family", "Colleague", "Other"]}
                  className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("relationShip")}
                />
                <Input
                  type="text"
                  placeholder="Company Name"
                  className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("company")}
                />
                <Input
                  type="text"
                  placeholder="Any Notes"
                  className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("notes")}
                />
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {contact ? "Update Contact" : "Add Contact"}
                </Button>
              </div>
            </form>
          </div>
          <div className="hidden md:flex w-full md:w-1/2 p-4 items-center justify-center bg-gray-100 rounded-r-2xl">
            <div className="text-center space-y-4 w-full">
              <h2 className="text-2xl font-bold text-gray-900">Manage Your Contacts</h2>
              <p className="text-gray-600">Keep track of all your important contacts in one place.</p>
              <p className="text-gray-600">Easily add, edit, and delete contacts as needed.</p>
              <div className="flex flex-col items-center">
                <label
                  htmlFor="contactAvatar"
                  className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 bg-gray-200 rounded-xl border-2 border-gray-300 hover:bg-gray-300 transition-all duration-200 relative group"
                >

                  {avatarPreview ? (
                    <>
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-full h-full rounded-xl object-cover"
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
                    id="contactAvatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("contactAvatar", {
                      onChange: (e) => {
                        handleAvatarChange(e);
                      },
                    })}
                  />
                </label>
              </div>

              <div className="mt-6">
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">Social Media Links</h3>
                  <Input
                    type="text"
                    placeholder="Facebook"
                    className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                    {...register("facebook")}
                  />
                  <Input
                    type="text"
                    placeholder="Github"
                    className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                    {...register("github")}
                  />
                  <Input
                    type="text"
                    placeholder="LinkedIn"
                    className="appearance-none rounded-lg border border-gray-300 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                    {...register("linkedIn")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
