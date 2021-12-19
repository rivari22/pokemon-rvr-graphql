import React from "react";
import { render, screen } from "@testing-library/react";
import MyPokemon from "../pages/my-pokemon";
import { CardList } from "../components/Card";
import { cardListMyPokemon } from "./mocks/cardListMock";

const renderMyPokemon = () => render(<MyPokemon />);
const renderCardList = () => render(<CardList {...cardListMyPokemon} />);

describe("My pokemon screen should correct render", () => {
  it("renders a title", () => {
    renderMyPokemon();
    const title = screen.getByTestId("title");

    expect(title).toBeTruthy();
  });

  it("render bottom tab", () => {
    renderMyPokemon();
    const element = screen.getByText("Pokemon World");
    expect(element).toBeTruthy();
  });
});

describe("should render all pokemon in my pokemon", () => {
  it("render card list", () => {
    renderCardList();
    const name = screen.getByText("test1");
    const nickname = screen.getByText("rivari");

    expect(name).toBeTruthy();
    expect(nickname).toBeTruthy();
  });
});
