import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { FinancialRecordProvider } from './contexts/financial-record-context'
import { SignOutButton, SignedIn, UserButton, SignedOut, useUser } from '@clerk/clerk-react'
import { DarkModeToggle } from './components/dark-mode-toggle'

function Main({ toggleDarkMode, darkMode }) {
	const { user } = useUser();
	const location = useLocation();

	return (
		<div className="app-container">
			{location.pathname !== '/auth' && (
				<div className='navbar bg-yellow-300 text-black p-2 shadow-md flex justify-between items-center'>
					<div className='flex-1'>
						<SignedIn>
							<Link to='/' className='mr-4 hover:underline'>Dashboard</Link>
						</SignedIn>
					</div>
					<div className='flex-initial'>
						<DarkModeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
						<SignedIn>
							<UserButton />
						</SignedIn>
					</div>
				</div>
			)}
			<Routes>
				<Route path='/' element={
					user ? (
						<FinancialRecordProvider>
							<Dashboard />
						</FinancialRecordProvider>
					) : (
						<Navigate to='/auth' />
					)
				} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/*' element={
					<SignedOut>
						<Navigate to='/auth' />
					</SignedOut>
				} />
			</Routes>
		</div>
	);
}

function OuterAppWrapper({ children, darkMode }) {
	return <div className={`${darkMode && "dark"}`}>{children}</div>;
}

function AppWrapper({ children }) {
	return <div className="min-h-screen dark:bg-neutral-900">{children}</div>;
}

function App() {
	const [darkMode, setDarkMode] = useState(() => {
		const savedDarkMode = localStorage.getItem('darkMode');
		if (savedDarkMode !== null) {
			return JSON.parse(savedDarkMode);
		} else {
			return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
	});

	useEffect(() => {
		localStorage.setItem('darkMode', JSON.stringify(darkMode));
	}, [darkMode]);
	const toggleDarkMode = () => setDarkMode(!darkMode);
	return (
		<Router>
			<OuterAppWrapper darkMode={darkMode}>
				<AppWrapper>
					<Main toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
				</AppWrapper>
			</OuterAppWrapper>
		</Router>
	);
}

export default App;