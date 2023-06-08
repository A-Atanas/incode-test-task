import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import store from "./redux/store";
import { Provider } from "react-redux";

import App from "./App";

const inputPlaceholder = "repo-owner/repository-name";
const testRepositoryName = "facebook/react";

describe("App", () => {
	it("renders app", () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
	});
});

describe("Search input", () => {
	it("shows error for invalid GitHub repo and removes it after successful submit", async () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
		const input = screen.getByPlaceholderText(inputPlaceholder);
		const submitButton = screen.getByText("Get issues");
		fireEvent.change(input, { target: { value: "lkhgldisuhgiufdaha" } });
		fireEvent.click(submitButton);
		const errorIcon = await screen.findByLabelText("warning");
		expect(errorIcon).toBeInTheDocument();
		fireEvent.change(input, { target: { value: testRepositoryName } });
		fireEvent.submit(input);
		waitFor(() => expect(errorIcon).not.toBeInTheDocument());
	});
});

describe("Repository links", () => {
	it("are created after a successful request", async () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		const input = screen.getByPlaceholderText(inputPlaceholder);
		const submitButton = screen.getByText("Get issues");
		fireEvent.change(input, { target: { value: testRepositoryName } });
		fireEvent.click(submitButton);

		// This call has longer timeout because default 1000ms timeout is too quick to find nav links after a request
		const githubUserLink = await screen.findByText(
			"facebook",
			{},
			{ timeout: 2000 }
		);
		const githubRepoLink = await screen.findByText("react");
		expect(githubRepoLink).toBeInTheDocument();
		expect(githubUserLink).toBeInTheDocument();
	});
});
