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
import { ElectronLogo } from "./electron";
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
  | "Electron"
	| string;

interface IconProps {
	name: IconNames;
  fill?: string;
}

export default component$(({ name, ...props }: IconProps) => {
	const logosDictionary: { [key: string]: (props: any) => JSX.Element } = {
		Article: ArticleLogo,
		Computer: ComputerLogo,
		Github: GithubLogo,
		OpenClassRooms: OpenClassRoomsLogo,
		Qwik: QwikLogo,
		React: ReactLogo,
		Javascript: JavascriptLogo,
		Typescript: TypescriptLogo,
    Electron: ElectronLogo,
	};
	const IconTag = logosDictionary[name];
  console.log(props);
	return <>{IconTag && <IconTag {...props} name="plop" />}</>;
});
