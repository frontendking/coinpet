import Express from 'express'
import { MongoClient } from 'mongodb'
const app = new Express()

app.get('/hello', async (req, res) => {
  const url = `mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DBNAME}`
  const client = new MongoClient(url, {
    useNewUrlParser: true
  })
  try {
    await client.connect()
    const db = client.db(process.env.DBNAME)
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
