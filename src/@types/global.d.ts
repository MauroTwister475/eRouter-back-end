declare namespace Express {
  interface Request {
    user: {
      id: string;
      userType: "Admin" | "Driver" | "Responsable";
    };
  }
}