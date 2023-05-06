export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  avatar: string;
  password: string;
  role: 'admin' | null | string;
  birthdate: Date;
  registeredAt: Date;
};
