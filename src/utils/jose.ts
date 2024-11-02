import * as jose from "jose";

const SECRET_KEY = process.env.SECRET_KEY;

const alg = "HS256";

export const createTokenJose = async (payload: jose.JWTPayload) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const tokenJose = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .sign(secretKey);

  return tokenJose;
};

export const verifyTokenJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
};
