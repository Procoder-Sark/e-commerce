const speakeasy = require('speakeasy');
const QRcode = require('qrcode');

const encoding = 'base32';

const generateQRCode = async (username) => {
    const { base32: secret } = speakeasy.generateSecret();
    console.log('Secret:', secret);

    const otpauth_url = speakeasy.otpauthURL({
        secret,
        label: username,
        encoding,
        issuer: 'Amazecart',
    });

    const qrCode = await QRcode.toDataURL(otpauth_url);
    console.log('QR Code:', qrCode);

    return { qrCode, secret };
}


const verifyOtp = (secret, otp) => {
    const isVerified = speakeasy.totp.verify({
        secret,
        encoding,
        token: otp,
    })

    console.log('Is Verified:', isVerified);
    return isVerified;
};

// generateQRCode('sark');

module.exports = {
    generateQRCode,
    verifyOtp,
};

// let secret = "ORHHGQLREZ4FEJB6M53DOY3TEMYEGKKJJI3DK7JWHBAGSS3ZKVFQ";

// verifyToken(secret, "021638");