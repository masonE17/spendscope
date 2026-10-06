import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Expenses() {
    const expenseFormatter = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });

    const [expenses, setExpenses] = useState([]);
    const icons = {
        "income": faCoins,
        "groceries": faBagShopping,
        "shopping": faCartShopping,
        "food": faBowlFood,
        "transport": faGasPump,
        "other": faEllipsis
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    async function fetchExpenses() {
        let { data, error } = await supabase.from('expenses').select('*').order('created_at', { ascending: false });
        if (error) {
            console.log("Error fetching expenses: ", error.message);
            return;
        }
        setExpenses(data);
    }

    async function handleDelete(id) {
        const { error } = await supabase.from('expenses').delete().eq('id', id);
        if (error) {
            console.log("Error deleting expense: ", error.message);
            return;
        }
        fetchExpenses();
    }

    return (
        <div className="w-full mb-15">

            {/* All Expenses */}
            <div className="w-full max-w-300 m-auto">
                <div className="py-3 px-2 gap-5">
                    <div className="w-full h-full border-solid border-gray-600 border px-6 py-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col items-start gap-1">
                        <div className="w-full flex flex-row justify-between items-center">
                            <p className="text-white text-[18px] font-bold">Recent Transactions</p>
                            <Link to="/dashboard">
                                <button className="text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]"><FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard</button>
                            </Link>
                        </div>
                        <div className="w-full flex flex-col gap-4 mt-2">
                            {expenses.map((expense) => (
                                <div className="w-full flex flex-col gap-2" key={expense.id}>
                                    <div className="w-full flex flex-row justify-between items-center">
                                        <div className="flex flex-row justify-center items-center gap-3">
                                            <div className="px-2 py-1 bg-[#1e90ff]/20 rounded-[5px] text-[#1e90ff] text-[20px]">
                                                <FontAwesomeIcon icon={icons[expense.category]} />
                                            </div>
                                            <div className="w-full flex flex-col justify-center items-start">
                                                <p className="text-white text-[14px]">{expense.location}</p>
                                                <p className="text-gray-400 text-[12px]">{expenseFormatter.format(new Date(expense.spent_on))} - {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-center items-center gap-5">
                                            <p className="text-[14px] font-bold" style={{ color: expense.category === "income" ? "#7CFC00" : "#FF0000" }}>{expense.category === "income" ? "+" : "-"} ${expense.amount.toFixed(2)}</p>
                                            <FontAwesomeIcon icon={faTrashCan} className="text-[#1e90ff] hover:text-[#0d7ae9] cursor-pointer" onClick={() => handleDelete(expense.id)} />
                                        </div>
                                    </div>
                                    <div className="w-full border-b-2 border-gray-400"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}