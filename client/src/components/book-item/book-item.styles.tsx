import styled from "styled-components";

type CoverImageProps = {
	src: string;
};

export const BookItemContainer = styled.div`
	height: 250px;
	width: 180px;
	position: relative;
`;

export const CoverImage = styled.div<CoverImageProps>`
	position: absolute;
	top: 0;
	height: 100%;
	width: 100%;
	background: url(${({ src }) => src}) center center/cover;
`;
