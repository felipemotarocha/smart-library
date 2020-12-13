import { FETCH_GENRES_START, GenreActionsTypes } from "./genre.actions.types";

export const fetchGenresStart = (): GenreActionsTypes => {
	return {
		type: FETCH_GENRES_START,
	};
};
