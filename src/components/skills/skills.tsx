import {
	$,
	component$,
	useStore,
	useStylesScoped$,
	Signal,
	QwikChangeEvent,
	useOnWindow,
	useVisibleTask$,
} from "@builder.io/qwik";
import { Triangle } from "../icons/triangle";

import styles from "./skills.scss?inline";
import projects from "../projects/projects.json";

export const calcRows = (skills: string[], windowWidth: number) => {
	const breakPointsTopRow = {
		default: 7,
		768: 4,
		425: 3,
	};
	type breakPointsKey = keyof typeof breakPointsTopRow;
	const { default: defaultBreakPoint, ...restBreakPoints } = breakPointsTopRow;
	const trianglesTop =
		windowWidth > 0
			? Object.keys(restBreakPoints)
					.sort((a, b) => Number(b) - Number(a))
					.reduce(
						(acc, breakPoint) =>
							windowWidth <= Number(breakPoint) ? breakPointsTopRow[breakPoint as breakPointsKey] : acc,
						defaultBreakPoint
					)
			: breakPointsTopRow.default;
	const trianglesBottom = trianglesTop - 1;

	const fullLines = Math.floor(skills.length / (trianglesTop + trianglesBottom));
	const restLine = skills.length % (trianglesTop + trianglesBottom);
	const restTop = restLine > 0 ? Math.ceil(restLine / 2) : 0;
	const restBottom = restLine > 0 ? restLine - restTop : 0;

	const skillsCopy = [...skills];
	let rowsTop: string[] = [];
	let rowsBottom: string[] = [];
	for (let i = 0; i < fullLines; i++) {
		rowsTop = [...rowsTop, ...skillsCopy.splice(0, trianglesTop)];
		rowsBottom = [...rowsBottom, ...skillsCopy.splice(0, trianglesBottom)];
	}
	const ghostToAddTop = restTop > 0 ? Math.floor((trianglesTop - restTop) / 2) : 0;
	rowsTop = [...rowsTop, ...Array(ghostToAddTop).fill("ghost")];
	rowsTop = [...rowsTop, ...skillsCopy.splice(0, restTop)];
	const ghostToAddBottom = restBottom > 0 ? Math.floor((trianglesBottom - restBottom) / 2) : 0;
	rowsBottom = [...rowsBottom, ...Array(ghostToAddBottom).fill("ghost")];
	rowsBottom = [...rowsBottom, ...skillsCopy.splice(0, restBottom)];

	return { rowsTop, rowsBottom };
};

export const getSkillsFromProjects = (projects: any) => {
	let skills: string[] = [];
	for (const project of projects) {
		skills = [...skills, ...project.tags, ...project.icons];
	}
	const skillsToRemove = ["Backend", "Javascript", "OpenClassRooms"];
	return [...new Set(skills)].filter((skill) => !skillsToRemove.includes(skill));
};

export default component$(({ selectedSignal = { value: [] } }: { selectedSignal?: Signal<string[]> }) => {
	useStylesScoped$(styles);

	const store = useStore({
		skills: getSkillsFromProjects(projects),
		windowWidth: 0,
	});

	const { rowsTop, rowsBottom } = calcRows(store.skills, store.windowWidth);

	useOnWindow(
		"resize",
		$(() => {
			store.windowWidth = window.outerWidth;
		})
	);

	useVisibleTask$(
		() => {
			store.windowWidth = window.outerWidth;
		},
		{ strategy: 'document-ready' }
	);

	const onSelect = $((event: QwikChangeEvent<HTMLInputElement>, value: string) => {
		if (event.target.checked) return (selectedSignal.value = [...selectedSignal.value, value]);
		selectedSignal.value = selectedSignal.value.filter((val) => val !== value);
	});

	const TriangleSelect = ({ value }: { value: string }) => {
		return (
			<>
				<input type="checkbox" id={value} onChange$={(event) => onSelect(event, value)} />
				<div class="card">
					<div class="card__inner">
						<div class="card__front">
							<Triangle />
							<span>{value}</span>
						</div>
						<div class="card__back">
							<Triangle />
							<span>{value}</span>
						</div>
					</div>
					<label for={value} />
				</div>
			</>
		);
	};

	return (
		<>
			<h2>Filtrer :</h2>
			<section id="skills-container">
				<div class="grid-triangles top">
					{rowsTop.map((value) => (
						<>{value === "ghost" ? <div></div> : <TriangleSelect value={value} />}</>
					))}
				</div>
				<div class="grid-triangles bottom">
					{rowsBottom.map((value) => (
						<>{value === "ghost" ? <div></div> : <TriangleSelect value={value} />}</>
					))}
				</div>
			</section>
		</>
	);
});
