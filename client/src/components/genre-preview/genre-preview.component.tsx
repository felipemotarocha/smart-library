import * as React from "react";
import { GenreWithBooksPopulated } from "src/types/genre.types";
import BookItem from "../book-item/book-item.component";
import { Books, Container } from "./genre-preview.styles";

export interface GenrePreviewProps {
	genre: GenreWithBooksPopulated;
}

const GenrePreview: React.FunctionComponent<GenrePreviewProps> = ({
	genre,
}) => {
	return (
		<Container>
			<h2>{genre.displayName}</h2>
			<Books>
				{genre.books.map((book) => (
					<BookItem book={book} />
				))}
			</Books>
		</Container>
	);
};

export default GenrePreview;
