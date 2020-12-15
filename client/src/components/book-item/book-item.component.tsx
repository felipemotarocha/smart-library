import { Button } from "@material-ui/core";
import * as React from "react";

import { Book } from "src/types/book.types";
import { BookItemContainer, CoverImage } from "./book-item.styles";

export interface BookItemProps {
	book: Book;
}

const BookItem: React.FunctionComponent<BookItemProps> = ({ book }) => {
	return (
		<BookItemContainer>
			<CoverImage src={book.coverImageUrl} />
			<Button variant="contained" color="primary">
				View Details
			</Button>
		</BookItemContainer>
	);
};

export default BookItem;
