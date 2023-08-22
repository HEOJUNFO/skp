import CryptoJS from "crypto-js";

const cryptoUtil = () => {
  const aes256SecretKey = "0123456789abcdef0123456789abcdef"; // key 값 32 바이트

  const aes256Encode = (data) => {
    // [aes 인코딩 수행 실시 : cbc 모드]
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(aes256SecretKey), {
      iv: CryptoJS.enc.Utf8.parse(""), // [Enter IV (Optional) 지정 방식]
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC, // [cbc 모드 선택]
    });
    return cipher.toString();
  };

  const aes256Decode = (data) => {
    // [aes 디코딩 수행 실시 : cbc 모드]
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(aes256SecretKey), {
      iv: CryptoJS.enc.Utf8.parse(""), // [Enter IV (Optional) 지정 방식]
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC, // [cbc 모드 선택]
    });
    return cipher.toString(CryptoJS.enc.Utf8);
  };

  return {
    aes256Encode,
    aes256Decode,
  };
};

export default cryptoUtil;