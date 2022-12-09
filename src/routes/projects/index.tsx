import { component$, useClientEffect$, useSignal } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Skills from "~/components/skills/skills";
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
	const selected = useSignal<any[]>([]);

	return (
		<>
			<Skills selectedSignal={selected} />
			<Projects selectedArraySignal={selected} />
		</>
	);
});
