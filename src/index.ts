import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/expense', async (c) => {
  const { merchant, amount } = await c.req.json();
  if(!merchant || !amount) {
    return c.text('Missing merchant or amount!')
  }
  if(typeof merchant !== 'string' || typeof amount !== 'number') {
    return c.text('Invalid merchant or amount type')
  }
  const stmt = c.env?.EXPENSES_DB.prepare("INSERT INTO Expense (merchant, amount, create_dateTime) VALUES (?, ?, ?)").bind(merchant, amount, new Date().toISOString());
  const res = await stmt.run();
  if (!res.success) {
    return c.text("Failed to create expense record")
  }
  return c.text('Expense record created' )
})

export default app
