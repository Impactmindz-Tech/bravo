import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className="flex w-full sm:justify-center h-screen">
            <div className="w-[45%] bg-blue-900 flex items-center justify-center sm:hidden">
                <img src="loginLeftSideImage.png" alt="login left side image" className="w-full h-full  object-contain" />
            </div>
            <div className="flex-1 flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout