
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../Context/Auth'



const ProtectiveRoutes = () => {

 const {isAuth,isLoading } = useAuth()


 if (isLoading) {
  return <h1>Loading...</h1>;  // Display a loading screen while checking auth
}
  return (
    isAuth  ? <Outlet/> : <Navigate to='/select-institute'/>   
  )
}

export default ProtectiveRoutes
