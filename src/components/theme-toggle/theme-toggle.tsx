import { $, component$, useClientEffect$, useContext, useStyles$ } from "@builder.io/qwik";
import { themeStorageKey } from "../router-head/theme-script";
import themeToggle from "./theme-toggle.css?inline";
import { GlobalStore } from "../../context";

export type ThemePreference = "dark" | "light";

export const colorSchemeChangeListener = (onColorSchemeChange: (isDark: boolean) => void) => {
	const listener = ({ matches: isDark }: MediaQueryListEvent) => {
		onColorSchemeChange(isDark);
	};
	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => listener(event));

	return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listener);
};

export const setPreference = (theme: ThemePreference) => {
	localStorage.setItem(themeStorageKey, theme);
	reflectPreference(theme);
};

export const reflectPreference = (theme: ThemePreference) => {
	document.firstElementChild?.setAttribute("data-theme", theme);
};

export const getColorPreference = (): ThemePreference => {
	if (localStorage.getItem(themeStorageKey)) {
		return localStorage.getItem(themeStorageKey) as ThemePreference;
	} else {
		return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
	}
};

export const ThemeToggle = component$(() => {
	useStyles$(themeToggle);
	const store = useContext(GlobalStore);

	const onClick$ = $(() => {
		store.theme = store.theme === "light" ? "dark" : "light";
		setPreference(store.theme);
	});

	useClientEffect$(() => {
		store.theme = getColorPreference();
	});
	return (
		<button
			type="button"
			class="theme-toggle"
			id="theme-toggle"
			title="Toggles light & dark"
			aria-label={store.theme}
			aria-live="polite"
			onClick$={onClick$}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				height="100%"
				width="40px"
				fill="currentColor"
				stroke-linecap="round"
				class="theme-toggle__classic"
				viewBox="0 0 32 32"
			>
				<clipPath id="theme-toggle__classic__cutout">
					<path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
				</clipPath>
				<g clip-path="url(#theme-toggle__classic__cutout)">
					<circle cx="16" cy="16" r="9.34" />
					<g stroke="currentColor" stroke-width="1.5">
						<path d="M16 5.5v-4" />
						<path d="M16 30.5v-4" />
						<path d="M1.5 16h4" />
						<path d="M26.5 16h4" />
						<path d="m23.4 8.6 2.8-2.8" />
						<path d="m5.7 26.3 2.9-2.9" />
						<path d="m5.8 5.8 2.8 2.8" />
						<path d="m23.4 23.4 2.9 2.9" />
					</g>
				</g>
			</svg>
		</button>
	);
});
