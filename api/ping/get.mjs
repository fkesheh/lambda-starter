export default async (event) => {
    return { statusCode: 200, body: JSON.stringify({ message: "pong" }) }
  }