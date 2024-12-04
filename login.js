// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqtpyWKoA4uoKfeErgMJptiU_u_Gp5myU",
    authDomain: "kumar-ff327.firebaseapp.com",
    projectId: "kumar-ff327",
    storageBucket: "kumar-ff327.appspot.com",
    messagingSenderId: "521119129836",
    appId: "1:521119129836:web:fa175aec28617c916f05c9",
    measurementId: "G-JQ6DB2WGYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    // Log In Function
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get user info
        const email = emailField.value;
        const password = passwordField.value;

        // Sign in the user
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Logged in successfully
                alert('User logged in successfully!');
                console.log(userCredential);
                window.location.href = 'task3.html'; // Redirect to dashboard or tasks page
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                alert(error.message);
            });
    });
});
