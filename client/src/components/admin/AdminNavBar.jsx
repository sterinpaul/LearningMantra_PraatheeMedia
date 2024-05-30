import {useState,useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


import {
  Navbar,
  Collapse,
  Typography,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";

import {
  UsersIcon,
  PowerIcon,
  Bars2Icon,
  QueueListIcon
} from "@heroicons/react/24/outline";

import { useSetRecoilState } from "recoil";
import { adminSignOut } from "../../api/apiConnections/authAdminConnections";
import { adminTokenAtom } from "../../recoil/adminAtoms";


// nav list component

function NavList() {
  const setToken = useSetRecoilState(adminTokenAtom)
  const navigate = useNavigate()
  const persistState = useLocation()
  const adminId = persistState?.state?.id


  const signOut = async () => {
    setToken(null)
    localStorage.removeItem('admin-token')
    const signOutResponse = await adminSignOut(adminId)
    if(signOutResponse){
      toast.success("Sign out success")
    }
    navigate('/admin', { replace: true })
  }


  return (
    <ul className="my-2 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-between lg:gap-4">

      <Link to='/admin'>
        <Typography as="span" variant="small" color="blue-gray" className="font-normal">
          <MenuItem className="flex items-center gap-2 lg:rounded-full text-brown-600 hover:text-black">
            <QueueListIcon className="h-4 w-4" />
            Courses
          </MenuItem>
        </Typography>
      </Link>

      <Link to='/admin/students'>
        <Typography as="span" variant="small" color="blue-gray" className="font-normal">
          <MenuItem className="flex items-center gap-2 lg:rounded-full text-brown-600 hover:text-black">
            <UsersIcon className="h-4 w-4" />
            Students
          </MenuItem>
        </Typography>
      </Link>
      
        <Typography onClick={signOut} as="span" variant="small" color="blue-gray" className="font-normal">
        <MenuItem className="flex items-center gap-2 lg:rounded-full text-brown-600 hover:text-black">
            <PowerIcon className="h-4 w-4" />
            Sign Out
          </MenuItem>
        </Typography>
      
    </ul>
  );
}


export const AdminNavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    )
  }, [])

  return (
    <Navbar className="fixed max-w-none rounded-none z-50 bg-[#e7e8e9] shadow-none border-none" >
      <div className="relative mx-auto flex justify-between items-center text-blue-gray-900">

        
        <Link to='/admin'><h1 className='font-kaushan text-2xl font-bold'>Admin Dashboard</h1></Link>
        

        <div className='flex justify-end items-center'>
          <div className="top-2/4 left-2/4 hidden -translate-2/4 lg:flex">
            <NavList isOpen={isNavOpen} />
          </div>

          <div className='flex items-center justify-around'>
            <IconButton size="sm" variant="text" onClick={toggleIsNavOpen} className="ml-auto mr-2 hover:bg-gray-300 lg:hidden">
              <Bars2Icon className="h-6 w-6 text-black" />
            </IconButton>

          </div>
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList isOpen={isNavOpen} />
      </Collapse>
    </Navbar>
  )
}
