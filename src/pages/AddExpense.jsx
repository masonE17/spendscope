import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import MonthlyBudget from "../components/MonthlyBudget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function AddExpense() {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric'
    });
    const [isAccessingAccount, setIsAccessingAccount] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchUser();
    }, []);

    async function fetchUser() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.log("Error: User not found");
            return;
        }
        let metaData = user?.user_metadata;
        setUserName(formatUserName(metaData.userName));
        setUserEmail(user.email);
    }
    
    function formatUserName(name) {
        if (!name) {
            console.log("Error: User name is undefined");
            return "User";
        }
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error.message);
        }
        navigate("/");
    }

    return (
        <div className="w-full mb-15">

            {/*Accessing Acount Section*/}
            {isAccessingAccount && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-110 flex items-center justify-center">
                    <div className="w-110 bg-[rgb(0,12,31)] border border-gray-600 rounded-[5px] p-7">
                        <div className="w-full flex flex-col justify-center items-start gap-1">
                            <p className="text-white text-[18px] font-bold">Account Information</p>
                            <p className="text-gray-400 text-[14px] -mt-1 mb-3">Manage your account settings</p>
                            <p className="text-white text-[16px]">Username: { userName }</p>
                            <p className="text-white text-[16px]">Email: { userEmail }</p>
                            <div className="w-full border-b-2 border-gray-600 mt-3"></div>
                            <div className="w-full flex flex-row justify-end items-center gap-4 mt-4">
                                <button className="bg-[#1e90ff] text-white px-3 py-2 text-[12px] rounded-[5px] hover:bg-[#0d7ae9] hover:cursor-pointer" onClick={signOut}>Sign Out</button>
                                <button className="text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]" onClick={() => setIsAccessingAccount(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/*Header Section*/}
            <div className="w-full sticky top-0 bg-[rgb(0,12,31)] opacity-98 z-100">
                <div className="grid grid-cols-3 items-center max-w-300 m-auto py-4 px-10">
                    <h1 className="text-[#1e90ff] font-bold text-[22px] justify-self-start">SpendScope</h1>
                    <div className="flex flex-row justify-center gap-4 items-center text-gray-400 text-[14px] justify-self-center">
                        <div className="group flex flex-col justify-center items-center">
                            <Link to="/">
                                <button className="text-center group-hover:text-white">Home</button>
                            </Link>
                            <div className="w-full border-b-2 border-transparent group-hover:border-[#1e90ff] rounded-[5px]"></div>
                        </div>
                        <div className="group flex flex-col justify-center items-center">
                            <Link to="/dashboard">
                                <button className="text-center group-hover:text-white">Dashboard</button>
                            </Link>
                            <div className="w-full border-b-2 border-transparent group-hover:border-[#1e90ff] rounded-[5px]"></div>
                        </div>
                        <div className="group flex flex-col justify-center items-center">
                            <p className="text-center text-white">Add Expense</p>
                            <div className="w-full border-b-2 border-[#1e90ff] rounded-[5px]"></div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-4 justify-self-end">
                        <p className="text-white">{ formatter.format(date) }</p>
                        <button onClick={() => setIsAccessingAccount(true)}>
                            <div className="bg-[#1e90ff] w-8 h-8 rounded-full flex justify-center items-center hover:bg-[#0d7ae9] hover:cursor-pointer">
                                <p className="text-white font-bold">{ userName.charAt(0).toUpperCase() }</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/*SubHeader Section*/}
            <div className="w-full max-w-300 m-auto">
                <div className="flex flex-row justify-between items-center p-2">
                    <div className="flex flex-col justify-center items-start">
                        <p className="text-white text-[30px] font-bold">Add Expense</p>
                        <p className="text-gray-400 text-[15px]">Log a new purchase and keep your budget in check.</p>
                    </div>
                    <Link to="/dashboard">
                        <button className="text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]"><FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard</button>
                    </Link>
                </div>
            </div>

            {/*Add Expense Section*/}
            <div className="w-full max-w-300 m-auto">
                <div className="flex flex-row justify-start items-start py-3 px-2 gap-5">
                    <div className="w-180 h-140 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col items-start gap-1">
                        <div className="w-full flex flex-col justify-center items-center gap-2">
                            <div className="w-full flex flex-col justify-center items-start gap-1">
                                <p className="text-white text-[18px] font-bold">Expense Details</p>
                                <p className="text-gray-400 text-[14px] -mt-1 mb-3">Fill in the details of your transaction</p>
                            </div>
                            <div className="w-full flex flex-col justify-center items-start gap-1 mb-1">
                                <p className="text-gray-400 text-[14px]">Amount</p>
                                <input type="text" placeholder="Enter Amount" className="w-full bg-[rgb(0,12,31)] border border-gray-600 text-white text-[14px] focus:outline-none px-2 py-3 rounded-[5px]" />
                            </div>
                            <div className="w-full flex flex-col justify-center items-start gap-1 mb-1">
                                <p className="text-gray-400 text-[14px]">Location</p>
                                <input type="text" placeholder="Enter Location" className="w-full bg-[rgb(0,12,31)] border border-gray-600 text-white text-[14px] focus:outline-none px-2 py-3 rounded-[5px]" />
                            </div>
                            <div className="w-full flex flex-col justify-center items-start gap-1 mb-4">
                                <p className="text-gray-400 text-[14px]">Category</p>
                                <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
                                    <button className="w-full h-20 text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]">
                                        <div className="flex flex-col justify-center items-center gap-1">
                                            <div className="px-2 py-1 bg-[#1e90ff]/20 rounded-[5px] text-[#1e90ff] text-[20px]">
                                                <FontAwesomeIcon icon={faCoins} />
                                            </div>
                                            <p className="text-white text-[14px]">Income</p>
                                        </div>
                                    </button>
                                    <button className="w-full h-20 text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]">
                                        <div className="flex flex-col justify-center items-center gap-1">
                                            <div className="px-2 py-1 bg-[#1e90ff]/20 rounded-[5px] text-[#1e90ff] text-[20px]">
                                                <FontAwesomeIcon icon={faCartShopping} />
                                            </div>
                                            <p className="text-white text-[14px]">Groceries</p>
                                        </div>
                                    </button>
                                    <button className="w-full h-20 text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]">
                                        <div className="flex flex-col justify-center items-center gap-1">
                                            <div className="px-2 py-1 bg-[#1e90ff]/20 rounded-[5px] text-[#1e90ff] text-[20px]">
                                                <FontAwesomeIcon icon={faBagShopping} />
                                            </div>
                                            <p className="text-white text-[14px]">Shopping</p>
                                        </div>
                                    </button>
                                    <button className="w-full h-20 text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]">
                                        <div className="flex flex-col justify-center items-center gap-1">
                                            <div className="px-2 py-1 bg-[#1e90ff]/20 rounded-[5px] text-[#1e90ff] text-[20px]">
                                                <FontAwesomeIcon icon={faBowlFood} />
                                            </div>
                                            <p className="text-white text-[14px]">Food</p>
                                        </div>
                                    </button>
                                    <button className="w-full h-20 text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]">
                                        <div className="flex flex-col justify-center items-center gap-1">
                                            <div className="px-2 py-1 bg-[#1e90ff]/20 rounded-[5px] text-[#1e90ff] text-[20px]">
                                                <FontAwesomeIcon icon={faGasPump} />
                                            </div>
                                            <p className="text-white text-[14px]">Transport</p>
                                        </div>
                                    </button>
                                    <button className="w-full h-20 text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]">
                                        <div className="flex flex-col justify-center items-center gap-1">
                                            <div className="px-2 py-1 bg-[#1e90ff]/20 rounded-[5px] text-[#1e90ff] text-[20px]">
                                                <FontAwesomeIcon icon={faEllipsis} />
                                            </div>
                                            <p className="text-white text-[14px]">Other</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="w-full border-b-2 border-gray-600"></div>
                            <div className="w-full flex flex-row justify-end items-center gap-4 mt-2">
                                <button className="text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]">Cancel</button>
                                <button className="bg-[#1e90ff] text-white px-3 py-2 text-[12px] rounded-[5px] hover:bg-[#0d7ae9] hover:cursor-pointer"><FontAwesomeIcon icon={faPlus} /> Add Expense</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center px-2 gap-5">
                        <div className="w-125 h-45 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-center">
                            <MonthlyBudget />
                            <div className="w-full border-b-2 border-gray-600 my-2"></div>
                            <div className="w-full flex flex-row justify-between items-center">
                                <p className="text-gray-400 text-[14px]">After this expense</p>
                                <p className="text-[#1e90ff] text-[14px] font-bold">ONCHANGE TEXT</p>
                            </div>
                        </div>
                        <div className="w-125 h-50 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col items-start gap-1">
                            <div className="w-full flex flex-row justify-between items-center">
                                <p className="text-white text-[18px] font-bold">Recent Transactions</p>
                                <p className="text-[#1e90ff] text-[14px] font-bold hover:text-[#0d7ae9] hover:cursor-pointer">View All <FontAwesomeIcon icon={faArrowRight} /></p>
                            </div>
                            <div className="w-full flex flex-col gap-4 mt-2">
                                <div className="w-full flex flex-col gap-2">
                                    <div className="w-full flex flex-row justify-between items-center">
                                        <div className="flex flex-row justify-center items-center gap-3">
                                            <div className="px-2 py-1 bg-[#1e90ff]/20 rounded-[5px] text-[#1e90ff] text-[20px]">
                                                <FontAwesomeIcon icon={faCartShopping} />
                                            </div>
                                            <div className="w-full flex flex-col justify-center items-start">
                                                <p className="text-white text-[14px]">Whole Foods Market</p>
                                                <p className="text-gray-400 text-[12px]">Groceries - September 18</p>
                                            </div>
                                        </div>
                                        <p className="text-red-500 text-[14px] font-bold">- $84.20</p>
                                    </div>
                                    <div className="w-full border-b-2 border-gray-400"></div>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <div className="w-full flex flex-row justify-between items-center">
                                        <div className="flex flex-row justify-center items-center gap-3">
                                            <div className="px-2 py-1 bg-[#1e90ff]/20 rounded-[5px] text-[#1e90ff] text-[20px]">
                                                <FontAwesomeIcon icon={faGasPump} />
                                            </div>
                                            <div className="w-full flex flex-col justify-center items-start">
                                                <p className="text-white text-[14px]">Shell Gas Station</p>
                                                <p className="text-gray-400 text-[12px]">Transportation - September 14</p>
                                            </div>
                                        </div>
                                        <p className="text-red-500 text-[14px] font-bold">- $51.34</p>
                                    </div>
                                    <div className="w-full border-b-2 border-gray-400"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}