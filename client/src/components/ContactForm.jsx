import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Input, Button, Select } from './index.js';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactForm = ( {contact} ) => {

  const { register, handleSubmit, reset } = useForm();

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
    try {

      const url = contact ?
        `${apiUrl}/contact/editContact/${contact._id}` :
        `${apiUrl}/contact/addContact`;

      const response = await axios.post(url, data, {
        withCredentials: true
      });

      navigate('/all-contacts');
      return 0;

    } catch (error) {
      console.log("Error, Adding Contact!!", error);
    }
  };

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
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
              <img
                src="https://via.placeholder.com/150"
                alt="Illustration"
                className="w-32 h-32 object-cover mx-auto rounded-lg shadow-md"
              />
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
