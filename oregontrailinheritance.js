class Traveler {
  constructor(name) {
    this._name = name;
    this._food = 1;
    this._isHealth = true;
  }
  get name() {
    return this._name;
  }
  set name(novoname) {
    this._name = novoname;
  }
  get food() {
    return this._food;
  }
  set food(novaComida) {
    this._food = novaComida;
  }
  get isHealth() {
    return this._isHealth;
  }
  set isHealth(novaSaude) {
    this._isHealth = novaSaude;
  }

  hunt() {
    this._food += 2;
  }
  eat() {
    if (this._food > 0) {
      this._food -= 1;
    } else {
      this._isHealth = false;
    }
  }
}
class Wagon {
  constructor(capacity) {
    this._capacity = capacity;
    this._passengers = [];
  }
  get capacity() {
    return this._capacity;
  }
  set capacity(novaCapacidade) {
    this._capacity = novaCapacidade;
  }
  get passengers() {
    return this._passengers;
  }
  set passengers(novosPassageiros) {
    this._passengers = novosPassageiros;
  }
  getAvailableSeatCount() {
    return this._capacity - this._passengers.length;
  }
  join(viajante) {
    if (this._passengers.length < this._capacity) {
      this._passengers.push(viajante); // nao deve ser um numero, deve ser um objeto
    }
  }
  shouldQuarantine() {
    let resultadoQuarentena = false;
    for (let i = 0; i < this._passengers.length; i++) {
      if (this._passengers[i].isHealth === false) {
        return true;
      }
    }
    return resultadoQuarentena;
  }
  totalFood() {
    let totalDeComida = 0;
    for (let i = 0; i < this._passengers.length; i++) {
      totalDeComida += this._passengers[i].food;
    }
    return totalDeComida;
  }
}
class Hunter extends Traveler {
  constructor(name) {
    super(name);
    this._food = 2;
  }

  hunt() {
    this._food += 5;
  }
  eat() {
    if (this.food >= 2) {
      this.food -= 2;
    } else if (this.food < 2) {
      this.food = 0;
      this.isHealth = false;
    }
  }
  giveFood(traveler, numOFFoodUnits) {
    if (this.food >= numOFFoodUnits) {
      traveler.food += numOFFoodUnits;
      this.food -= numOFFoodUnits;
    }
  }
}
class Doctor extends Traveler {
  constructor(name) {
    super(name);
  }
  heal(traveler) {
    if (traveler.isHealth === false) {
      traveler.isHealth = true;
    }
  }
}

// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler("Henrietta");
let juan = new Traveler("Juan");
let drsmith = new Doctor("Dr. Smith");
let sarahunter = new Hunter("Sara");
let maude = new Traveler("Maude");

console.log(
  `#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`
);

wagon.join(henrietta);
console.log(
  `#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`
);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);

wagon.join(maude); // Não tem espaço para ela!
console.log(
  `#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`
);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();

drsmith.eat();

juan.eat();
juan.eat(); // juan agora está ()doente (sick)

console.log(
  `#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`
);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(
  `#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`
);

sarahunter.giveFood(juan, 4);

sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(
  `#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`
);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);
