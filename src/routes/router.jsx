import React from 'react'
import { createBrowserRouter } from 'react-router'
import MainLayout from '../MainLayout';
import Home from '../pages/Home';
import AddCar from '../pages/AddCar';
import MyCars from '../pages/MyCars';
import PrivateProvider from '../components/common/PrivateProvider';
import CarDetails from '../components/car/CarDetails';
import AvailableCars from '../pages/AvailableCars';
import MyBookings from '../pages/MyBookings';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import axios from 'axios';
import CarDetailsPage from '../pages/CarDetailsPage';




const cars = () => fetch('https://car-rental-server-eta.vercel.app/cars')
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        index: true,
        element: <Home></Home>
      },
      {
        path:'/addCars',
        element:<PrivateProvider><AddCar/></PrivateProvider>
      },
      {
        path:'/myCars',
        element:<PrivateProvider><MyCars/></PrivateProvider>,
        loader: cars
      },
      {
        path: '/cars/:id',
        element: <CarDetailsPage />,
        loader: async ({ params }) => {
          return fetch(`https://car-rental-server-eta.vercel.app/cars/${params.id}`);
        },
      },

      {
        path: '/cars',
        element: <AvailableCars></AvailableCars>,
        loader: cars
      },
      {
        path:'/my-booking',
        element: <PrivateProvider><MyBookings></MyBookings></PrivateProvider>,
        loader: ()=> fetch('https://car-rental-server-eta.vercel.app/my-booking')
      },
      
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element:<Register></Register>
  },
  {
    path:'*',
    element: <NotFound></NotFound>
  }
]);

export default router