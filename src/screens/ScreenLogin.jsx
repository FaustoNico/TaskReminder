import { useEffect, useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Cookies from "universal-cookie";
//import { Alert } from "./Alert";

export default function Login() {
  const cookies = new Cookies();
  const getCookies = cookies.get('token');
  const { login, loginWithGoogle, resetPassword, getError, errorType,user } = useAuth();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   if (getCookies === "nombre xd") {
  //     navigate("/home")
  //   }
  // })

  useEffect(() => {
    if (user) {
        navigate('/home')
    }
}, [user])

  const [userr, setUser] = useState({
    email: "",
    password: "",
  });



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(userr.email, userr.password);
      navigate("/home");
    } catch (error) {
      getError(error)
      console.log(errorType)
    }
    
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...userr, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (error) {
      getError(error)
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!userr.email) return 
    try {
      await resetPassword(userr.email);
    } catch (error) {
      getError(error)
    }
  };

  return (
      <>
    <div className="login-form">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
        <div className="mb-4">
        {errorType &&
                    <p>
                        {errorType}
                    </p>}
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Contraseña
          </label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*****************"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            style={ {margin: 20} }
          >
            Ingresar
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#!"
            onClick={handleResetPassword}
          >
            Has olvidado tu contraseña?
          </a>
        </div>
      </form>
      <div className="text-center"> 
      <button
        onClick={handleGoogleSignin}
        className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
      >
        Google login
      </button>
      </div>
      <p className="my-4 text-sm flex justify-between px-3">
        No tienes una cuenta?
        <Link to="/" className="text-blue-700 hover:text-blue-900">
          Crear una
        </Link>
      </p>
    </div>
    </>
  );
    }