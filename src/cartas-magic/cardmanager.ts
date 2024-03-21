import { Carta } from "./carta.js"

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


class CardManager implements Manager {
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
   * Método que añade una carta al array de cartas
   * @param carta carta a añadir al array
   */
  addCard(carta: Carta): void {
    
  }

  /**
   * Método que elimina una carta del array de cartas
   * @param id id de la carta a eliminar
   */
  removeCard(id: number): void {
    
  }

  /**
   * Método que lista todas las cartas del array
   */
  listCards(): void {
    
  }

  /**
   * Método que muestra la información de una carta
   * @param id id de la carta a leer
   */
  readSpecificCard(id: number): void {
    
  }

  /**
   * Método que modifica la información de una carta
   * @param id id de la carta a modificar
   * @param params información a modificar de la carta
   */
  updateCard(id: number, params: Params): void {
    
  }


}