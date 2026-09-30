import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Expenses() {

    return (
        <div className="w-full mb-15">

            {/* All Expenses */}
            <div className="w-full max-w-300 m-auto">
                <div className="py-3 px-2 gap-5">
                    <div className="w-full h-80 border-solid border-gray-600 border px-6 py-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col items-start gap-1">
                        <div className="w-full flex flex-row justify-between items-center">
                            <p className="text-white text-[18px] font-bold">Recent Transactions</p>
                            <Link to="/dashboard">
                                <button className="text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]"><FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard</button>
                            </Link>
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
    );
}