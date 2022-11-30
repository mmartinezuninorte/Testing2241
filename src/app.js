import express from 'express'

const app = express()

app.use(express.json())

app.get("/ping", (req, res)=>{
    res.send("pong")
})

app.get("/tasks", (req, res)=>{
    res.status(200).json([])
})

app.post("/tasks", (req, res)=>{
    if(!req.body.title || !req.body.description) return res.status(400).json({message:"Bad Request"})
    const { title, description } = req.body // const title = req.body.title const description = req.body.descritpion
    res.status(200).json({
        title,
        description,
        id: "ejemploID"
    })
})

export default app