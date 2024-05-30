/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { userTokenAtom } from "../../recoil/userAtoms";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


import {
  Navbar,
  Collapse,
  Typography,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  PowerIcon,
  Bars2Icon,
  HomeIcon
} from "@heroicons/react/24/outline";

import { useSetRecoilState } from "recoil";
import { userSignOut } from "../../api/apiConnections/authUserConnections";


// nav list component

function NavList({userId}) {
  const setToken = useSetRecoilState(userTokenAtom)
  const navigate = useNavigate()


  const signOut = async () => {
    setToken(null)
    localStorage.removeItem('user-token')
    const signOutResponse = await userSignOut(userId)
    if (signOutResponse) {
      toast.success("Sign out success")
    }
    navigate('/', { replace: true })
  }

  return (
    <ul className="my-2 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-between lg:gap-1">

      <Link to='/'>
        <Typography as="span" variant="small" color="blue-gray" className="font-normal">
          <MenuItem className="flex items-center gap-2 lg:rounded-full text-black hover:text-blue-700">
            <HomeIcon className="h-5 w-5" />
            Home
          </MenuItem>
        </Typography>
      </Link>

      <Link to='/myaccount'>
        <Typography as="span" variant="small" color="blue-gray" className="font-normal">
          <MenuItem className="flex items-center gap-2 lg:rounded-full text-black hover:text-blue-700">
            <UserCircleIcon className="h-5 w-5" />
            My Account
          </MenuItem>
        </Typography>
      </Link>

      <Typography onClick={signOut} as="span" variant="small" color="blue-gray" className="font-normal">
        <MenuItem className="flex items-center gap-2 lg:rounded-full text-black hover:text-blue-700">
          <PowerIcon className="h-5 w-5" />
          Sign Out
        </MenuItem>
      </Typography>
    </ul>
  );
}


export const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const persistState = useLocation()
  const userId = persistState?.state?.id
  const userEmail = localStorage.getItem("userEmail")
  

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    )
  }, [])

  return (
    <Navbar className="fixed max-w-none rounded-none z-50 bg-[#e7e8e9] shadow-none border-none" >
      <div className="relative mx-auto flex justify-between items-center text-blue-gray-900">


        <Link to='/'><h1 className='font-kaushan text-2xl font-bold text-[#3f7bfe]'>Learning Mantra</h1></Link>


        <div className='flex justify-end items-center'>
          <div className="top-2/4 left-2/4 hidden -translate-2/4 lg:flex">
            <NavList userId={userId} />
          </div>

          <div className='flex items-center justify-around gap-1'>

            <div className="capitalize cursor-default font-bold text-blue-500 flex items-center justify-center w-8 h-8 border border-blue-700 bg-white rounded-full" >
              {userEmail[0] ?? "X"}
            </div>

            <IconButton size="sm" variant="text" onClick={toggleIsNavOpen} className="ml-auto mr-2 hover:bg-gray-300 lg:hidden">
              <Bars2Icon className="h-6 w-6 text-black" />
            </IconButton>

          </div>
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList userId={userId} />
      </Collapse>
    </Navbar>
  )
}
