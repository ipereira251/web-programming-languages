function outer() {
  this.value = 42;
  return () => console.log(this.value);
}

let fn = outer.call({ value: 99 });
fn();