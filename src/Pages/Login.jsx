import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Providers/AuthProvider';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';

const Login = () => {

    const [loginEmail, setLoginEmail] = useState('');

    const location = useLocation();

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const {
        signInWithEmailAndPasswordFunc,

        signInWithGoogle,
        
        setLoading,
        setUser,
       
    } = useContext(AuthContext);
    const handleSignin = (event) => {
        event.preventDefault();
        const email = event.target.email?.value;
        const password = event.target.password?.value;
        signInWithEmailAndPasswordFunc(email, password)
            .then((res) => {
                
                setLoading(false);


                setUser(res.user);

                event.target.reset();
                navigate(location?.state || '/');

            })
            .catch((e) => {
                
                event.target.reset();
                toast.error(e.message);
            });
    };

    const handleGoogleSignin = () => {
        
       
        signInWithGoogle()
            .then((res) => {
                
                setLoading(false);
                setUser(res.user);
                navigate(location?.state || '/');
                toast.success("Signin successful");
            })
            .catch((e) => {
                toast.error(e.message);
            });
    };

    return (
        <div className='flex justify-center items-center flex-col space-y-10 mx-auto'>
            <h1 className='font-bold text-5xl mt-20 text-pink-700'>LogIn Here</h1>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body bg-pink-50">
                    <form onSubmit={handleSignin}>
                        <fieldset className="fieldset">
                            {/* email */}
                            <label className="label">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="input"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />




                            <div className='relative'>
                                {/* password */}
                                <label className="label">Password</label>
                                <input name='password' type={show ? "text" : "password"} className="input" placeholder="Password" />
                                <span
                                    onClick={() => setShow(!show)}
                                    className="absolute right-8 top-8 cursor-pointer z-50"
                                >
                                    {show ? <FaEye /> : <IoEyeOff />}
                                </span>
                            </div>


                            {/* buttons */}
                            <div>
                                <Link
                                    to="/auth/forget-password"
                                    state={{ email: loginEmail }}
                                    className="link link-hover"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <button type='submit' className="btn btn-neutral mt-4 bg-pink-700 text-white">Login</button>
                            <h2 className='font-semibold text-center text-md pt-5'>Don't Have an Account? <Link className='text-pink-700' to='/auth/register'>Register</Link> </h2>


                        </fieldset>

                    </form>
                    <button onClick={handleGoogleSignin}
                        type="button"
                        
                        className="flex items-center justify-center gap-3 mt-5 shadow-2xl bg-pink-700 text-white px-5 py-2 rounded-lg w-full font-semibold  cursor-pointer"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={2000} />

        </div>
    );
};

export default Login;