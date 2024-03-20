import Mochila from './mochila.js';

async function main() {
  try {
    const mochila1 = new Mochila();
    
    mochila1.setBeforeHook(() => console.log('Leyendo archivo ejemplocsv.csv...'));
    mochila1.setAfterHook(() => console.log('Archivo leído correctamente.'));

    const [beneficios, pesos] = await mochila1.procesar('ejemplocsv.csv');

    console.log('Beneficios:', beneficios);
    console.log('Pesos:', pesos);
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
  }
  try {
    const mochila2 = new Mochila();
    
    mochila2.setBeforeHook(() => console.log('Leyendo archivo ejmplo.json...'));
    mochila2.setAfterHook(() => console.log('Archivo leído correctamente.'));

    const [beneficios, pesos] = await mochila2.procesar('ejemplo.json');

    console.log('Beneficios:', beneficios);
    console.log('Pesos:', pesos);
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
  }
}

main();
