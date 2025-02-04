import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Layout = ({ children }) => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const isLoading = useSelector((state) => state.auth.isLoading)

    if (isLoading){
        return <div>Loading...</div>
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }


    return (
        <div className="min-h-screen bg-lightBackground dark:bg-dark text-darkText dark:text-white">
            <div className="container mx-auto p-4">
                <div className="bg-lightCard dark:bg-card shadow-lg p-6 rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout