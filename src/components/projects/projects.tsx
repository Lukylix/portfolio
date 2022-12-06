import { component$, useStyles$ } from "@builder.io/qwik";
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
		view: string;
		github?: {
			frontend: string;
			backend?: string;
		};
	};
}

export const Project = component$(({ index, name, img, icons, tags, links: { view, github } }: ProjectProps) => {
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
						<a href={view}>
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
					{icons.map((icon) => (
						//@ts-ignore tooltip
						<div tooltip={icon}>
							<Icon key={icon} name={icon} />
						</div>
					))}
				</div>
			</figcaption>
		</figure>
	);
});

export default component$(() => {
	useStyles$(styles);
	return (
		<section id="projects-section">
			{projects.map((project, index) => (
				<Project key={project.img} index={index} {...project} />
			))}
			<div class={`other-project-container ${projects.length % 2 === 0 ? "full-grid-column" : ""}`}>
				<h3>Et d'autres projets entreprise ou particulier ...</h3>
			</div>
		</section>
	);
});
