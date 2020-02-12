import Express from 'express'

const app = new Express()

app.get('/hello', (req, res) => {
  res.write('<html><head><title>hello</title></head><body><p>hello world</p></body></html>')
})

app.listen(3000)
