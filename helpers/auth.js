import { compare, hash } from "bcryptjs";

export async function hashPassword(password) {
  const hashPassword = await hash(password, 8);

  return hashPassword;
}

export async function verifyPassword(password, hashpassword) {
  const isValid = await compare(password, hashpassword);
  return isValid;
}
