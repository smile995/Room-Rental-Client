import { Outlet } from "react-router-dom"
import Sidebar from "../components/Dashboard/Sidebar/Sidebar"


const Dashboard = () => {
  return (
    <div>
      <div><Sidebar/></div>
      <div className="flex-1 md:ml-64 p-6">
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard