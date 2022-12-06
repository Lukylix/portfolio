export const themeStorageKey = "theme-preference";

export const ThemeScript = () => {
	const themeScript = `
        document.firstElementChild
            .setAttribute('data-theme',
                localStorage.getItem('${themeStorageKey}') ??
                (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
            )`;
	return <script dangerouslySetInnerHTML={themeScript} />;
};
