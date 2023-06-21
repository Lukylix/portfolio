import { $, component$, useStore, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./img.scss?inline";

export const Img = component$(({ src, alt, ...props }: any) => {
	useStyles$(styles);
	const srcWithoutExtension = src.replace(/\.[^/.]+$/, "");
	const srcExtention = src.match(/\.[^/.]+$/)![0];
	const isLoaded = useStore({ value: false });
	const handleImageLoad = $((e: any) => {
		const img = e.target;
		const srcImg = img.src;
		console.log(srcImg, src);
		if (srcImg !== src) return;
		isLoaded.value = true;
		console.log(src, "loaded");
	});

	useVisibleTask$(() => {
		const img = document.querySelector("img");
		if (!img) return;
		if (img.complete) isLoaded.value = true;
		img.addEventListener("load", handleImageLoad);
		return () => img.removeEventListener("load", handleImageLoad);
	});

	return (
		<div
			class="blurred-img"
			style={{
				backgroundImage: isLoaded.value ? "none" : `url(${srcWithoutExtension}-small${srcExtention})`,
				...props?.style,
			}}
		>
			<img src={src} alt={alt} loading="lazy" {...props} />
		</div>
	);
});
