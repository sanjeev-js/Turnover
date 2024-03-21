export const generateOTP = () => {
    // Generate a random 8-digit number
    const otp = Math.floor(10000000 + Math.random() * 90000000);
    return otp.toString().substring(0, 8); // Return only the first 8 digits
}

    