import { router } from './router.mjs';
import dotenv from 'dotenv';

dotenv.config();

export const handler = async (event) => {

   const API_KEY = "Bearer " + process.env.API_KEY;
   const apiKey = event.headers['authorization'];
   if (apiKey !== API_KEY) {
     return {
       statusCode: 401,
       body: JSON.stringify({ error: "Unauthorized" })
     };
   }

   return await router(event);
};

