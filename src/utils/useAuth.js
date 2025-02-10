import { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "../Firebase/firebaseConfig";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const userName = email.split("@")[0]; // Extract username before @

      const userData = {
        name: userName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      localStorage.removeItem("user");
    });
  };

  return { user, login, logout };
};

export default useAuth;
