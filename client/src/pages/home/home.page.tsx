import { Button } from "@material-ui/core";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "src/redux/root-reducer";
import { fetchGenresStart } from "src/redux/genre/genre.actions";

export interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
	const dispatch = useDispatch();

	const selectLoading = (state: RootState) => state.genre.loading;
	const loading = useSelector(selectLoading);

	React.useEffect(() => {
		console.log({ loading });
	}, [loading]);

	return (
		<Button
			variant="contained"
			color="primary"
			onClick={() => dispatch(fetchGenresStart())}
		>
			Dispatch!
		</Button>
	);
};

export default HomePage;
