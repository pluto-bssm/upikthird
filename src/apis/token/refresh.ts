import { TOKEN } from "@/constants/common/constant";
import { upik } from "../instance/instance";
import { Cookie } from "../cookie/cookie";
import { Storage } from "../storage/storage";

const refreshToken = async () => {
  try {
    const { data } = await upik.patch("/auth", null, {
      headers: {
        "Refresh-Token": `${Cookie.getItem("refreshToken")}`,
      },
    });
    Storage.setItem(TOKEN.ACCESS, data.data.accessToken);
  } catch {
    localStorage.clear();
  }
};

export default refreshToken;
