import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Profile } from "../profile/profile";
import { Square } from "../square/square";
import { ComputerLogo } from "../icons/computer";
import { ArticleLogo } from "../icons/article";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import styles from "./header.scss?inline";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
	useStylesScoped$(styles);

	return (
		<header>
			<Link href="/">
				<Profile />
			</Link>
			<nav>
				<ThemeToggle />
				<ul>
					<li>
						<a href="/projects">
							<Square>
								<ComputerLogo />
							</Square>
							Projets
						</a>
					</li>
					<li>
						<a href="/articles">
							<Square>
								<ArticleLogo />
							</Square>
							Articles
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
});