class Traveler {
  constructor(name) {
    this._name = name; //string
    this._food = 1; //number
    this._isHealth = true; //boolean
  }
  get name() {
    return this._name;
  }
  set name(newName) {
    this._name = newName;
  }
  get food() {
    return this._food;
  }
  set food(newFood) {
    this.food = newFood;
  }
  get isHealth() {
    return this.isHealth;
  }
  set isHealth(newIsHealth) {
    this.isHealth = newIsHealth;
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
    this._passageiros = [];
  }
  get capacity() {
    return this._capacity;
  }
  set capacity(newCapacity) {
    this._capacity = newCapacity;
  }
  get passageiros() {
    return this._passageiros;
  }
  set passageiros(newPassageiros) {
    this._passageiros = newPassageiros;
  }
  getAvailableSeatCount() {
    //percorrer o array de passageiros, contar
    //retornar a capacidade menos o numero de passageiros
    let assentosDisponiveis = this._capacity - this._passageiros.length;
    return assentosDisponiveis;
  }
  join(traveler) {
    ///add viajante se tiver espaco
    let assentosDisponiveis = this._capacity - this._passageiros.length;
    if (assentosDisponiveis > 0) {
      return this._passageiros.push(traveler);
    } else {
      return "Não tem espaço para ela!";
    }
  }
  shouldQuarantine() {
    //retorna true se houver uma pessoa que nao esta saudavel ou retorna false
    // acho que devo percorrer o objeto wagon e vericar se na propriedade is.

    for (let i = 0; i < this._passageiros.length; i++) {
      const passageiroNaPosicao = this._passageiros[i];

      if (passageiroNaPosicao._isHealth === false) {
        return true;
      }
    }
    return false;
  }
  //provavelmente tenho que mudar o codigo na oregon trail
  totalFood() {
    let quantidadeTotalDeComida = 0;
    for (let i = 0; i < this._passageiros.length; i++) {
      const passageiroNaPosicao = this._passageiros[i]._food;
      quantidadeTotalDeComida += passageiroNaPosicao;
    }
    return quantidadeTotalDeComida;
  }
}
//------------------Oregon Trail heranca
// sera que preciso de um arquivo para cada classe?
class Hunter extends Traveler {
  constructor(name) {
    super(name);
    this._food = 2;
  }
  hunt() {
    this._food += 5;
  }
  eat() {
    if (this._food > 2) {
      this._food -= 2;
    } else if (this._food < 2) {
      this._food = 0;
      this._isHealth = false;
    }
  }
  giveFood(passageiro, quantidadeDeComida) {
    if (passageiro._food < 1 && this._food > 0) {
      passageiro._food += quantidadeDeComida;
      this._food -= quantidadeDeComida;
    }
    passageiro._food;
  }
}
class Doctor extends Traveler {
  constructor(name) {
    super(name);
  }
  //percvorrer o objeto wagon e se houver passageiro que a saude ficou false mudar para true
  heal(passageiro) {
    if (passageiro._isHealth === false) {
      passageiro._isHealth = true;
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
