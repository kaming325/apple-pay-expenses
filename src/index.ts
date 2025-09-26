import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/expense', async (c) => {
  return c.json({ message: 'Expense record created' })
})

export default app
