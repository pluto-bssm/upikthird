import { TOKEN } from "@/constants/common/constant";
import { Storage } from "../storage/storage";

const authorization = () => {
  console.log(Storage.getItem(TOKEN.ACCESS));
  return {
    headers: {
      Authorization: `Bearer ${Storage.getItem(TOKEN.ACCESS)}`,
    },
  };
};

authorization.FormData = () => {
  return {
    headers: {
      Authorization: `Bearer ${Storage.getItem(TOKEN.ACCESS)}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

export default authorization;
