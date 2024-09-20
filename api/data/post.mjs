import pgPool from "../../utils/pg.mjs";

export default async (event) => {
  return { statusCode: 200, body: JSON.stringify({ message: "Data received from post! ", received: event.body }) }
}