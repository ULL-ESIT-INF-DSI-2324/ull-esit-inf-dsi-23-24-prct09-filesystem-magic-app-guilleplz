import { Carta, Color, Rarity, TimeLine } from "./card.js"
import chalk from "chalk";
import * as Functions from './functions.js'
import { argv } from "process";

// tipo que define un array de parámetros que pueden ser numéricos o string
type Params = (number | string)[];

/**
 * Interfaz que define los métodos que implementará la clase CardManager
 */
interface Manager {
  addCard(carta: Carta): void;
  removeCard(id: number): void;
  updateCard(id: number, params: Params): void;
  listCards(): void;
  readSpecificCard(id: number): void;
}


export class CardManager implements Manager {
  // atributo cartas --> array de cartas
  private cartas: Carta[];

  /**
   * Constructor de la clase, tiene un array de cartas que se inicia con las cartas en la base de datos
   * @param cartasinbd array de cartas sacadas de la base de datos
   */
  constructor(cartasinbd: Carta[]) {
    this.cartas = cartasinbd;
  }

  /**
   * Getter del array de cartas
   * @returns array de cartas
   */
  GetCards(): Carta[] {
    return this.cartas;
  }

  /**
   * Método que añade una carta al array de cartas
   * @param carta carta a añadir al array
   */
  addCard(carta: Carta): void {
    if (this.cartas.find((cardinbd: Carta) => cardinbd.ID === carta.ID )) {
      throw new Error("La carta ya existe en la base de datos.");
    } else {
      this.cartas.push(carta)
    }
  }

  /**
   * Método que elimina una carta del array de cartas
   * @param id id de la carta a eliminar
   */
  removeCard(id: number): void {
    const index = this.cartas.findIndex((carta) => carta.ID === id);
    // si la carta no está en el array
    if (index == -1) {
      throw new Error("no se ha encontrado la carta")
    }

    this.cartas.splice(index, 1)
  }

  /**
   * Método que lista todas las cartas del array
   */
  listCards(): void {
    // para cada una de las cartas
    this.cartas.forEach((carta, index) => {
      console.log("\n------------------" + index + "--------------------\n");
      this.PrintCardInfo(carta);
    })
  }

  /**
   * Método que muestra la información de una carta
   * @param id id de la carta a leer
   */
  readSpecificCard(id: number): void {
    const index = this.cartas.findIndex((carta) => carta.ID === id);
    // si la carta no está en el array
    if (index == -1) {
      throw new Error("no se ha encontrado la carta")
    }

    this.PrintCardInfo(this.cartas[index]);
    
  }

  /**
   * Método que modifica la información de una carta
   * @param id id de la carta a modificar
   * @param params información a modificar de la carta
   */
  updateCard(argstochange: any): void {
    const index = this.cartas.findIndex((carta) => carta.ID === argstochange.id);
    // si la carta no está en el array
    if (index == -1) {
      throw new Error("no se ha encontrado la carta")
    }

    if (argstochange.name) this.cartas[index].Name = argstochange.name;
    if (argstochange.manacost) this.cartas[index].ManaCost = argstochange.manacost;
    if (argstochange.color) this.cartas[index].Color = Functions.GetColorValue(argstochange.color);
    if (argstochange.timeline) this.cartas[index].TimeLine = Functions.GetTimeLineValue(argstochange.timeline);
    if (argstochange.rarity) this.cartas[index].Rarity = Functions.GetRarityValue(argstochange.rarity);
    if (argstochange.rules) this.cartas[index].Rules = argstochange.rules;
    if (argstochange.value) this.cartas[index].Value = argstochange.value;
    if (argstochange.strength) this.cartas[index].Strength = argstochange.strength;
    if (argstochange.loyalty) this.cartas[index].Loyalty = argstochange.loyalty;
    
  }

  PrintCardInfo(card: Carta): void {
    console.log("ID: " + card.ID);
      console.log("Nombre: " + card.Name);
      console.log("Coste de mana: " + card.ManaCost);
      // diferencio entre coloress
      switch (card.Color) {
        case Color.blanco:
          console.log("Color: " + chalk.white("blanco"));
          break;
        case Color.azul:
          console.log("Color: " + chalk.blue("azul"));
          break;
        case Color.negro:
          console.log("Color: " + chalk.black("negro"));
          break;
        case Color.rojo:
          console.log("Color: " + chalk.red("rojo"));
          break;
        case Color.verde:
          console.log("Color: " + chalk.green("verde"));
          break;
        case Color.incoloro:
          console.log("Color: " + chalk.white("incoloro"));
          break;
        case Color.multicolor:
          console.log("Color: " + chalk.red("mu") + chalk.green("lti") + chalk.blue("col") + chalk.yellow("or"));
          break;
      }
      
      // diferencio entre las lineas de tiempo
      switch (card.TimeLine) {
        case 0:
          console.log("Linea de tiempo: tierra");
          break;
        case 1:
          console.log("Linea de tiempo: criatura");
          break;
        case 2:
          console.log("Linea de tiempo: encantamiento");
          break;
        case 3:
          console.log("Linea de tiempo: conjuro");
          break;
        case 4:
          console.log("Linea de tiempo: instantáneo");
          break;
        case 5:
          console.log("Linea de tiempo: artefacto");
          break;
        case 6:
          console.log("Linea de tiempo: planeswalker");
          break;
      }

      // diferencio entre las rarezas
      switch (card.Rarity) {
        case 0:
          console.log("Rareza: común");
          break;
        case 1:
          console.log("Rareza: infrecuente");
          break;
        case 2:
          console.log("Rareza: rara");
          break;
        case 3:
          console.log("Rareza: mítica");
          break;
        case 4:
          console.log("Rareza: legendaria");
          break;
      }
      console.log("Reglas: " + card.Rules);
      console.log("Fuerza / resistencia: " + (card.Strength || "No aplica"));
      console.log("Lealtad: " + (card.Loyalty || "No aplica"));
      console.log("Valor de mercado: " + card.Value);

  }

}