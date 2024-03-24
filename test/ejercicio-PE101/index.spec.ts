import { expect } from 'chai';
import Mochila from '../../src/ejercicio-PE101/mochila.js';

describe('Mochila', () => {

  it('Debería procesar un archivo .csv', async () => {
    const mochila = new Mochila();

    mochila.setBeforeHook(() => console.log('Leyendo archivo ejemplocsv.csv...'));
    mochila.setAfterHook(() => console.log('Archivo leído correctamente.'));

    const [beneficios, pesos] = await mochila.procesar('./ficheros_pruebas/ejemplocsv.csv');

    expect(beneficios).to.eql([10, 20, 30]);
    expect(pesos).to.eql([5, 10, 15]);
  });

  it('Debería procesar un archivo .json', async () => {
    const mochila = new Mochila();

    mochila.setBeforeHook(() => console.log('Leyendo archivo ejmplo.json...'));
    mochila.setAfterHook(() => console.log('Archivo leído correctamente.'));

    const [beneficios, pesos] = await mochila.procesar('./ficheros_pruebas/ejemplo.json');

    expect(beneficios).to.eql([10, 20, 30]);
    expect(pesos).to.eql([5, 10, 15]);
  });
  
  // it('Debería mandar un error al procesar el archivo con .txt', async () => {
  //   const mochila = new Mochila();
  //   try {
  //     await mochila.procesar('ejemplo.txt');
  //   } catch (error) {
  //     expect(error.message).to.eql('Formato de archivo no compatible');
  //   }
  // });
});