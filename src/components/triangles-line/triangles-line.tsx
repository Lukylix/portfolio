import { component$, useClientEffect$, useStore, useStyles$ } from "@builder.io/qwik";
import { Triangle } from "../icons/triangle";

import styles from "./triangles-line.scss?inline";

interface TrianglesLineProps {
	height: string;
	width: string;
}

export const TrianglesLine = component$(({ height, width }: TrianglesLineProps) => {
	useStyles$(styles);

	const params = {
		triangles: 60,
		minHeight: 20,
		maxHeight: 80,
		minOpacity: 30,
		maxOpacity: 100,
		centerOffset: 30,
		animationDuration: [5, 10],
		centerPortion: {
			lengthPercent: 60,
			populatePercent: 75,
		},
	};

	const state: { triangles: any[] } = useStore({ triangles: [] });

	useClientEffect$(
		() => {
			const randomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
			const intWidth = Number(width.replace(/px$/, ""));
			const intHeight = Number(height.replace(/px$/, ""));
			const halfWidth = intWidth / 2;
			const halfHeight = intHeight / 2;

			const stepsCenter =
				params.triangles * params.centerPortion.populatePercent * params.centerPortion.lengthPercent * 0.01 * 0.01;
			const stepsSide = params.triangles - stepsCenter;
			const sequenceStepCenter = (intWidth * (0.01 * params.centerPortion.lengthPercent)) / stepsCenter;
			const sequenceStepSide = (intWidth * (1 - 0.01 * params.centerPortion.lengthPercent)) / stepsSide;

			let previousPos = 0;
			const isSideStep = (index: number) => index < stepsSide / 2 || index > stepsSide / 2 + stepsCenter;

			const sequencePositions = Array(params.triangles)
				.fill(0)
				.map(
					(element, index: number) =>
						(previousPos += Math.floor(isSideStep(index) ? sequenceStepSide : sequenceStepCenter))
				);

			const trianglesToRender = [];
			for (const position of sequencePositions) {
				const side = position - halfWidth < 0 ? "left" : "right";
				const horizontalOffset = side === "left" ? position : intWidth - position;
				const percentFromMidle = horizontalOffset / halfWidth;

				const modifier =
					percentFromMidle < 1 - params.centerPortion.lengthPercent * 0.01
						? percentFromMidle * (1 + params.centerPortion.lengthPercent * 0.01)
						: 1;
				const size = randomInteger(params.minHeight, Math.floor(params.maxHeight * modifier));

				//Prevent drawing triangles not visible
				const windowWidth = window.innerWidth;
				const sideSizeToRemove = (intWidth - windowWidth) / 2 - size;
				if (windowWidth < intWidth && horizontalOffset < sideSizeToRemove) continue;

				const opacity = `0.${randomInteger(params.minOpacity, Math.floor(params.maxOpacity * modifier))}`;
				const verticalSide = randomInteger(0, 1) ? "top" : "bottom";
				const verticalOffset =
					randomInteger(
						halfHeight - params.centerOffset * modifier * 1.2,
						halfHeight + params.centerOffset * modifier * 1.2
					) - Math.floor(size / 2);

				const shouldFullRotation = modifier < 0.9 ? true : randomInteger(0, 100) < 40;
				const rotation = `${
					shouldFullRotation
						? randomInteger(0, 360)
						: randomInteger(0, 1)
						? randomInteger(-35, 35)
						: randomInteger(145, 215)
				}deg`;
				const animationTypes = ["scale", "rotate", "scale-rotate", "rotate-counter", "scale-rotate-counter"];
				const animation = animationTypes[randomInteger(0, animationTypes.length - 1)];
				trianglesToRender.push({
					style: {
						[side]: horizontalOffset,
						[verticalSide]: verticalOffset,
						opacity,
						rotate: rotation,
						animationName: animation,
						animationDuration: `${randomInteger(params.animationDuration[0], params.animationDuration[1])}s`,
					},
					height: `${size}px`,
				});
			}
			state.triangles = trianglesToRender;
		},
		{ eagerness: "load" }
	);

	return (
		<div class="triangles-overflow">
			<div class="triangles-container" style={{ height, width }}>
				{state.triangles.map((triangle, i) => (
					<Triangle key={i} {...triangle} />
				))}
			</div>
		</div>
	);
});
