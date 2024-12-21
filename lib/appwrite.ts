import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	OAuthProvider,
	Query,
	Storage
} from 'react-native-appwrite';

export const config = {
	platform: 'com.joy.restate',
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
	projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
};

export const client = new Client();
client
	.setEndpoint(config.endpoint!)
	.setProject(config.projectId!)
	.setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
	//const redirectUri = Linking.createURL('/');
	const redirectUri = 'exp://192.168.0.100:8081';
	const result = await account.createOAuth2Token(
		OAuthProvider.Google,
		redirectUri
	);

	console.log(`debug: result =>`, result);

	if (!result) return;

	return result.toString();
	// try {
	//     const redirectUri = Linking.createURL('/');
	//     console.log('Redirect URI:', redirectUri);

	//     const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);
	//     if (!response) throw new Error('Failed to generate OAuth token');

	//     console.log('OAuth Token URL:', response.toString());

	//     const browserResult = await WebBrowser.openAuthSessionAsync(response.toString(), redirectUri);
	//     console.log('Browser Result:', JSON.stringify(browserResult, null, 2));

	//     // Check if the type is 'success' before accessing 'url'
	//     if (browserResult.type === 'success' && 'url' in browserResult) {
	//         const url = browserResult.url;
	//         console.log('Redirect URL:', url);

	//         const parsedUrl = new URL(url);
	//         const secret = parsedUrl.searchParams.get('secret')?.toString();
	//         const userId = parsedUrl.searchParams.get('userId')?.toString();

	//         if (!secret || !userId) {
	//             throw new Error('OAuth response is missing secret or userId');
	//         }

	//         const session = await account.createSession(userId, secret);
	//         console.log('Session Created:', session);

	//         return true;
	//     } else {
	//         throw new Error(`OAuth login failed: ${browserResult.type}`);
	//     }
	// } catch (error) {
	//     console.error('Login Error:', error);
	//     return false;
	// }
}

export async function logout() {
	try {
		const result = await account.deleteSession('current');
		return result;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function getCurrentUser() {
	try {
		const result = await account.get();
		if (result.$id) {
			const userAvatar = avatar.getInitials(result.name);

			return {
				...result,
				avatar: userAvatar.toString()
			};
		}

		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
}
