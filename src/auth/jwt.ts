import jwt from "jsonwebtoken";
import { getInitials } from "../utils";
const jwt_secret = process.env["JWT_SECRET"];

if (!jwt_secret  || jwt_secret === "") {
  console.log("JWT_SECRET not set");
  process.exit(1);
}

interface JWTPayload {
  uid: number;
  ini: string;
  registered: boolean;
}

export const checkJwt = async (token: string) => {
  const decoded = jwt.verify(token, jwt_secret) as JWTPayload;
  const id = decoded.uid;
  const ini = decoded.ini;
  const registered = decoded.registered;
  return { id, ini, registered };
};

interface GenerateJwtInput {
  id: number;
  registered: boolean;
  user_name: string;
}

export const generateJwt = ({
  id,
  user_name,
  registered,
}: GenerateJwtInput) => {
  const payload: JWTPayload = {
    uid: id,
    ini: getInitials(user_name),
    registered,
  };
  const jwt_options = {
    expiresIn: "100d",
  };
  const token = jwt.sign(payload, jwt_secret, jwt_options);

  return token;
};
