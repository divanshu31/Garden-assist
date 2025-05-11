import { auth, db } from "../firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const signupForm = document.getElementById("signup-form"); // Changed to form
  const logoutBtn = document.getElementById("logout-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.open("dashboard.html", "_blank");
      } catch (error) {
        document.getElementById("login-message").innerText = error.message;
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent default form submission

      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const role = document.getElementById("role").value;
      const messageElement = document.getElementById("signup-message");

      try {
        // Disable button during processing
        const signupBtn = document.getElementById("signup-btn");
        signupBtn.disabled = true;
        signupBtn.textContent = "Creating account...";

        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Store user data in Firestore
        await setDoc(doc(db, "users", userCredentials.user.uid), {
          email,
          role,
        });

        // Show success message
        messageElement.innerText = "Account created successfully!";
        messageElement.style.color = "green";

        // Reset the form
        signupForm.reset();

        // Redirect after short delay
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } catch (error) {
        messageElement.innerText = error.message;
        messageElement.style.color = "red";
      } finally {
        // Re-enable button
        const signupBtn = document.getElementById("signup-btn");
        if (signupBtn) {
          signupBtn.disabled = false;
          signupBtn.textContent = "Sign Up";
        }
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
      window.location.href = "index.html";
    });
  }
});
