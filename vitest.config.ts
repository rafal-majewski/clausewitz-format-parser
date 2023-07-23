import {defineConfig} from "vitest/config";

export default defineConfig({
	test: {
		include: ["**/*.test.ts"],
		coverage: {
			provider: "c8",
			reportsDirectory: "coverage-report",
			reporter: ["html", "text"],
		},
	},
});
