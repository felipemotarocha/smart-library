import { FETCH_GENRES_START, GenreActionsTypes } from "./genre.actions.types";
import { GenreState } from "./genre.reducer.types";

const initialState: GenreState = {
	genres: null,
	genresWithBooks: null,
	loading: false,
};

const genreReducer = (
	state = initialState,
	action: GenreActionsTypes
): GenreState => {
	switch (action.type) {
		case FETCH_GENRES_START:
			return {
				...initialState,
				loading: true,
			};
		default:
			return state;
	}
};

export default genreReducer;
