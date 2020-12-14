import styled from "styled-components";

type CoverImageProps = {
	src: string;
};

export const BookItemContainer = styled.div`
	height: 380px;
	width: 259px;
	position: relative;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	border-radius: 5px;

	&:nth-child(even) {
		margin: 0 1.5rem;
	}
`;

export const CoverImage = styled.div<CoverImageProps>`
	position: absolute;
	top: 0;
	height: 100%;
	width: 100%;
	background: url(${({ src }) => src}) center center/cover;
	border-radius: 5px;
	background-color: none;
	background-blend-mode: color;
	transition: all 0.5s ease;

	&:hover {
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.6);
		background-blend-mode: color;
	}
`;
