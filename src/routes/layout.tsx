import { component$, Slot } from "@builder.io/qwik";
import { TrianglesLine } from "~/components/triangles-line/triangles-line";
import Header from "../components/header/header";

export default component$(() => {
	return (
		<>
			<script defer data-domain="iloa.dev" src="https://plausible.iloa.dev/js/script.js"></script>
			<TrianglesLine height="140px" width="1246px" />
			<Header />
			<main>
				<Slot />
			</main>
			<footer>
				<p>
					Made with{" "}
					<a href="https://qwik.builder.io/" target="_blank">
						Qwik
					</a>
					,{" "}
					<a href="https://mdxjs.com/" target="_blank">
						MDX
					</a>{" "}
					and ♡
				</p>
			</footer>
		</>
	);
});
