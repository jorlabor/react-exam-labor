import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyANwuUnXgtm8yMXlHS2NjffpNK3NANdlG8",
        authDomain: "todo-list-102ea.firebaseapp.com",
        projectId: "todo-list-102ea",
        storageBucket: "todo-list-102ea.appspot.com",
        messagingSenderId: "432820064585",
        appId: "1:432820064585:web:86c03f1cad52093579ca98"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)