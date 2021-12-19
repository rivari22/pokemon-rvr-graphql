export type NameTypes = "grass" | "poison" | "fire" | "water" | "bug" | "electric";

export interface IDetailPokemon {
  id: number;
  name: string;
  order: number;
  types: Array<{
    type: {
      name: NameTypes;
    };
  }>;
  sprites: {
    front_default: string;
  };
  species: {
    name: string;
    url: string;
  };
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}