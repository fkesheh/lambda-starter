
export const router = async (event) => {
  const method = event.requestContext.http.method;
  const path = event.requestContext.http.path;  

  const fileName = `./api${path.toLowerCase()}/${method.toLowerCase()}.mjs`;
  try {
    const routeHandler = await import(fileName).then(module => module.default);
    const response = await routeHandler(event);
    console.log(`${method} ${path} ${response.statusCode}`);
    return response;
  } catch (error) {
    if (error.code === 'ERR_MODULE_NOT_FOUND' && error.url?.includes('api/')) {
      console.log(`${method} ${path} 404`);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: method + ' ' + path + ' Not found' })
      };
    } else {
      console.error(error);
      console.log(`${method} ${path} 500`);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message })
      };
    }
  }
};
