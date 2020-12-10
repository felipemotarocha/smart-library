declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			MONGODB_DATABASE_PASSOWRD?: string;
			PORT?: string;
		}
	}
}

export {};
