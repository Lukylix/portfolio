import { createContextId } from "@builder.io/qwik";
import type { ThemePreference } from "./components/theme-toggle/theme-toggle";

export interface SiteStore {
	theme: ThemePreference | "auto";
}

export const GlobalStore = createContextId<SiteStore>("site-store");
