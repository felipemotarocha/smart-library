import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "src/redux/root.reducer";
import { fetchGenresWithBooksStart } from "src/redux/genre/genre.actions";
import GenrePreview from "src/components/genre-preview/genre-preview.component";

export interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
	const dispatch = useDispatch();

	const selectGenreReducer = (state: RootState) => state.genre;
	const { genresWithBooks } = useSelector(selectGenreReducer);

	useEffect(() => {
		dispatch(fetchGenresWithBooksStart());
	}, [dispatch]);

	return (
		<>
			{genresWithBooks?.map((genre) => (
				<GenrePreview genre={genre} />
			))}
		</>
	);
};

export default HomePage;
