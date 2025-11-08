
import { use, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Providers/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Register = () => {
    const [show, setShow] = useState(false);


    const { createUser, setUser, signInWithGoogle, setLoading, } = use(AuthContext);

    const [successMsg, setSuccessMsg] = useState("");

    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long!");

            return;
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must include at least one uppercase letter!");
            setSuccessMsg("");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError("Password must include at least one lowercase letter!");
            setSuccessMsg("");
            return;
        }

        
        createUser(email, password)
            .then((res) => {
                const currentUser = res.user;

               
                updateProfile(currentUser, {
                    displayName: name,
                    photoURL: photo,
                })
                    .then(() => {
                        setUser({
                            ...currentUser,
                            displayName: name,
                            photoURL: photo,
                        });

                        toast.success("✅ Account created successfully!");
                        form.reset();
                        navigate('/');
                    })
                    .catch((err) => toast.error(err.message));
            })
            .catch((error) => {
                toast.error(error.message);
                setPasswordError("")
                event.target.reset();
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
        <div className='flex justify-center items-center flex-col space-y-5 mx-auto '>
            <h1 className='font-bold text-5xl mt-5 text-pink-700'>Register Here</h1>
            <div className="card bg-pink-50 w-full max-w-sm shrink-0 shadow-2xl pb-5">

                <form onSubmit={handleRegister} className="card-body">
                    <fieldset className="fieldset">

                      
                        <label className="label">Name</label>
                        <input name='name' type="text" className="input" placeholder="Name" required />


                      
                        <label className="label">Photo URL</label>
                        <input name='photo' type="text" className="input" placeholder="Photo URL" required />

                      
                        <label className="label">Email</label>
                        <input name='email' type="email" className="input" placeholder="Email" required />
                      
                        <div className='relative'>
                            <label className="label">Password</label>
                            <input name='password' type={show ? "text" : "password"} className="input" placeholder="Password" required />
                            <span
                                onClick={() => setShow(!show)}
                                className="absolute right-8 top-8 cursor-pointer z-50"
                            >
                                {show ? <FaEye /> : <IoEyeOff />}
                            </span>
                        </div>


                      
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                        {successMsg && <p className="text-green-500 text-sm mt-1">{successMsg}</p>}


                     
                        <button type='submit' className="btn btn-neutral mt-2 bg-pink-700 text-white">Register</button>
                        <h2 className='font-semibold text-center text-md pt-2'>Already Have an Account? <Link className='text-pink-700' to='/auth/login'>Login</Link> </h2>
                    </fieldset>
                </form>

                <button onClick={handleGoogleSignin}
                    type="button"
                    // onClick={handleGoogleSignin}
                    className="flex items-center justify-center gap-3   shadow-2xl bg-pink-700 text-white px-5 py-2 rounded-lg w-11/12 mx-auto font-semibold  cursor-pointer"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </button>

            </div>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default Register;