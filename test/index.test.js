import app from '../src/app.js'
import request from 'supertest'

describe('GET /tasks',()=>{
    test('Deberia responder un codigo de estado 200',async ()=>{
        const response = await request(app).get('/tasks').send()
        expect(response.statusCode).toBe(200)
    })

    test('Deberia responder con un arreglo de datos',async()=>{
        const response = await request(app).get('/tasks').send()
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('POST /tasks',()=>{
    describe ('Pruebas ofreciendo la informacion esperada',()=>{
        const newTask ={
                title: "Crear tarea",
                description: "descripcion de la tarea"
            }
        

        test('Deberia responder un status code 200', async()=>{
            const response= await request(app).post("/tasks").send(newTask)
            expect(response.statusCode).toBe(200)
        })
    
        test('Deberia responder un body request en formato JSON', async()=>{
            const response= await request(app).post("/tasks").send(newTask)
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        })
    
        test('El req.body debe contener un objeto basado en la tarea creada con un ID asociado', async()=>{
            const response= await request(app).post("/tasks").send(newTask)
            expect(response.body.id).toBeDefined()
        })
    })

    describe ('Forzando errores mediante el ingreso de info errada',()=>{
        test('Sin Datos - Deberia responder 400 HTTP Code', async()=>{
            const response = await request(app).post('/tasks').send({})
            expect(response.statusCode).toBe(400)
        })
        test('Solo titulo - Deberia responder 400 HTTP Code', async()=>{
            const response = await request(app).post('/tasks').send({"title":"test"})
            expect(response.statusCode).toBe(400)
        })
        test('Solo descripcion - Deberia responder 400 HTTP Code', async()=>{
            const response = await request(app).post('/tasks').send({"description":"descrip"})
            expect(response.statusCode).toBe(400)
        })
    })
})