import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CategoryBreakdown from "../components/CategoryBreakdown";
import IncomeVsExpenses from "../components/IncomeVsExpenses";
import MonthlyBudget from "../components/MonthlyBudget";
import FinancialOverview from "../components/FinancialOverview";

export default function Dashboard() {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric'
    });
    return (
        <div className="w-full mb-15">

            {/* Header Section */}
            <div className="w-full sticky top-0 bg-[rgb(0,12,31)] opacity-98 z-100">
                <div className="flex flex-row justify-evenly items-center max-w-350 m-auto py-4">
                    <h1 className="text-[#1e90ff] font-bold text-[22px]">SpendScope</h1>
                    <div className="flex flex-row justify-center gap-4 items-center text-gray-400 text-[14px]">
                        <div className="group flex flex-col justify-center items-center">
                            <Link to="/">
                                <button className="text-center group-hover:text-white">Home</button>
                            </Link>
                            <div className="w-full border-b-2 border-transparent group-hover:border-[#1e90ff] rounded-[5px]"></div>
                        </div>
                        <div className="group flex flex-col justify-center items-center">
                            <p className="text-center text-white">Dashboard</p>
                            <div className="w-full border-b-2 border-[#1e90ff] rounded-[5px]"></div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-4">
                        <p className="text-white">{ formatter.format(date) }</p>
                        <p className="text-white">User ICON</p>
                    </div>
                </div>

                {/* Sub Header Section */}
                <div className="w-full max-w-300 m-auto">
                    <div className="flex flex-row justify-between items-center py-2 px-2">
                        <div className="flex flex-col justify-center items-start">
                            <p className="text-white text-[30px] font-bold">Dashboard</p>
                            <p className="text-gray-400 text-[15px]">Welcome back USER! Here's where you can manage your finances.</p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-4">
                            <button className="text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]">Edit Budget</button>
                            <button className="bg-[#1e90ff] text-white px-3 py-2 text-[12px] rounded-[5px] hover:bg-[#0d7ae9] hover:cursor-pointer"><FontAwesomeIcon icon={faPlus} /> Add Expense</button>
                        </div>
                    </div>
                </div>

                {/*User Financial Overview Section*/}
                <div className="w-full max-w-300 m-auto">
                    <div className="flex flex-row justify-center items-center py-3 px-2 gap-5">
                        <FinancialOverview />
                    </div>
                </div>

                {/*Chart Section*/}
                <div className="w-full max-w-300 m-auto">
                    <div className="flex flex-row justify-center items-center py-3 px-2 gap-5">
                        <div className="w-150 h-95 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col items-start gap-1">
                            <p className="text-white text-[18px] font-bold">Category Breakdown</p>
                            <p className="text-gray-400 text-[14px] -mt-1 mb-3">{ formatter.format(date) }</p>
                            <CategoryBreakdown />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-5">
                            <div className="w-150 h-60 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col items-start gap-1">
                                <p className="text-white text-[18px] font-bold">Income vs. Expenses</p>
                                <p className="text-gray-400 text-[14px] -mt-1 mb-3">Last 6 months</p>
                                <IncomeVsExpenses />
                            </div>
                            <div className="w-150 h-30 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col items-start gap-1">
                                <MonthlyBudget />
                            </div>
                        </div>
                    </div>
                </div>

                {/*Recent Transactions Section*/}
                <div className="w-full max-w-300 m-auto">
                    <div className="py-3 px-2 gap-5">
                        <div className="w-full h-80 border-solid border-gray-600 border px-6 py-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col items-start gap-1">
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
                                                <FontAwesomeIcon icon={faCoins} />
                                            </div>
                                            <div className="w-full flex flex-col justify-center items-start">
                                                <p className="text-white text-[14px]">Paycheck</p>
                                                <p className="text-gray-400 text-[12px]">Income - September 15</p>
                                            </div>
                                        </div>
                                        <p className="text-green-500 text-[14px] font-bold">+ $2421.20</p>
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
                                <div className="w-full flex flex-col gap-2">
                                    <div className="w-full flex flex-row justify-between items-center">
                                        <div className="flex flex-row justify-center items-center gap-3">
                                            <div className="px-2 py-1 bg-[#1e90ff]/20 rounded-[5px] text-[#1e90ff] text-[20px]">
                                                <FontAwesomeIcon icon={faBowlFood} />
                                            </div>
                                            <div className="w-full flex flex-col justify-center items-start">
                                                <p className="text-white text-[14px]">Chipotle</p>
                                                <p className="text-gray-400 text-[12px]">Food - September 11</p>
                                            </div>
                                        </div>
                                        <p className="text-red-500 text-[14px] font-bold">- $18.75</p>
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