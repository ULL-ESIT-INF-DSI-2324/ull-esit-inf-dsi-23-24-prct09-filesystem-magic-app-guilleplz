// salida de consola
import chalk from 'chalk';

// api sincrona de node para leer ficheros
import fs from 'fs'

// linea de comandos
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// clases, interfaces, tipos ...
import * as Carta from './card.js'
import { CardManager } from './cardmanager.js';
import * as Functions from './functions.js'
import { exit } from 'process';

const log = console.log;

// pedimos los parámetros

yargs(hideBin(process.argv))

//-------------------------------------------ADD-------------------------------------------

.command('add', 'Añade una carta a la colección del usuario', {
  user: {
    description: 'nombre del usuario al que añadir la carta',
    type: 'string',
    demandOption: true
  },

  id: {
    description: 'Identificador de la carta',
    type: 'number',
    demandOption: true
  },

  name: {
    description: 'Nombre de la carta magic',
    type: 'string',
    demandOption: true
  },

  manacost: {
    description: 'Coste de mana para utilizar la carta',
    type: 'number',
    demandOption: true
  },

  color: {
    description: 'Color de la carta',
    type: 'string',
    choices: ['blanco', 'azul', 'negro', 'rojo', 'verde', 'incoloro', 'multicolor'],
    demandOption: true
  },

  timeline: {
    description: 'linea de tiempo de la carta',
    type: 'string',
    choices: ['tierra', 'criatura', 'encantamiento', 'conjuro', 'instantaneo', 'Artefacto', 'Planeswalker'],
    demandOption: true
  },

  rarity: {
    description: 'rareza de la carta',
    type: 'string',
    choices: ['comun', 'infrecuente', 'rara', 'mitica'],
    demandOption: true
  },

  rules: {
    description: 'texto de reglas de la carta',
    type: 'string',
    demandOption: true
  },

  strength: {
    description: 'fuerza y resistencia de la carta de tipo criatura. Formato: [fuerza, resistencia]',
    type: 'array',
    demandOption: false,
    coerce: (arg) => arg.map(Number),
    nargs: 2
  },

  loyalty: {
    description: 'marcas de lealtad que tiene un Planeswalker',
    type: 'number',
    default: undefined,
    demandOption: false
  },

  value: {
    description: 'valor de mercado de la carta',
    type: 'number',
    demandOption: true
  }

}, (argv) => {                // Elegimos que hacer con los parámetros introducidos

  try {
  
    log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
    const cards = Functions.LoadCards(argv.user);
    const mymanager = new CardManager(cards);
    const myCard: Carta.Carta = Functions.CreateCard(argv);
    log(chalk.green("Lectura realizada con éxito ..."));

    mymanager.addCard(myCard);
    Functions.SaveCard(argv.user, mymanager.GetCards());
    log(chalk.green("Carta añadida correctamente a la colección del usuario " + argv.user))
  
  } catch (error) {
    log(chalk.red("Error al añadir la carta al usuario"  + argv.user + ":", error instanceof Error ? error.message : error));
    exit;
  }

})

//-------------------------------------------LIST-------------------------------------------

.command('list', 'lista las cartas de un usuario', {
  user: {
    description: 'nombre del usuario que tiene la colección que deseamos listar',
    type: 'string',
    demandOption: true
  }
}, (argv) => {
  
  try {
    
    // cargo las cartas del fichero
    log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
    const cards = Functions.LoadCards(argv.user);
    const mymanager = new CardManager(cards);
    log(chalk.green("Lectura realizada con éxito ..."));

    //listo las cartas
    mymanager.listCards();
    log(chalk.green("\ncartas listadas con éxito ..."));

  } catch (error) {

    log(chalk.red('\nError al listar las cartas del usuario ' + argv.user + ":", error instanceof Error ? error.message : error));

  }

})

//-------------------------------------------UPDATE-------------------------------------------

.command('update', 'Actualiza la información de una carta', {
  user: {
    desciption: 'nombre del usuario al que le queremos actualizar una carta',
    type: 'string',
    demandOption: true
  },

  id: {
    desciption: 'id de la carta que queremos actualizar',
    type: 'number',
    demandOption: true
  },

  name: {
    description: 'Nombre de la carta magic',
    type: 'string',
    demandOption: false
  },

  manacost: {
    description: 'Coste de mana para utilizar la carta',
    type: 'number',
    demandOption: false
  },

  color: {
    description: 'Color de la carta',
    type: 'string',
    choices: ['blanco', 'azul', 'negro', 'rojo', 'verde', 'incoloro', 'multicolor'],
    demandOption: false
  },

  timeline: {
    description: 'linea de tiempo de la carta',
    type: 'string',
    choices: ['tierra', 'criatura', 'encantamiento', 'conjuro', 'instantaneo', 'Artefacto', 'Planeswalker'],
    demandOption: false
  },

  rarity: {
    description: 'rareza de la carta',
    type: 'string',
    choices: ['comun', 'infrecuente', 'rara', 'mitica'],
    demandOption: false
  },

  rules: {
    description: 'texto de reglas de la carta',
    type: 'string',
    demandOption: false
  },

  strength: {
    description: 'fuerza y resistencia de la carta de tipo criatura. Formato: [fuerza, resistencia]',
    type: 'array',
    demandOption: false,
    coerce: (arg) => arg.map(Number),
    nargs: 2
  },

  loyalty: {
    description: 'marcas de lealtad que tiene un Planeswalker',
    type: 'number',
    default: undefined,
    demandOption: false
  },

  value: {
    description: 'valor de mercado de la carta',
    type: 'number',
    demandOption: false
  },
}, (argv) => {

  try {
    
    log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
    const cards = Functions.LoadCards(argv.user);
    const mymanager = new CardManager(cards);
    log(chalk.green("Lectura realizada con éxito ..."));
    mymanager.updateCard(argv);
    Functions.SaveCard(argv.user, mymanager.GetCards());
    log(chalk.green("Carta actualizada correctamente ..."));

  } catch (error) {
    log(chalk.red("Error al actualizar la carta al usuario"  + argv.user + ":", error instanceof Error ? error.message : error));
    exit;
  }


})

//-------------------------------------------READ-------------------------------------------

.command('read', 'Lee una carta de la colección de un usuario', {
  user: {
    description: 'Usuario que posee la carta',
    type: 'string',
    demandOption: true
  },
  id: {
    description: 'id de la carta a leer',
    type: 'number',
    demandOption: true
  }
}, (argv) => {

    try {
      
      log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
      const cards = Functions.LoadCards(argv.user);
      const mymanager = new CardManager(cards);
      log(chalk.green("Lectura realizada con éxito ..."));

      mymanager.readSpecificCard(argv.id);

    } catch (error) {
    log(chalk.red("Error al leer la carta al usuario"  + argv.user + ":", error instanceof Error ? error.message : error));
    exit;
  }

})

//-------------------------------------------REMOVE-------------------------------------------


// ayuda al usuario
.help()
.argv
