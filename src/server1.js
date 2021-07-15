const { json } = require('express')
const express = require('express')

const fs = require('fs')
const morgan = require('morgan')

const app = express()
const port = 5000

app.use(morgan('dev'))

app.get('/', (req, res) => res.status(200).send({
    message:"Server is running..."
}))


const writeData = async (contentToWrite) =>{
    fs.writeFile('./src/data.json', contentToWrite, (err)=>{
        console.log(contentToWrite)
        if(err){
            console.log(err)
        }else{
            console.log('File is updated!')
        }
    })
}

app.post('/write', async (req, res, next)=>{
    const dataToBeWritten = json.stringify(req.body)
    await writeData(dataToBeWritten)
})

app.use((req, res, next) => res.status(404).send({
    message:"Could not find route???"
}))

app.listen(port, ()=>{
    console.log(
        `
        !!! Server is running
        !!! Listening incoming request on port ${port}
        `
    )
})