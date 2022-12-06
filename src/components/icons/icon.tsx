/* eslint @typescript-eslint/no-unused-vars: off */
import { component$ } from "@builder.io/qwik";
import { ArticleLogo } from "./article";
import { ComputerLogo } from "./computer";
import { GithubLogo } from "./github";
import { OpenClassRoomsLogo } from "./openclassrooms";
import { QwikLogo } from "./qwik";
import { ReactLogo } from "./react";
import { JavascriptLogo } from "./javascript";
import { TypescriptLogo } from "./typescript";
import { JSX } from "@builder.io/qwik/jsx-runtime";

export type IconNames =
	| "Typescript"
	| "Javascript"
	| "Article"
	| "Computer"
	| "Github"
	| "OpenClassRooms"
	| "Qwik"
	| "React"
	| string;

interface IconProps {
	name: IconNames;
}

export default component$(({ name, ...props }: IconProps) => {
	const logosDictionary: { [key: string]: ({ ...props }: { props?: any }) => JSX.Element } = {
		Article: ArticleLogo,
		Computer: ComputerLogo,
		Github: GithubLogo,
		OpenClassRooms: OpenClassRoomsLogo,
		Qwik: QwikLogo,
		React: ReactLogo,
		Javascript: JavascriptLogo,
		Typescript: TypescriptLogo,
	};
	const IconTag = logosDictionary[name];
	return <>{IconTag && <IconTag {...props} />}</>;
});
