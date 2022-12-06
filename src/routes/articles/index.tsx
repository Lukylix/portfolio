import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./articles.scss?inline";

export const head = {
	title: "Lucas Garcia - Articles",
	meta: [
		{
			name: "description",
			content: "Le blog d'un développeur javascript.",
		},
	],
};

export default component$(() => {
	useStylesScoped$(styles);
	return <h1 class="fixed-center">Bientôt disponible !</h1>;
});
