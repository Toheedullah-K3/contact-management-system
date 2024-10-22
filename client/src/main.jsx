import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import store, { persistor } from './store/store.js'

// pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AddContact from './pages/AddContact.jsx'
import AllContact from './pages/AllContacts.jsx'
import ContactDetails from './pages/ContactDetails.jsx'
import EditContact from './pages/EditContact.jsx'
import UserProfile from './pages/UserProfile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element= {<App />}>
      <Route path='' element= {<Home />}/>
      <Route path='login' element= {<Login />}/>
      <Route path='signup' element= {<Signup />}/>
      <Route path='add-contact' element= {<AddContact />}/>
      <Route path='all-contacts' element= {<AllContact />}/>
      <Route path='person/:id' element= {<ContactDetails />}/>
      <Route path='edit-contact/:id' element= {<EditContact />}/>
      <Route path='profile' element= {<UserProfile />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <RouterProvider router={router} />

    </PersistGate>
  </Provider>,
)
