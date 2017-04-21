export const schema = {
  "type": "object",
  "properties": {
    "art": {
      "type": "array",
      "minItems": 3,
      "maxItems": 8,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
          "year": {
            "type": "string",
            "chance": {
              "year": {
                "min": 100,
                "max": 2017
              }
            }
          },
          "title": {
            "type": "string",
            "faker": "name.title"
          },
          "lat": {
            "type": "number",
            "faker": "address.latitude"
          },
          "lon": {
            "type": "number",
            "faker": "address.longitude"
          },
          "location": {
            "type": "string",
            "faker": "address.city"
          }
        },
        "required": ["id", "year", "title", "lat", "lon", "location"]
      }
    }
  },
  "required": ["art"]
};
