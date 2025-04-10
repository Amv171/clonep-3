// Importamos swagger-jsdoc para generar la documentación
const swaggerJsdoc = require("swagger-jsdoc") 

    const options = {
        definition: {
          openapi: "3.0.3",
          info: {
            title: "Tracks - Express API with Swagger (OpenAPI 3.0)",
            version: "0.1.0",
            description:
              "This is a CRUD API application made with Express and documented with Swagger",
            license: {
              name: "MIT",
              url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
              name: "u-tad",
              url: "https://u-tad.com",
              email: "antonio.villas@live.u-tad.com",
            },
          },
          servers: [
            {
              url: "http://localhost:3000",
              url: "https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app"
            },
          ],
          components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer"
                },
            },
            schemas:{
              User: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Nombre del usuario",
                  },
                  mail: {
                    type: "string",
                    description: "Correo electrónico del usuario",
                  },
                  password: {
                    type: "string",
                    description: "Contraseña del usuario",
                  },
                  role: {
                    type: "string",
                    enum: ["user", "admin", "coordinator", "teacher"],
                    description: "Rol del usuario",
                  },
                  age: {
                    type: "integer",
                    description: "Edad del usuario",
                  },
                  verified: {
                    type: "boolean",
                    description: "Si el usuario está verificado",
                  },
                },
              },
              TFG: {
                type: "object",
                properties: {
                  titulo: {
                    type: "string",
                    description: "Título del TFG",
                  },
                  asignatura: {
                    type: "string",
                    description: "Asignatura del TFG",
                  },
                  estudiante: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "Lista de estudiantes",
                  },
                  docentes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "Lista de docentes",
                  },
                  resumen: {
                    type: "string",
                    description: "Resumen del TFG",
                  },
                  palabrasClave: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "Palabras clave del TFG",
                  },
                  cursoAcademico: {
                    type: "string",
                    description: "Curso académico",
                  },
                  archivo: {
                    type: "string",
                    description: "Archivo asociado al TFG",
                  },
                  enlacesExternos: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "Enlaces externos relacionados",
                  },
                  estado: {
                    type: "string",
                    enum: ["pendiente", "aprobado"],
                    description: "Estado del TFG",
                  },
                  fechaSubida: {
                    type: "string",
                    format: "date-time",
                    description: "Fecha de subida del TFG",
                  },
                },
              },
              OTPVerificationUser: {
                type: "object",
                properties: {
                  mail: {
                    type: "string",
                    description: "Correo electrónico del usuario",
                  },
                  otp: {
                    type: "string",
                    description: "Código OTP",
                  },
                  expires: {
                    type: "string",
                    format: "date-time",
                    description: "Fecha de expiración del OTP",
                  },
                },
              },
            },
          },
        },
        apis: ["./routes/*.js"],
      };
      
    module.exports = swaggerJsdoc(options)