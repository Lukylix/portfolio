import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Projects from "../../components/projects/projects";

export const head: DocumentHead = {
	title: "Lucas Garcia - Projets",
	meta: [
		{
			name: "description",
			content: "Le portfolio d'un développeur javascript.",
		},
	],
};

export default component$(() => {
	return <Projects />;
});
