import * as React from "react";
import { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "src/redux/root.reducer";
import { fetchGenresWithBooksStart } from "src/redux/genre/genre.actions";

export interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
	const dispatch = useDispatch();

	const selectGenreReducer = (state: RootState) => state.genre;
	const { genresWithBooks } = useSelector(selectGenreReducer);

	useEffect(() => {
		console.log({ genresWithBooks });
	}, [genresWithBooks]);

	return (
		<Button
			variant="contained"
			color="primary"
			onClick={() => dispatch(fetchGenresWithBooksStart())}
		>
			Dispatch!
		</Button>
	);
};

export default HomePage;
