import { MongoClient } from 'mongodb'
import { strict as assert } from 'assert'

(async () => {
  const url = `mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DBNAME}`
  const client = new MongoClient(url, {
    useNewUrlParser: true
  })
  try {
    await client.connect()
    const db = client.db(process.env.DBNAME)
    const r = await db.collection('coins').insertOne({
      name: 'testCoin'
    })
    assert.equal(r.insertedCount, 1)
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.close()
  }
})()
