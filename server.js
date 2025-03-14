import express from  'express'
import projectRoute from './app/routes/projectroute.js'
import taskRoute from './app/routes/taskroute.js'


const app = express()

app.use(express.json());

app.use( express.urlencoded({extended : true }) )

app.use("/api", projectRoute);
app.use('/api',taskRoute)

let port = 3000

app.listen(port, ()=>{ console.log(`Server running on http://localhost:${port}`) } )

