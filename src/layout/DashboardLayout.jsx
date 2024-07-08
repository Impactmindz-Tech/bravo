import React from 'react'
import Header from '../components/Header/Header'
import NavBar from '../components/NavBar/NavBar'

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="flex justify-start" style={{ height: 'calc(100vh - 69px)' }}>
        <div className='w-[80px] sm:w-[10%] md:h-[100vh] md:w-[10%] sm:h-[100vh]  bg-blue-900'>
          <NavBar />
        </div>
        <div className="w-[100%] sm:w-[90%]  p-8 sm:px-2 md:px-2  lg:px-2 mt-0">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout