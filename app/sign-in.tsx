import icons from '@/constants/icons';
import images from '@/constants/images';
import { useUserContext } from '@/context/user-provider';
import { login } from '@/lib/appwrite';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
	Alert,
	Image,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

const Auth = () => {
	const { refetch, loading, user } = useUserContext();
	const handleLogin = async () => {
		// const result = await login();

		// if (result) {
		// 	refetch();
		// } else {
		// 	Alert.alert('Error', 'Failed to login');
		// }
		const uri = await login();
		console.log(`debug: uri =>`, uri);
		if (!uri) return null;
		let result = await WebBrowser.openAuthSessionAsync(uri);
		console.log(`debug: result from sign in =>`, result);
		return result;
	};

	console.log(`debug: user from sign in =>`, user);

	return (
		<SafeAreaView className='bg-white h-full'>
			<ScrollView contentContainerClassName='h-full'>
				<Image
					source={images.onboarding}
					className='w-full h-4/6'
					resizeMode='contain'
				/>
				<View className='px-10'>
					<Text className='text-base text-center uppercase font-rubik text-black-200'>
						Welcome to ReState
					</Text>

					<Text className='text-3xl font-rubik-bold text-black-300 text-center mt-2'>
						{`Let's get You Closer to `}
						<Text className='text-primary-300'>Your Ideal Home</Text>
					</Text>

					<Text className='text-lg font-rubik text-black-200 text-center mt-12'>
						Login to ReEstate with Google
					</Text>

					<TouchableOpacity
						onPress={handleLogin}
						className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'
					>
						<View className='flex flex-row items-center justify-center w-full'>
							<Image
								source={icons.google}
								className='w-5 h-5'
								resizeMode='contain'
							/>
							<Text className='text-lg font-rubik-medium text-black-300 ml-2'>
								Continue with Google
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Auth;
