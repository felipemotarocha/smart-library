import { Genre, GenreWithBooksPopulated } from "src/types/genre.types";

export interface GenreState {
	genres: Genre[] | null;
	genresWithBooks: GenreWithBooksPopulated[] | null;
	loading: boolean;
}
