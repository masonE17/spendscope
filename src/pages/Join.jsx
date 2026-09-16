import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Join() {
    const [signIn, setSignIn] = useState(true);
    return (
        <div className="bg-[rgb(0,12,31)] w-full min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-130 mx-auto border-solid border-gray-600 border rounded-md bg-[rgb(1,16,39)] flex flex-col items-center justify-center">
                {signIn ? (
                    <div className="w-full flex flex-row justify-center items-center gap-12 mt-5 mb-5">
                        <div>
                            <p className="text-white font-bold text-[19px]">Sign In</p>
                            <div className="border-b-2 border-[#1e90ff] w-full"></div>
                        </div>
                        <button onClick={() => setSignIn(false)}><p className="text-gray-400 font-bold text-[19px] hover:text-[#1e90ff]">Sign Up</p></button>
                    </div>
                ) : (
                    <div className="w-full flex flex-row justify-center items-center gap-12 mt-5 mb-5">
                        <button onClick={() => setSignIn(true)}><p className="text-gray-400 font-bold text-[19px] hover:text-[#1e90ff]">Sign In</p></button>
                        <div>
                            <p className="text-white font-bold text-[19px]">Sign Up</p>
                            <div className="border-b-2 border-[#1e90ff] w-full"></div>
                        </div>
                    </div>
                )}
                <div>
                    <img src="src/assets/SpendScope_Logo.png" alt="logo" className="w-60 h-60 rounded-full" />
                </div>
                {signIn ? (
                    <>
                        <div className="w-full p-5 flex flex-col justify-center items-center gap-5">
                            <input type="text" placeholder="Email" className="w-[85%] bg-white border-solid border-gray-600 border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e90ff]" />
                            <input type="text" placeholder="Password" className="w-[85%] bg-white border-solid border-gray-600 border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e90ff]" />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-5 mb-10">
                            <button className="w-50 bg-[#1e90ff] text-white p-2 text-[16px] rounded-[5px] hover:bg-[#0d7ae9] hover:cursor-pointer">Sign In</button>
                            <button className="w-50 text-gray-400 p-2 text-[16px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:border-[#1e90ff] hover:cursor-pointer"><FontAwesomeIcon icon={faLock} /> Forgot Password</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full p-5 flex flex-col justify-center items-center gap-5">
                            <input type="text" placeholder="Username" className="w-[85%] bg-white border-solid border-gray-600 border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e90ff]" />
                            <input type="text" placeholder="Email" className="w-[85%] bg-white border-solid border-gray-600 border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e90ff]" />
                            <input type="text" placeholder="Password" className="w-[85%] bg-white border-solid border-gray-600 border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e90ff]" />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-5 mb-10">
                            <button className="w-50 bg-[#1e90ff] text-white p-2 text-[16px] rounded-[5px] hover:bg-[#0d7ae9] hover:cursor-pointer">Sign Up</button>
                            <div className="w-[80%]">
                                <p className="text-center text-gray-400 text-[16px]">By continuing, you agree to our <u className="text-[#1e90ff]">Terms of Service</u> and <u className="text-[#1e90ff]">Privacy Policy</u></p>
                            </div>
                        </div>
                    </>
                )}
                <Link to="/">
                    <p className="text-[16px] text-gray-400 mb-10 hover:text-[#1e90ff] hover:cursor-pointer"><FontAwesomeIcon icon={faArrowLeft} /> Back to Home</p>
                </Link>
            </div>
        </div>
    );
}