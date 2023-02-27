import fs from "fs";
import { generateQR } from "./qr_code.js";

export const imageQrCode = async (chat_id, { first_name, phone_number }) => {
  const imgdata = await generateQR({ first_name, phone_number });
  try {
    const path = "./images/" + chat_id + ".png";
    const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");
    fs.writeFileSync(path, base64Data, { encoding: "base64" });
    return path;
  } catch (e) {
    console.log(e.message);
  }
};
