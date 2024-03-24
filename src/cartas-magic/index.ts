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
  
    // leemos las cartas del fichero y creamos el manejador
    log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
    const cards = Functions.LoadCards(argv.user);
    const mymanager = new CardManager(cards);
    log(chalk.green("Lectura realizada con éxito ..."));

    // Creamos la carta que queremos añadir y la añadimos
    log(chalk.green("Añadiendo carta a la colección del usuario " + argv.user))
    const myCard: Carta.Carta = Functions.CreateCard(argv);
    mymanager.addCard(myCard);
    log(chalk.green("Carta añadida con éxito"))

    // guardamos las cartas sobreescribiendo el fichero
    log(chalk.green("Guardando cartas ..."))
    Functions.SaveCard(argv.user, mymanager.GetCards());
    log(chalk.green("Cartas guardadas con éxito ..."))
  
  } catch (error) {   // detección de errores
    log(chalk.red("Error al añadir la carta al usuario "  + argv.user + ":", error instanceof Error ? error.message : error));
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
    
    // cargo las cartas del fichero y creo el manejador
    log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
    const cards = Functions.LoadCards(argv.user);
    const mymanager = new CardManager(cards);
    log(chalk.green("Lectura realizada con éxito ..."));

    //listo las cartas por consola
    log(chalk.green("Listando las cartas del usuario " + argv.user + " ..."))
    mymanager.listCards();
    log(chalk.green("\ncartas listadas con éxito ..."));

  } catch (error) { // detección de errores

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
    
    // leo las cartas del fichero de usuario y creo el manejador
    log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
    const cards = Functions.LoadCards(argv.user);
    const mymanager = new CardManager(cards);
    log(chalk.green("Lectura realizada con éxito ..."));

    // actualizo la carta
    log(chalk.green("Actualizando la carta con id " + argv.id + " del usuario " + argv.user + " ..."))
    mymanager.updateCard(argv);
    log(chalk.green("Carta actualizada con éxito ..."));

    // guardo las cartas en el fichero del usuario
    log(chalk.green("Guardando cartas ..."));
    Functions.SaveCard(argv.user, mymanager.GetCards());
    log(chalk.green("Cartas guardadas con éxito ..."));

  } catch (error) { // detección de errores
    log(chalk.red("Error al actualizar la carta al usuario "  + argv.user + ":", error instanceof Error ? error.message : error));
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
      
      // leo las cartas del fichero del usuario y creo el manejador
      log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
      const cards = Functions.LoadCards(argv.user);
      const mymanager = new CardManager(cards);
      log(chalk.green("Lectura realizada con éxito ..."));

      // leo la carta que se pide
      log(chalk.green("Leyendo la carta con id " + argv.id + " del usuario " + argv.user + " ..."))
      mymanager.readSpecificCard(argv.id);
      log(chalk.green("\nCarta leida con éxito ..."))

    } catch (error) { // detección de errores
    log(chalk.red("Error al leer la carta al usuario "  + argv.user + ":", error instanceof Error ? error.message : error));
    exit;
  }

})

//-------------------------------------------REMOVE-------------------------------------------

.command('remove', 'Elimina una carta de la colección de un usuario', {
  user: {
    description: 'Usuario que posee la carta a eliminar',
    type: 'string',
    demandOption: true
  },
  id: {
    description: 'id de la carta a eliminar',
    type: 'number',
    demandOption: true
  }
}, (argv) => {

  try {

    // leo las cartas del fichero del usuario y creo el manejador
    log(chalk.green("Leyendo cartas del usuario " + argv.user + " ..."));
    const cards = Functions.LoadCards(argv.user);
    const mymanager = new CardManager(cards);
    log(chalk.green("Lectura realizada con éxito ..."));

    // elimino la carta que se pide 
    log(chalk.green("Eliminando carta con id " + argv.id + " ..."))
    mymanager.removeCard(argv.id);
    log(chalk.green("\nCarta eliminada con éxito ..."));

    // sobreescribo los datos en el fichero
    log(chalk.green("Guardando cartas ..."))
    Functions.SaveCard(argv.user, mymanager.GetCards());
    log(chalk.green("Cartas guardadas con éxito ..."))


  } catch (error) { // detección de errores
    log(chalk.red("Error al eliminar la carta al usuario "  + argv.user + ":", error instanceof Error ? error.message : error));
    exit;
  }

})

// ayuda al usuario
.help()
.argv
