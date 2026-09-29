class Character {
  #name;
  #health;
  constructor(name, health) {
    this.#name = name;
    this.#health = health;
  }

  applyDamage(amount) {
    this.#health -= amount;
  }

  applyHeal(amount) {
    this.#health += amount;
  }

  getHealth() {
    return this.#health;
  }

  getName() {
    return this.#name;
  }
}

export default Character;