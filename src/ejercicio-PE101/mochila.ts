import * as fs from 'fs';
import Elemento from './elemento.js';

/**
 * Clase que representa una mochila.
 */
class Mochila {

  /**
   * Hook que se ejecuta antes de procesar el archivo.
   */
  private beforeHook?: () => void;
  /**
   * Hook que se ejecuta después de procesar el archivo.
   */
  private afterHook?: () => void;


  /**
   * Establece un hook que se ejecutará antes de procesar el archivo.
   * @param hook Hook que se ejecutará antes de procesar el archivo.
   */
  setBeforeHook(hook: () => void) {
    this.beforeHook = hook;
  }

  /**
   * Establece un hook que se ejecutará después de procesar el archivo.
   * @param hook Hook que se ejecutará después de procesar el archivo.
   */
  setAfterHook(hook: () => void) {
    this.afterHook = hook;
  }

  /**
   * Procesa un archivo y extrae los beneficios y pesos de los elementos.
   * @param filePath Ruta del archivo a procesar.
   * @returns Un arreglo con los beneficios y pesos de los elementos.
   */
  async procesar(filePath: string): Promise<[number[], number[]]> {
    if (this.beforeHook) {
      this.beforeHook();
    }

    const data = await this.leerArchivo(filePath);

    if (this.afterHook) {
      this.afterHook();
    }

    return this.extraerDatos(data);
  }

  /**
   * Lee un archivo y retorna su contenido.
   * @param filePath Ruta del archivo a leer.
   * @returns 
   */
  private async leerArchivo(filePath: string): Promise<Elemento[] | { capacidad: number; elementos: Elemento[] }> {
    const rawData = await fs.promises.readFile(filePath, 'utf-8');
    if (filePath.endsWith('.json')) {
      return JSON.parse(rawData);
    } else if (filePath.endsWith('.csv')) {
      return this.parseCSV(rawData);
    } else {
      throw new Error('Formato de archivo no compatible');
    }
  }

  /**
   * Parsea un archivo CSV y extrae la capacidad y los elementos.
   * @param data Contenido del archivo CSV.
   * @returns Un objeto con la capacidad y los elementos.
   */
  private parseCSV(data: string): { capacidad: number; elementos: Elemento[] } {
    const lines = data.trim().split('\n');
    const capacidad = parseInt(lines[0].trim());
    const numElementos = parseInt(lines[1].trim());
    const elementos: Elemento[] = [];

    for (let i = 2; i < lines.length; i++) {
      const [numElemento, peso, beneficio] = lines[i].trim().split(',').map(Number);
      elementos.push({ numElemento, peso, beneficio });
    }

    return { capacidad, elementos };
  }

  /**
   * Extrae los beneficios y pesos de los elementos.
   * @param data Datos a extraer.
   * @returns Un arreglo con los beneficios y pesos de los elementos.
   */
  private extraerDatos(data: Elemento[] | { capacidad: number; elementos: Elemento[] }): [number[], number[]] {
    const beneficios: number[] = [];
    const pesos: number[] = [];

    if ('capacidad' in data) {
      for (const elemento of data.elementos) {
        beneficios.push(elemento.beneficio);
        pesos.push(elemento.peso);
      }
    }
    return [beneficios, pesos];
  }

}

export default Mochila;