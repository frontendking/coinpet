export class Coins {
  #collection = 0

  constructor (db) {
    this.#collection = db.collectoon('coins')
  }
}
