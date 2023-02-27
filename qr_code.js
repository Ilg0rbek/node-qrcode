import QRCode from "qrcode";

export const generateQR = async ({ first_name, phone_number }) => {
  try {
    return await QRCode.toDataURL(
      `Full name: ${first_name}\nPhone number: +${phone_number}`
    );
  } catch (err) {
    console.error(err.message);
  }
};
