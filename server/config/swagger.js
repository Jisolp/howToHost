const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "HowToHost API",
      version: "1.0.0",
      description: "Simple API for managing reservations, tables, sections, and servers",
    },
    servers: [
      {
        url: "http://localhost:5001/api",
      },
    ],
    paths: {
      "/reservation": {
        post: {
          summary: "Create a reservation",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    customer_name: { type: "string" },
                    phone_number: { type: "string" },
                    time: { type: "string" },
                    party: { type: "integer" },
                    isWalkIn: { type: "boolean" },
                  },
                  required: ["customer_name", "phone_number", "party"],
                },
              },
            },
          },
          responses: {
            201: {
              description: "Reservation created",
            },
          },
        },
        get: {
          summary: "Get all reservations",
          responses: {
            200: {
              description: "List of reservations",
            },
          },
        },
      },
      "/reservation/{customer_name}": {
        get: {
          summary: "Get reservation by customer name",
          parameters: [
            {
              name: "customer_name",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Reservation details",
            },
          },
        },
        put: {
          summary: "Update reservation by customer name",
          parameters: [
            {
              name: "customer_name",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
          responses: {
            200: {
              description: "Reservation updated",
            },
          },
        },
        delete: {
          summary: "Delete reservation by customer name",
          parameters: [
            {
              name: "customer_name",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Reservation deleted",
            },
          },
        },
      },
    },
  };
  
  module.exports = swaggerDocument;
  