
export enum Color {
  blanco,
  azul,
  negro,
  rojo,
  verde,
  incoloro,
  multicolor
}

export enum TimeLine {
  tierra,
  criatura,
  encantamiento,
  conjuro,
  instantaneo,
  Artefacto,
  Planeswalker
}

export enum Rarity {
  comun,
  infrecuente,
  rara,
  mitica,
  legendaria
}

export type Strength = [number, number];

export type Carta = {
  ID: number;
  Name: string;
  ManaCost: number;
  Color: Color;
  TimeLine: TimeLine;
  Rarity: Rarity;
  Rules: string;
  Strength: Strength;
  Loyalty: number;
  Value: number;
};