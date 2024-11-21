import { useEffect } from "react"
import * as WebBrowser from "expo-web-browser"
import { makeRedirectUri, useAuthRequest } from "expo-auth-session"
import { Button, View } from "react-native"
import Constants from "expo-constants"

WebBrowser.maybeCompleteAuthSession()

// Endpoint
const discovery = {
	authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
	tokenEndpoint: "https://www.strava.com/oauth/token",
	revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
}

export default function App() {
	const [request, response, promptAsync] = useAuthRequest(
		{
			clientId: "140703",
			scopes: ["activity:read_all"],
			redirectUri: makeRedirectUri({
				// the "redirect" must match your "Authorization Callback Domain" in the Strava dev console.
				native: "http://oauthredirect",
			}),
		},
		discovery
	)

	useEffect(() => {
		if (response?.type === "success") {
			const { code } = response.params
			console.log({ response })
		}
	}, [response])

	return (
		<View style={{ marginTop: Constants.statusBarHeight }}>
			<Button
				disabled={!request}
				title='Login'
				onPress={() => {
					promptAsync()
				}}
			/>
		</View>
	)
}
