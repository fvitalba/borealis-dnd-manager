import supertest from 'supertest'
import app from '../app'

describe('GET /users', () => {
    it('retrieves a JSON List of users', async () => {
        await supertest(app)
            .get('/api/v1.0/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

// afterAll(() => {
//     mongoose.connection.close()
// })

/*
test('reverse of a', () => {
  const result = reverse('a')

  expect(result).toBe('a')
})

test('reverse of react', () => {
  const result = reverse('react')

  expect(result).toBe('tcaer')
})

test('reverse of releveler', () => {
  const result = reverse('releveler')

  expect(result).toBe('releveler')
})
*/

/*
test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(2)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  expect(response.body[0].content).toBe('HTML is easy')
})
*/

