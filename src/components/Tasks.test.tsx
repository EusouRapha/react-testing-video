import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Tasks } from "./Tasks";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("Tasks Component", () => {
  //testando chamada de api
  const worker = setupServer(
    rest.get(
      "https://jsonplaceholder.typicode.com/todos",
      async (req, res, ctx) => {
        return res(
          ctx.json([
            {
              userId: 1,
              id: 1,
              title: "delectus aut autem",
              completed: false,
            },
          ])
        );
      }
    )
  );

  //Executa uma função antes de qualquer um dos testes neste arquivo ser executado.
  beforeAll(() => {
    worker.listen();
  });

  // Executa uma função antes que cada um dos testes neste arquivo seja executado
  beforeEach(() => {
    worker.resetHandlers();
  });

  it("should fetch and show tasks on button click", async () => {
    render(<Tasks></Tasks>);

    const button = screen.getByText(/get tasks from api/i);

    fireEvent.click(button);

    await screen.findByText("delectus aut autem"); //ele é igual o getByText, mas ele funciona com funções assincronas
  });

  it("should show error message on fetch error", async () => {
    worker.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/todos",
        async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: "error happened" }));
        }
      )
    );

    render(<Tasks></Tasks>);

    const button = screen.getByText(/get tasks from api/i);

    fireEvent.click(button);

    await screen.findByText("Request failed with status code 500");
  });
});
