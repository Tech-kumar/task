// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

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
    const signupForm = document.getElementById('signup-form');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    // Sign Up Function
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get user info
        const email = emailField.value;
        const password = passwordField.value;

        // Sign up the user
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up successfully
                alert('User signed up successfully!');
                console.log(userCredential);
                window.location.href = 'login.html'; // Redirect to login page
            })
            .catch((error) => {
                console.error('Error signing up:', error);
                alert(error.message);
            });
    });
});
