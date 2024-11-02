import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  console.log(
    "===== ini hash password di bcrypt =====",
    bcrypt.hashSync(password)
  );
  return bcrypt.hashSync(password);
};

export const comparePassword = (password: string, hashedPassword: string) => {
  console.log("===== ini data password di bcrypt =====", password);
  console.log("===== ini data hashed password di bcrypt =====", hashedPassword);

  console.log(
    "===== ini compare password di bcrypt =====",
    bcrypt.compareSync(password, hashedPassword)
  );

  return bcrypt.compareSync(password, hashedPassword);
};
