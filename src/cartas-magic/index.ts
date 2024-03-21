// api sincrona de node para leer ficheros
import fs from 'fs'

// linea de comandos
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// clases, interfaces, tipos ...
import * as Carta from './carta.js'

// pedimos los parámetros

yargs(hideBin(process.argv))
.command('add', 'Añade una carta a la colección del usuario', {
  id: {
    description: 'Identificador de la carta',
    type: 'number',
    demandOption: false
  }
}, (argv) => {                // Elegimos que hacer con los parámetros introducidos
  console.log(argv.id);
  console.log(argv.name);
})

// ayuda al usuario
.help()
.argv
