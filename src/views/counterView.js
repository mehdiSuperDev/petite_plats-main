class CounterView {
  constructor() {
    this.counter = document.querySelector(".counter");
  }

  render(number) {
    this.counter.textContent = `${number} recettes`;
  }
}
