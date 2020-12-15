import { GenreWithBooksPopulated } from "src/types/genre.types";
import faker from "faker";

export const MOCKED_GENRES_WITH_BOOKS: GenreWithBooksPopulated[] = [
	{
		_id: faker.random.uuid(),
		name: faker.name.title(),
		displayName: faker.name.title(),
		books: [
			{
				_id: faker.random.uuid(),
				title: faker.name.title(),
				coverImageUrl: faker.image.imageUrl(),
				author: {
					_id: faker.random.uuid(),
					name: faker.name.firstName(),
				},
				genre: {
					_id: faker.random.uuid(),
					name: faker.name.title(),
					displayName: faker.name.title(),
				},
			},
		],
	},
];
