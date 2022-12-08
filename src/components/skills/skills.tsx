import { $, component$, useClientEffect$, useOnWindow, useSignal, useStore, useStylesScoped$ } from "@builder.io/qwik";
import { Triangle } from "../icons/triangle";

import styles from "./skills.scss?inline";
import projects from "../projects/projects.json";

export default component$(() => {
	useStylesScoped$(styles);
	const triangle = {
		gap: 10,
		height: 80,
		width: 80 * 1.84,
	};

	const getSkillsFromProjects = (projects: any) => {
		let skills: string[] = [];
		for (const project of projects) {
			skills = [...skills, ...project.tags, ...project.icons];
		}
		const skillsToRemove = ["Backend", "Javascript", "OpenClassRooms"];
		return [...new Set(skills)].filter((skill) => !skillsToRemove.includes(skill));
	};

	const skillsContainerRef = useSignal<any>();
	const store = useStore({ containerWidth: 0, skills: getSkillsFromProjects(projects) });

	let currentCalcWidth = 0;
	let maxTrianglesPerRowTop = 0;
	let maxTrianglesPerRowBottom = 0;
	while (currentCalcWidth <= store.containerWidth) {
		currentCalcWidth += triangle.width;
		if (currentCalcWidth <= store.containerWidth) {
			if (currentCalcWidth + (triangle.width / 2 + triangle.gap / 2) <= store.containerWidth)
				maxTrianglesPerRowBottom++;
			currentCalcWidth += triangle.gap;
			maxTrianglesPerRowTop++;
		}
	}

	let numbersOfSkills = store.skills.length;
	let numberRowTop = Math.ceil(numbersOfSkills / 2);
	let numberRowBottom = Math.floor(numbersOfSkills / 2);
	if (maxTrianglesPerRowTop + maxTrianglesPerRowBottom <= numbersOfSkills && store.containerWidth > 0) {
		numberRowTop = 0;
		numberRowBottom = 0;
		while (numbersOfSkills > 0) {
			if (numbersOfSkills >= maxTrianglesPerRowTop) {
				numbersOfSkills -= maxTrianglesPerRowTop;
				numberRowTop += maxTrianglesPerRowTop;
			} else {
				numberRowTop += numbersOfSkills;
				numbersOfSkills = 0;
			}
			if (numbersOfSkills >= maxTrianglesPerRowBottom) {
				numbersOfSkills -= maxTrianglesPerRowBottom;
				numberRowBottom += maxTrianglesPerRowBottom;
			} else {
				numberRowBottom += numbersOfSkills;
				numbersOfSkills = 0;
			}
		}
	}
	const trianglesTopGridArray = Array(numberRowTop)
		.fill(0)
		.map((val, i) => store.skills[i]);
	const trianglesBottomGridArray = Array(numberRowBottom)
		.fill(0)
		.map((val, i) => store.skills[i + numberRowTop]);

	useOnWindow(
		"resize",
		$(() => {
			store.containerWidth = skillsContainerRef.value.clientWidth;
		})
	);
	useClientEffect$(() => {
		store.containerWidth = skillsContainerRef.value.clientWidth;
	});
	return (
		<section id="skills-container" ref={skillsContainerRef}>
			<div class="grid-triangles top">
				{trianglesTopGridArray.map((val) => (
					<div key={val}>
						<span>{val}</span>
						<Triangle />
					</div>
				))}
			</div>
			<div class="grid-triangles bottom">
				{trianglesBottomGridArray.map((val) => (
					<div key={val}>
						<span>{val}</span>
						<Triangle />
					</div>
				))}
			</div>
		</section>
	);
});
