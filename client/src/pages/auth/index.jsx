import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom'

export const Auth = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-black dark:text-neutral-300">Welcome to Personal Finance Tracker!</h1>
                <p className="text-black dark:text-neutral-300">Please sign up or sign in to continue.</p>
                <SignedOut>
                    <div className="flex flex-col space-y-4 items-center">
                        <SignUpButton mode='modal' className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700" />
                        <SignInButton mode='modal' className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700" />
                    </div>
                </SignedOut>
            </div>
            <SignedIn>
                <Navigate to='/' />
            </SignedIn>
        </div>
    )
}