import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./404.scss?inline";

export const head = {
	title: "Lucas Garcia - 404",
	meta: [
		{
			name: "description",
			content: "Page not found.",
		},
	],
};

export default component$(() => {
	useStylesScoped$(styles);
	return (
		<section>
			<h1>404 not found</h1>
		</section>
	);
});
