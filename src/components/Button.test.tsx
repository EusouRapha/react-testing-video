import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("should render with red background if desabled", () => {
    render(
      <Button disabled={false} onClick={() => {}}>
        Click me
      </Button>
    );

    const button = screen.getByRole("button", { name: "Click me" }); //uma nova forma de verificar texto

    expect(button).toHaveStyle({ backgroundColor: "blue" }); //verificando estilo
  });
  it("it should call onClick prop on Click", () => {
    const onClick = jest.fn(); //faz com que o onclick seja considerado função no jest

    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>
    );

    const button = screen.getByText(/click me/i); //verificando o texto do botao
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledWith();
  });
});
