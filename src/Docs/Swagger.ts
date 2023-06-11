import SwaggerDocs, { OAS3Definition, OAS3Options } from 'swagger-jsdoc'

const SwaggerDefinition: OAS3Definition = {
  openapi: '3.0.3',
  info: {
    title: 'API de Autenticación',
    description:
   'Esta es una API de autenticación construida con Express, TypeScript y Prisma. Proporciona funcionalidades para registrar usuarios, iniciar sesión, ver y administrar usuarios, cambiar contraseñas, actualizar información, eliminar usuarios, entre otras características.',
    version: '1.0.0',
    contact: {
      name: 'Elver david peñate',
      email: 'elverdavid0839@gmail.com',
      url: 'https://elvportafolio.website'
    }
  },
  servers: [
    {
      url: 'http://localhost:8080/'
    }
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
        description: 'tener una sesion activa'
      }
    }
  },
  tags: [
    {
      name: 'Usuarios',
      description: 'Rutas de usuarios'
    },
    {
      name: 'Auth',
      description: 'Rutas de autentificacion'
    }
  ],
  paths: {
    '/user/all': {
      get: {
        tags: ['Usuarios'],
        summary: 'Ver todos los usuarios',
        description:
     'Para poder visualizar todos los usuarios debes de tener un usuario creado una sesion activa y ademas debes de tener el rol de ADMIN, si cumples todos los requisitos entonces podras ver todos los usuarios, paginados donde se mostraran 20 usuarios por pagina. para poder seguir a la siguiente pagina agrega la siguiente query a la url ?page=2 (ejemplo)',
        responses: {
          200: {
            description:
       'Lista de usuarios,la contraseña no se retorna a el cliente aunque este encriptada',
            content: {
              'aplication/json': {
                example: [
                  {
                    id: 1,
                    name: 'luis',
                    email: 'luis@gmail.com',
                    role: 'USER'
                  },
                  {
                    id: 2,
                    name: 'pedro',
                    email: 'pedro@gmail.com',
                    role: 'ADMIN'
                  }
                ]
              }
            }
          }
        },
        security: [{ cookieAuth: [] }]
      }
    },
    '/user/one/:id': {
      get: {
        tags: ['Usuarios'],
        summary: 'Ver un usuario por id',
        description: 'Ver un usuario por id , debes tener una sesion activa',
        parameters: [
          {
            name: 'id',
            in: ''
          }
        ],
        responses: {
          200: {
            description:
       'Ver un usuario por id,la contraseña no se retorna a el cliente aunque este encriptada',
            content: {
              'aplication/json': {
                example: {
                  id: 1,
                  name: 'luis',
                  email: 'luis@gmail.com',
                  role: 'USER'
                }
              }
            }
          }
        }
      }
    },
    '/user/update/:id': {
      put: {
        tags: ['Usuarios'],
        summary: 'Actualizar un usuario',
        description: 'Actualizar un usuario,algunos datos de el usuario'
      }
    },
    '/user/delate/:id': {
      delete: {
        tags: ['Usuarios'],
        summary: 'Eliminar un usuario',
        description: 'Eliminar un usuarios por id'
      }
    },
    '/auth/signup': {
      post: {
        tags: ['Auth'],
        summary: 'Registrar un usuario o crear una cuenta',
        description: 'al registrarte o crear una cuenta, se creara'
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Iniciar sesion',
        description: 'iniciar sesion'
      }
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Cerrar sesion',
        description: 'Cerrar sesion'
      }
    },
    '/auth/change-password/:id': {
      patch: {
        tags: ['Auth'],
        summary: 'Actualizar contraseña',
        description: 'Actualizar contraseña'
      }
    }
  }
}
const SwaggerOption: OAS3Options = {
  definition: SwaggerDefinition,
  apis: ['./src/Routes/*.ts']
}

export default SwaggerDocs(SwaggerOption)
