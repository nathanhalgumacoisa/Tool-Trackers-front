import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const apiKey = "sua_api_key"; // Substitua com sua API Key
const authDomain = "seu_auth_domain"; // Substitua com seu Auth Domain
const projectId = "seu_project_id"; // Substitua com seu Project ID
const storageBucket = "seu_storage_bucket"; // Substitua com seu Storage Bucket
const messagingSenderId = "seu_messaging_sender_id"; // Substitua com seu Messaging Sender ID
const appId = "seu_app_id"; // Substitua com seu App ID
const measurementId = "seu_measurement_id";

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };