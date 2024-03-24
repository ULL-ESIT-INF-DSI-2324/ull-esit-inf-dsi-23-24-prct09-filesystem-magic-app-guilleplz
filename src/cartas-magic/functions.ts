import fs, { stat } from 'fs'
import * as Carta from './card.js'
import chalk from 'chalk';


/**
 * función para guardar la colección en el fichero
 * @param user usuario que posee la colección
 * @param cartas cartas que desea guardar
 */
export function SaveCard(user: string, cartas: Carta.Carta[]): void {
  const userDirectory = "./cartas/" + user;
  const fileName = userDirectory + "/" + user + ".json";
  fs.truncateSync(fileName, 0)
  fs.writeFileSync(fileName, JSON.stringify(cartas));
}

/**
 * Función para cargar las cartas de un usuario
 * @param user usuario que posee la colección
 * @returns cartas del usuario
 */
export function LoadCards(user: string): Carta.Carta[] {
  const userDirectory = "./cartas/" + user
  const fileName = userDirectory + "/" + user + ".json";
  
  // Comprobamos si existe el directorio del usuario
  if (!fs.existsSync(userDirectory)) {
    fs.mkdirSync(userDirectory, { recursive: true });
    fs.writeFileSync(fileName, JSON.stringify(""))
  }

  // sacamos las estadisticas del fichero
  const stats = fs.statSync(fileName);

  // si el fichero está vacío
  if (stats.size === 2) {
    
    // devolvemos un array vacío
    console.log(chalk.green("No se encontró colección, creando una nueva colección al usuario " + user));
    fs.writeFileSync(fileName, JSON.stringify([]));
    return []
    
  } else { // si el fichero tiene contenido creamos las cartas y devolvemos el array de cartas

    const jsoncontent = fs.readFileSync(fileName, 'utf-8');
    const jsoncards = JSON.parse(jsoncontent);
    
    const cards: Carta.Carta[] = jsoncards.map((carta: Carta.Carta) => ({
      ID: carta.ID,
      Name: carta.Name,
      ManaCost: carta.ManaCost,
      Color: carta.Color,
      TimeLine: carta.TimeLine,
      Rarity: carta.Rarity,
      Rules: carta.Rules,
      Strength: carta.Strength,
      Loyalty: carta.Loyalty,
      Value: carta.Value
    }));

    return cards;

  }
}

/**
 * Función que devuelve el index del enum Color
 * @param colorstring color de la carta
 * @returns index del enum Color
 */
export function GetColorValue(colorstring: string): number {
  const colorValue = colorstring.toLowerCase() as keyof typeof Carta.Color;
  return Carta.Color[colorValue];
}

/**
 * Función que devuelve el index del enum TimeLine
 * @param timelinestring linea temporal de la carta
 * @returns index del enum TimeLine
 */
export function GetTimeLineValue(timeline: string): number {
  const timelinevalue = timeline.toLowerCase() as keyof typeof Carta.TimeLine;
  return Carta.TimeLine[timelinevalue];
}

/**
 * Función que devuelve el index del enum Rarity
 * @param rarity rareza de la carta
 * @returns index del enum Rarity
 */
export function GetRarityValue(rarity: string): number {
  const rarityValue = rarity.toLowerCase() as keyof typeof Carta.Rarity;
  return Carta.Rarity[rarityValue];
}

/**
 * Función que crea una carta
 * @param argv argumentos de la carta
 * @returns carta
 */
export function CreateCard(argv: any): Carta.Carta {
  const { id, name, manacost, color, timeline, rarity, rules, strength, loyalty, value} = argv
  const cardcolor = GetColorValue(color);
  const cardTimeline = GetTimeLineValue(timeline);
  const cardRarity = GetRarityValue(rarity);

  if (cardTimeline == 6) {
    const micarta: Carta.Carta = {
      ID: id,
      Name: name,
      ManaCost: manacost,
      Color: cardcolor,
      TimeLine: cardTimeline,
      Rarity: cardRarity,
      Rules: rules,
      Value: value,
      Loyalty: loyalty,
      Strength: undefined
    }
    return micarta;

  } else if (cardTimeline == 1) {
    const micarta: Carta.Carta = {
      ID: id,
      Name: name,
      ManaCost: manacost,
      Color: cardcolor,
      TimeLine: cardTimeline,
      Rarity: cardRarity,
      Rules: rules,
      Value: value,
      Strength: strength as [number, number],
      Loyalty: undefined
    }
    return micarta;
    
  } else {
    const micarta: Carta.Carta = {
      ID: id,
      Name: name,
      ManaCost: manacost,
      Color: cardcolor,
      TimeLine: cardTimeline,
      Rarity: cardRarity,
      Rules: rules,
      Value: value,
      Strength: undefined,
      Loyalty: undefined
    }
    return micarta;
  }
}