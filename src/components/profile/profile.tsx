import { component$, useStylesScoped$ } from "@builder.io/qwik";
import profile from "./profile.scss?inline";

export const Profile = component$(({ borderSize }: { borderSize?: "large" | undefined }) => {
	useStylesScoped$(profile);
	return (
		<div class={`gradient-border ${borderSize ? `gradient-border__${borderSize}` : ""}`}>
			<img alt="Avatar" style={{ height: "100%"}} src="/profile160.png" />
		</div>
	);
});
