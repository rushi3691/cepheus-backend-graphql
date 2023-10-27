
const email_pass = [
  ["uuid_1", "raj@gmail.com", "raj", "123"],
  ["uuid_2", "temp@gmail.com", "temp", "123"],
  ["uuid_3", "pink@gmail.com", "pink", "123"],
];

export const commonAuth = async (idToken: string) => {
  const { email, password } = JSON.parse(idToken);
  const user = email_pass.find((user) => user[1] === email);
  if (!user) {
    throw new Error("user not found");
  }
  if (user[3] !== password) {
    throw new Error("password incorrect");
  }
  return { user_uuid: user[0], email: user[1], user_name: user[2] };
};
