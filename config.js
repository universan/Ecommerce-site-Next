const DB_URI =
  "mongodb+srv://xxx:xxx@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority";
const API =
  process.env.NODE_ENV === "production"
    ? "https://xxx.vercel.app/api"
    : "http://localhost:3000/api";
const NEXTAUTH_SECRET = "xxx";
const GOOGLE_CLIENT_ID = "xxx-xxx.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "xxx";

CLOUDINARY_CLOUD_NAME = "xxx";
CLOUDINARY_API_KEY = "xxx";
CLOUDINRAY_API_SECRET = "xxx";

STRIPE_PUBLISHABLE_KEY = "pk_test_xxx";
STRIPE_SECRET_KEY = "sk_test_xxx";
STRIPE_TAX_RATE = "txr_xxx";
STRIPE_SHIPPING_RATE = "shr_xxx";

STRIPE_WEBHOOK_SECRET = "whsec_xxx";

DOMAIN = "http://localhost:3000";

module.exports = {
  DB_URI,
  API,
  NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINRAY_API_SECRET,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_TAX_RATE,
  DOMAIN,
  STRIPE_SHIPPING_RATE,
  STRIPE_WEBHOOK_SECRET,
};
