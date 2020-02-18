const Express = require('express')
const { MongoClient } = require('mongodb')

const app = new Express()
app.get('/', (req, res) => {
  res.write('<html><head><title>hello</title></head><body><p>hello world</p></body></html>')
})
app.get('/hello', async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URL, {
    useNewUrlParser: true
  })
  try {
    await client.connect()
    const db = client.db('coinpet')
    const dbres = await db.collection('coins').findOne()
    res.json(dbres)
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.close()
  }
  // res.json({a:1})
})

app.listen(3000)
