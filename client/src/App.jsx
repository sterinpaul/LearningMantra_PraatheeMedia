import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Spinner } from "@material-tailwind/react";
import { userTokenAtom } from './recoil/userAtoms';
import { adminTokenAtom } from './recoil/adminAtoms';

const SignInSignUp = lazy(() => import('./pages/user/SignInSignUp'))
const Home = lazy(() => import('./pages/user/Home'))
const MyAccount = lazy(() => import('./pages/user/MyAccount'))

const AdminSignIn = lazy(() => import('./pages/admin/AdminSignIn'))
const DashBoard = lazy(() => import('./pages/admin/DashBoard'))
const Students = lazy(() => import('./pages/admin/Students'))

const Error = lazy(() => import('./pages/ErrorPage'))

const App = () => {
  const userToken = useRecoilValue(userTokenAtom)
  const adminToken = useRecoilValue(adminTokenAtom)

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner className="h-12 w-12 absolute m-auto top-1/2 left-0 right-0" color="indigo" />}>
        <Routes>
          <Route path='/' element={userToken ? <Home /> : <SignInSignUp />} />
          <Route path='/myaccount' element={userToken ? <MyAccount /> : <SignInSignUp />} />

          <Route path='/admin' element={adminToken ? <DashBoard /> : <AdminSignIn />} />
          <Route path='/admin/students' element={adminToken ? <Students /> : <AdminSignIn />} />

          <Route path='*' element={userToken ? <Error /> : <SignInSignUp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
export default App