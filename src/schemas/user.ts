import z from "zod";

export const userChema = z.object({
  username: z.string(), 
  email: z.string(), 
  password: z.string(), 
  picture: z.string(), 
  userType: z.string()
});

