import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ServerPrefix } from './Utils/Prefix'
import SwaggerDoc from './Docs/Swagger'
import SwaggerUi from 'swagger-ui-express'
import UserRoutes from './Routes/User_Routes'
import AuthRoutes from './Routes/Auth_Routes'
const PORT = process.env.PORT || 8080

const app = express()

//* Middleware
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

//* Routes
app.use('/user', UserRoutes)
app.use('/auth', AuthRoutes)
app.use('/api/docs', SwaggerUi.serve, SwaggerUi.setup(SwaggerDoc))

app.listen(PORT, () => console.log(`${ServerPrefix} - Started server on http://localhost:${PORT}`))
