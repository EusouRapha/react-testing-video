import { render, screen, fireEvent, getByText } from "@testing-library/react";
import App from "./App";

const sum = (x: number, y: number) => {
  return x + y;
};

//ISSO É JEST, ele não é feito pra testar documentos, porem com testes unitarios
describe("App Component", () => {
  it("should sum correctly", () => {
    expect(sum(4, 4)).toBe(8);
  });

  it("should render App with hello message", () => {
    render(<App></App>);

    screen.getByText("Hello world!");
  });

  it("should change message on button click", () => {
    render(<App></App>);

    screen.getByText("Let's learn more about testing in React"); //se ele nao acha o texto, falha o teste

    const button = screen.getByText(/change message/i);

    fireEvent.click(button);

    screen.getByText(/new message!/i);

    const oldMessage = screen.queryByText(
      "Let's learn more about testing in React"
    ); //queryByText: quando ela nao acha o que é passado, ela nao falha o teste : quando acha, ela falha

    expect(oldMessage).not.toBeInTheDocument();
  });
});

export default {};
