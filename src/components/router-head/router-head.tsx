import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { ThemeScript } from "./theme-script";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
	const head = useDocumentHead();
	const loc = useLocation();

	return (
		<>
			<title>{head.title}</title>

			<link rel="canonical" href={loc.url.href} />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			<meta name="color-scheme" content="dark light" />

			{head.meta.map((m) => (
				<meta {...m} />
			))}

			{head.links.map((l) => (
				<link {...l} />
			))}

			{head.styles.map((s) => (
				<style {...s.props} dangerouslySetInnerHTML={s.style} />
			))}
			<ThemeScript />
		</>
	);
});
