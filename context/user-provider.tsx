'use client';

import { useAppwrite } from '@/hooks/useAppwrite';
import { Redirect } from 'expo-router';
import React, { createContext, ReactNode, useContext } from 'react';
import { getCurrentUser } from '../lib/appwrite';

interface UserContextType {
	isLogged: boolean;
	user: User | null;
	loading: boolean;
	refetch: (
		newParams?: Record<string, string | number>
	) => Promise<void>;
}

interface User {
	$id: string;
	name: string;
	email: string;
	avatar: string;
}

const UserContext = createContext<UserContextType | undefined>(
	undefined
);

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const {
		data: user,
		loading,
		refetch
	} = useAppwrite({
		fn: getCurrentUser
	});

	const isLogged = !!user;

	console.log('user =>', JSON.stringify(user, null, 2));

	return (
		<UserContext.Provider
			value={{
				isLogged,
				user,
				loading,
				refetch
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context)
		throw new Error(
			'useUserContext must be used within a UserProvider'
		);

	return context;
};

export default UserProvider;
