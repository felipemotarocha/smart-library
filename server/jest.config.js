module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	setupFilesAfterEnv: ["<rootDir>/src/config/tests.config.ts"],
};
