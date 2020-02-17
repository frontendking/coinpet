// import Express from 'express'
// import { MongoClient } from 'mongodb'
const Express = require('express')
const { MongoClient } = require('mongodb')
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/dev'
const app = new Express()
app.get('/', (req, res) => {
  res.write(
    '<html><head><title>hello</title></head><body><p>hello world</p></body></html>')
})
app.get('/api/coin', async (req, res) => {
  const client = new MongoClient(mongoURL, {
    useNewUrlParser: true
  })
  try {
    await client.connect()
    const db = client.db('coinpet')
    await db.collection('coins').insertOne({ a: '4$' })
    const dbres = await db.collection('coins').findOne()
    res.json(dbres)
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.close()
  }
  // res.json({a:1})
  // res.write('<html><head><title>hello</title></head><body><p>hello world</p></body></html>')
})

app.listen(3000)
