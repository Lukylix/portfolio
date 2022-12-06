import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";

import style from "./square.scss?inline";

export const Square = component$(({ ...props }) => {
	useStylesScoped$(style);
	return (
		<div class="square" {...props}>
			<Slot />
		</div>
	);
});
