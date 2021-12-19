import React from 'react'
import { render, screen } from '@testing-library/react'
import MyPokemon from '../pages/my-pokemon'

describe('My pokemon screen should correct render', () => {
  it('renders a title', () => {
    render(<MyPokemon />);

    const title = screen.getByTestId("title");

    expect(title).toBeTruthy();
  })
});
