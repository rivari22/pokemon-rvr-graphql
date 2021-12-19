import React from "react";
import { render, screen } from "@testing-library/react";
import MyPokemon from "../pages/my-pokemon";

const renderMyPokemon = () => render(<MyPokemon />);

describe("My pokemon screen should correct render", () => {
  it("renders a title", () => {
    renderMyPokemon();
    const title = screen.getByTestId("titleMyPokemon");

    expect(title).toBeTruthy();
  });

  it("render bottom tab", () => {
    renderMyPokemon();
    const element = screen.getByText("Pokemon World");
    expect(element).toBeTruthy();
  });
});
