const Express = require('express')
const { MongoClient } = require('mongodb')

const app = new Express()
app.get('/', (req, res) => {
  res.write(
    '<html><head><title>hello</title></head><body><p>hello world</p></body></html>')
  res.end()
})
app.get('/coin', async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URL, {
    useNewUrlParser: true
  })
  try {
    await client.connect()
    const db = client.db('coinpet')
    await db.collection('coins').insertOne({
      name: 'bitcoin',
      price: '100,000,000'
    })
    const dbres = await db.collection('coins').findOne()
    res.json(dbres)
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.close()
  }
})

app.listen(3000, () => {
  console.log('connected to coinpet!')
  console.log(`MONGO_URL:${process.env.MONGO_URL}`)
})
