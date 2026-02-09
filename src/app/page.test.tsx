import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";
import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing/react";

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      title
      is_completed
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_TODOS,
    },
    result: {
      data: {
        getTodos: [
          { id: 1, title: "First Task", is_completed: false },
          { id: 2, title: "Second Task", is_completed: true },
        ],
      },
    },
  },
];

describe("Home Page", () => {
  it("renders tasks from API", async () => {
    render(
      <MockedProvider mocks={mocks} >
        <Home />
      </MockedProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("First Task")).toBeInTheDocument();
      expect(screen.getByText("Second Task")).toBeInTheDocument();
    });
  });

  it("allows typing in the input", async () => {
    render(
      <MockedProvider mocks={mocks} >
        <Home />
      </MockedProvider>
    );

    const input = await screen.findByPlaceholderText("New task...");
    await userEvent.type(input, "Learn testing");

    expect(input).toHaveValue("Learn testing");
  });
});
