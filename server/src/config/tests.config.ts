import { setupDatabase } from "../utils/tests.utils";

beforeEach(async () => {
	return await setupDatabase();
});
