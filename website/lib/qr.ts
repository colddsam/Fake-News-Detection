import QRCode from "qrcode";

export const generateQRCode = async (text: string): Promise<string> => {
  return await QRCode.toDataURL(text, { width: 100 });
};
