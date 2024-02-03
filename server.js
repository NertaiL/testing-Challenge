import  express  from "express";
import  cors  from "cors";
/* import { logger } from "logger-express"; */
import coffeRoutes  from "./config/routes/coffeRoutes.js";

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(cors())
/* app.use(logger()) */
app.use("/api/v1", coffeRoutes)


app.listen(PORT , () => {
    console.log(`🟢Servidor Encendido en el puerto ${PORT}` );
})

export default app