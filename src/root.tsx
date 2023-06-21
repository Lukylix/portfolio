import { component$, useContextProvider, useStyles$, useStore } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { GlobalStore, SiteStore } from "./context";
import { QwikPartytown } from "./components/partytown/partytown";

import globalStyles from "./global.scss?inline";

export default component$(() => {
	useStyles$(globalStyles);
	const store = useStore<SiteStore>({
		theme: "auto",
	});

	useContextProvider(GlobalStore, store);
	return (
		<QwikCityProvider>
			<head>
				<meta charSet="utf-8" />
				<link rel="manifest" href="/manifest.json" />
				<QwikPartytown forward={["dataLayer.push"]} />
				<script
					async
					type="text/partytown"
					data-domain="iloa.dev"
					src="https://plausible.iloa.dev/js/script.js"
				></script>
				<RouterHead />
			</head>
			<body lang="fr">
				<RouterOutlet />
				<ServiceWorkerRegister />
			</body>
		</QwikCityProvider>
	);
});
