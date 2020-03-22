function * someWords () {
  yield 'hello'
  yield 'world'
}

for (let value of someWords()) {
  console.log(value)
}
