// import { createContext, useState } from "react";



// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);


//     return(
//         <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthContext;

import { createContext, useState, useEffect } from "react";
import { getMe } from "./servises/auth.api"; // path adjust kar lena

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();

        console.log("GET ME RESPONSE", data);

        setUser(data.user);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;