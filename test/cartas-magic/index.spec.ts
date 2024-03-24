
import 'mocha'
import { expect } from 'chai'
import { CardManager } from '../../src/cartas-magic/cardmanager.js'
import * as Carta from '../../src/cartas-magic/card.js'
import * as Functions from '../../src/cartas-magic/functions.js'
import fs from 'fs'

describe('functions', () => {
  it('Debería cargar las cartas de un fichero' , () => {
    const cards = Functions.LoadCards("test")
    expect(cards).to.be.an('array')
    expect(cards).to.have.length(0)
  })

  it('Debería crear una carta correctamente', () => {
    const argv = {
      id: 1,
      name: 'Carta de prueba',
      manacost: 1,
      color: "azul",
      timeline: "criatura",
      rarity: "comun",
      rules: 'Reglas de la carta',
      strength: [3, 8],
      loyalty: undefined,
      value: 1
    }
    const argv2 = {
      id: 1,
      name: 'Carta de prueba',
      manacost: 1,
      color: "azul",
      timeline: "Planeswalker",
      rarity: "comun",
      rules: 'Reglas de la carta',
      strength: undefined,
      loyalty: 5,
      value: 1
    }
    const argv3 = {
      id: 1,
      name: 'Carta de prueba',
      manacost: 1,
      color: "azul",
      timeline: "tierra",
      rarity: "comun",
      rules: 'Reglas de la carta',
      strength: undefined,
      loyalty: undefined,
      value: 1
    }

    const carta = Functions.CreateCard(argv)
    const carta2 = Functions.CreateCard(argv2)
    const carta3 = Functions.CreateCard(argv3)
    expect(carta).to.be.an('object')
    expect(carta2).to.be.an('object')
    expect(carta3).to.be.an('object')
  });

  it('Debería cargar cartas de un fichero con cartas', () => {
    const user = "test2"
    fs.mkdirSync(`./cartas/${user}/`, { recursive: true })
    fs.writeFileSync(`./cartas/${user}/${user}.json`, JSON.stringify([{ID: 1, Name: 'Carta de prueba', ManaCost: 1, Color: Carta.Color.azul, TimeLine: Carta.TimeLine.criatura, Rarity: Carta.Rarity.comun, Rules: 'Reglas de la carta', Strength: [3, 8], Loyalty: undefined, Value: 1}, {ID: 2, Name: 'Carta de prueba', ManaCost: 1, Color: Carta.Color.azul, TimeLine: Carta.TimeLine.criatura, Rarity: Carta.Rarity.comun, Rules: 'Reglas de la carta', Strength: [3, 8], Loyalty: undefined, Value: 1}]))
    const cartas = Functions.LoadCards(user);
    expect(cartas).to.be.an('array')
    expect(cartas).to.have.length(2)
    fs.rmdirSync(`./cartas/${user}/`, { recursive: true })
  });

  it('debería guardar las cartas en un fichero', () => {
    const user = 'test'
    const carta: Carta.Carta = {
      ID: 1,
      Name: 'Carta de prueba',
      ManaCost: 1,
      Color: Carta.Color.azul,
      TimeLine: Carta.TimeLine.criatura,
      Rarity: Carta.Rarity.comun,
      Rules: 'Reglas de la carta',
      Strength: [3, 8],
      Loyalty: undefined,
      Value: 1
    }
    Functions.SaveCard(user, [carta])
    fs.unlinkSync(`./cartas/${user}/${user}.json`)
    fs.rmdirSync(`./cartas/${user}/`, { recursive: true })
  })
})

describe('Carta', () => {
  let carta: Carta.Carta

  beforeEach(() => {
    carta = {
      ID: 1,
      Name: 'Carta de prueba',
      ManaCost: 1,
      Color: Carta.Color.azul,
      TimeLine: Carta.TimeLine.criatura,
      Rarity: Carta.Rarity.comun,
      Rules: 'Reglas de la carta',
      Strength: [3, 8],
      Loyalty: undefined,
      Value: 1
    }
  })

  it('Debería crear una carta', () => {
    expect(carta).to.be.an('object')
  });

  it('Debería tener un ID', () => {
    expect(carta.ID).to.be.a('number')
  });

  it('Debería tener un nombre', () => {
    expect(carta.Name).to.be.a('string')
  });

  it('Debería tener un coste de maná', () => {
    expect(carta.ManaCost).to.be.a('number')
  });

  it('Debería tener un color', () => {
    expect(carta.Color).to.be.a('number')
  });

  it('Debería tener una línea temporal', () => {
    expect(carta.TimeLine).to.be.a('number')
  });

  it('Debería tener una rareza', () => {
    expect(carta.Rarity).to.be.a('number')
  });

  it('Debería tener unas reglas', () => {
    expect(carta.Rules).to.be.a('string')
  });

  it('Debería tener una fuerza', () => {
    expect(carta.Strength).to.be.an('array')
  });

  it('Debería tener un valor', () => {
    expect(carta.Value).to.be.a('number')
  });
});

describe('CardManager', () => {
  let cardManager: CardManager
  let whitecard: Carta.Carta
  let bluecard: Carta.Carta
  let blackcard: Carta.Carta
  let redcard: Carta.Carta
  let greencard: Carta.Carta
  let multicolorcard: Carta.Carta
  let anothercard: Carta.Carta

  beforeEach(() => {
    whitecard = {
      ID: 1,
      Name: 'Carta de prueba',
      ManaCost: 1,
      Color: Carta.Color.blanco,
      TimeLine: Carta.TimeLine.criatura,
      Rarity: Carta.Rarity.comun,
      Rules: 'Reglas de la carta',
      Strength: [3, 8],
      Loyalty: undefined,
      Value: 1
    }
    bluecard = {
      ID: 2,
      Name: 'Carta de prueba',
      ManaCost: 1,
      Color: Carta.Color.azul,
      TimeLine: Carta.TimeLine.artefacto,
      Rarity: Carta.Rarity.infrecuente,
      Rules: 'Reglas de la carta',
      Strength: [3, 8],
      Loyalty: undefined,
      Value: 1
    }
    blackcard = {
      ID: 3,
      Name: 'Carta de prueba',
      ManaCost: 1,
      Color: Carta.Color.negro,
      TimeLine: Carta.TimeLine.planeswalker,
      Rarity: Carta.Rarity.legendaria,
      Rules: 'Reglas de la carta',
      Strength: [3, 8],
      Loyalty: undefined,
      Value: 1
    }
    redcard = {
      ID: 4,
      Name: 'Carta de prueba',
      ManaCost: 1,
      Color: Carta.Color.rojo,
      TimeLine: Carta.TimeLine.conjuro,
      Rarity: Carta.Rarity.mitica,
      Rules: 'Reglas de la carta',
      Strength: undefined,
      Loyalty: undefined,
      Value: 1
    }
    greencard = {
      ID: 5,
      Name: 'Carta de prueba',
      ManaCost: 1,
      Color: Carta.Color.verde,
      TimeLine: Carta.TimeLine.encantamiento,
      Rarity: Carta.Rarity.rara,
      Rules: 'Reglas de la carta',
      Strength: [3, 8],
      Loyalty: undefined,
      Value: 1
    }
    multicolorcard = {
      ID: 6,
      Name: 'Carta de prueba',
      ManaCost: 1,
      Color: Carta.Color.multicolor,
      TimeLine: Carta.TimeLine.tierra,
      Rarity: Carta.Rarity.comun,
      Rules: 'Reglas de la carta',
      Strength: [3, 8],
      Loyalty: undefined,
      Value: 1
    }
    anothercard = {
      ID: 6,
      Name: 'Carta de prueba',
      ManaCost: 1,
      Color: Carta.Color.incoloro,
      TimeLine: Carta.TimeLine.instantaneo,
      Rarity: Carta.Rarity.comun,
      Rules: 'Reglas de la carta',
      Strength: [3, 8],
      Loyalty: undefined,
      Value: 1
    }
    


    cardManager = new CardManager([whitecard, bluecard, blackcard, redcard, greencard, multicolorcard, anothercard])
  })

  it('Debería añadir una carta', () => {
    const newCard: Carta.Carta = {
      ID: 8,
      Name: 'Carta de prueba 2',
      ManaCost: 2,
      Color: Carta.Color.blanco,
      TimeLine: Carta.TimeLine.encantamiento,
      Rarity: Carta.Rarity.rara,
      Rules: 'Reglas de la carta 2',
      Strength: [2, 4],
      Loyalty: 2,
      Value: 2
    }
    cardManager.addCard(newCard)
    expect(cardManager.GetCards()).to.have.length(8)
  });

  it('Debería eliminar una carta por su id', () => {
    cardManager.removeCard(2);
    expect(cardManager.GetCards()).to.have.length(6)
  });

  it('Debería mandar un error al añadir una carta con id ya existente', () => {
    const newCard: Carta.Carta = {
      ID: 1,
      Name: 'Carta de prueba 2',
      ManaCost: 2,
      Color: Carta.Color.blanco,
      TimeLine: Carta.TimeLine.encantamiento,
      Rarity: Carta.Rarity.rara,
      Rules: 'Reglas de la carta 2',
      Strength: [2, 4],
      Loyalty: 2,
      Value: 2
    }
    expect(() => cardManager.addCard(newCard)).to.throw(Error)
  });

  it('Debería mandar un error al eliminar una carta con id no existente', () => {
    expect(() => cardManager.removeCard(10)).to.throw(Error)
  });

  it('Debería listar las cartas por consola', () => {
    expect(cardManager.listCards()).to.be.undefined
  });

  it('Debería imprimir la información de una carta específica', () => {
    expect(cardManager.readSpecificCard(1)).to.be.undefined
  });

  it('Debería mandar un error al intentar leer una carta con id no existente', () => {
    expect(() => cardManager.readSpecificCard(10)).to.throw(Error)
  });

  it('Debería modificar la información de una carta', () => {
    const argv = {
      id: 1,
      name: 'Carta de prueba 2',
      manacost: 2,
      color: "blanco",
      timeline: "encantamiento",
      rarity: "rara",
      rules: 'Reglas de la carta 2',
      strength: [2, 4],
      loyalty: 2,
      value: 2
    }
    const newCard: Carta.Carta = {
      ID: 1,
      Name: 'Carta de prueba 2',
      ManaCost: 2,
      Color: Carta.Color.blanco,
      TimeLine: Carta.TimeLine.encantamiento,
      Rarity: Carta.Rarity.rara,
      Rules: 'Reglas de la carta 2',
      Strength: [2, 4],
      Loyalty: 2,
      Value: 2
    }
    cardManager.readSpecificCard(1)
    cardManager.updateCard(argv)
    cardManager.readSpecificCard(1)
    expect(cardManager.GetCards()[0]).to.be.eql(newCard)
  });

  it ('Debería mandar un error al intentar modificar una carta con id no existente', () => {
    const argv = {
      ID: 10,
      Name: 'Carta de prueba 2',
      ManaCost: 2,
      Color: Carta.Color.blanco,
      TimeLine: Carta.TimeLine.encantamiento,
      Rarity: Carta.Rarity.rara,
      Rules: 'Reglas de la carta 2',
      Strength: [2, 4],
      Loyalty: 2,
      Value: 2
    }
    expect(() => cardManager.updateCard(argv)).to.throw(Error)
  });


});

