import { useContext, useEffect } from "react";
import { register, login, getMe, logout } from "../servises/auth.api";
import AuthContext from "../auth.context";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handelRegister = async ({ username, email, password }) => {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  };

  //   const handelLogin = async ({ username, email, password }) => {
  //     setLoading(true);
  //     const data = await login({ username, email, password });
  //     setUser(data.user);
  //     setLoading(false);
  //   };

  const handelLogin = async ({ username, email, password }) => {
    try {
      setLoading(true);

      const data = await login({ username, email, password });

      console.log(data);

      setUser(data.user);

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //   const handelGetMe = async () => {
  //     setLoading(true);
  //     const data = await getMe();
  //     setUser(data.user);
  //     setLoading(false);
  //   };

 const handelGetMe = async () => {

  try {

    setLoading(true);

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



  // const handelLogOut = async () => {
  //    console.log("LOGOUT CALLED");
  //   setLoading(true);
  //   const data = await logout();
  //   setUser(null);
  //   setLoading(false);
  // };

//  const handelLogOut = async () => {
//   try {
//     setLoading(true);

//     await logout();

//     setUser(null);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setLoading(false);
//   }
// };

const handelLogOut = async () => {
  try {
    setLoading(true);

    console.log("Before Logout");

    const data = await logout();

    console.log("Logout Response:", data);

    setUser(null);

    console.log("User set to null");
  } catch (error) {
    console.log("Logout Error:", error);
  } finally {
    setLoading(false);
  }
};

  // useEffect(() => {
  //   handelGetMe();
  // }, []);

  return {
    user,
    loading,
    handelRegister,
    handelLogin,
    handelGetMe,
    handelLogOut,
  };
};
