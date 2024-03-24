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
  },

}, (argv) => {                // Elegimos que hacer con los parámetros introducidos

  log(chalk.blue("Leyendo cartas del usuario " + argv.user + " ..."))
  try {
    
    const cards = Functions.LoadCards(argv.user);
    const mymanager = new CardManager(cards);
    const myCard: Carta.Carta = Functions.CreateCard(argv)
    mymanager.addCard(myCard);
    Functions.SaveCard(argv.user, mymanager.GetCards());
    log(chalk.blue("Carta añadida correctamente a la colección del usuario " + argv.user))
  
  } catch (error) {
    log(chalk.red('Error al añadir la carta:', error instanceof Error ? error.message : error));
    exit;
  }

})

//-------------------------------------------LIST-------------------------------------------



//-------------------------------------------UPDATE-------------------------------------------

//-------------------------------------------READ-------------------------------------------

//-------------------------------------------REMOVE-------------------------------------------


// ayuda al usuario
.help()
.argv
