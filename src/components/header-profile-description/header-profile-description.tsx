import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Square } from "../square/square";
import { ArticleLogo } from "../icons/article";
import { ComputerLogo } from "../icons/computer";
import { GithubLogo } from "../icons/github";
import { Profile } from "../profile/profile";

import styles from "./header-profile-description.scss?inline";
import { LinkedinLogo } from "../icons/linkedin";

export const HeaderProfileDescription = component$(() => {
	useStylesScoped$(styles);
	return (
		<section>
			<header>
				<Profile borderSize="large" />
				<div>
					<h1>Lucas</h1>
					<h2>Développeur Javascript</h2>
				</div>
			</header>
			<p>
				Bienvenue sur mon portfolio.
				<br />
				Je vous invite à parcourir mes divers projets et articles tous centrés sur le développement bien entendu ! Cela
				vous permettra d'avoir un aperçu de mes compétences.
			</p>

			<a href="#">
				Projets
				<Square>
					<ComputerLogo />
				</Square>
			</a>
			<a href="#">
				Articles
				<Square>
					<ArticleLogo />
				</Square>
			</a>
			<a href="https://github.com/Lukylix" target="_blank">
				Github
				<Square>
					<GithubLogo />
				</Square>
			</a>
			<a href="https://www.linkedin.com/in/lucasgarcia30/" target="_blank">
				LinkedIn
				<Square>
					<LinkedinLogo />
				</Square>
			</a>
		</section>
	);
});
