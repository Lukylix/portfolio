import { component$, useTask$, useSignal, useStyles$, Signal, useContext } from "@builder.io/qwik";
import { GlobalStore } from "../../context";
import { ComputerLogo } from "../icons/computer";
import { GithubLogo } from "../icons/github";
import Icon, { IconNames } from "../icons/icon";

import projects from "./projects.json";
import styles from "./projects.scss?inline";

interface ProjectProps {
	index: number;
	name: string;
	img: string;
	icons: IconNames[];
	tags: string[];
	links: {
		view?: string;
		github?: {
			frontend: string;
			backend?: string;
		};
	};
}

export const Project = component$(({ index, name, img, icons, tags, links: { view, github } }: ProjectProps) => {
  const store = useContext(GlobalStore);

	return (
		<figure>
			<div>
				<img src={`/projects/${img}`} alt={name} loading={index > 1 ? "lazy" : "eager"} />
				<div class="link-container">
					{github?.frontend && (
						<a href={github.frontend} target="_blank">
							<GithubLogo />
							Frontend
						</a>
					)}
					{view && (
						<a href={view} target="_blank">
							<ComputerLogo />
							Visiter
						</a>
					)}
					{github?.backend && (
						<a href={github.backend} target="_blank">
							<GithubLogo />
							Backend
						</a>
					)}
				</div>
			</div>
			<figcaption>
				<h3>{name}</h3>
				<div class="tag-container">
					{tags.map((tag) => (
						<span key={tag} class="tag">
							{tag}
						</span>
					))}
				</div>
				<div class="icons-container">
					{icons.map((icon) => { 
            let fill ;
            const theme = store.theme;
            if (icon === "Electron") {
            if (theme === "light") fill = "#000000";
            if (theme === "dark" ||theme === "auto")  fill = "#ffffff" ;
        
            }
            let fillProps= {}
            if (fill) fillProps = {fill}
            return (
              //@ts-ignore tooltip
						<div tooltip={icon}>
							<Icon key={icon} name={icon}  {...fillProps} />
						</div>)})}
				</div>
			</figcaption>
		</figure>
	);
});

export default component$(({ selectedArraySignal }: { selectedArraySignal: Signal<string[]> }) => {
	useStyles$(styles);
	const filteredProject = useSignal(projects);

	useTask$(({ track }) => {
		track(() => selectedArraySignal.value);
		(() => {
			if (selectedArraySignal.value.length === 0) return (filteredProject.value = projects);
			filteredProject.value = projects.filter((project) => {
				const valuesGrouped = [...project.icons, ...project.tags];
				if (selectedArraySignal.value.reduce((acc, value) => acc && valuesGrouped.includes(value), true)) return true;
				return false;
			});
		})();
	});

	return (
		<section id="projects-section">
			{filteredProject.value.map((project, index) => (
				<Project key={project.img} index={index} {...project} />
			))}

			<div class={`other-project-container ${filteredProject.value.length % 2 === 0 ? "full-grid-column" : ""}`}>
				{filteredProject.value.length > 0 ? (
					<h3>Et d'autres projets entreprise ou particulier ...</h3>
				) : (
					<h3>Aucun projet ne correspond à vos filtres ...</h3>
				)}
			</div>
		</section>
	);
});
