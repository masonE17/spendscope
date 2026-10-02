import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function MonthlyBudget() {
    const formatMoney = (n) => `$${n.toLocaleString('en-US')}`;

    const [expenseTotal, setExpenseTotal] = useState(0);
    const [budget, setBudget] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchExpenses();
        fetchBudget();
    }, []);

    async function fetchExpenses() {
        let { data, error } = await supabase.from('expenses').select('*');
        setIsLoading(false);
        if (error) {
            console.log("Error fetching expenses: ", error.message);
            return;
        }
        let expenses = 0;
        data.forEach((item) => {
            if (item.category !== "income") {
                expenses += item.amount;
            }
        })
        setExpenseTotal(expenses);
    };

    async function fetchBudget() {
        let { data, error } = await supabase.from('accounts').select('*');
        if (error) {
            console.log("Error fetching budget: ", error.message);
            return;
        }
        setBudget(data[0].monthly_budget);
    }

    const budgetRemaining = (budget - expenseTotal);
    const budgetPercentage = Math.min((expenseTotal / budget) * 100, 100);


    return (
        <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-row justify-between items-center">
                <p className="text-white text-[18px] font-bold">Monthly Budget {formatMoney(budget)}</p>
                <p className="text-gray-400 text-[14px]">{formatMoney((expenseTotal.toFixed(2)))} / {formatMoney(budget)}</p>
            </div>
            <div className="w-full h-3 rounded-[5px] border border-gray-400 overflow-hidden">
                <div className="h-full bg-[#1e90ff]" style={{ width: isLoading ? 0 : `${budgetPercentage}%`}}></div>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
                <p className="text-gray-400 text-[14px]">{budgetPercentage.toFixed(2)}% of budget used</p>
                <p className="text-gray-400 text-[14px]">{formatMoney((budgetRemaining.toFixed(2)))} remaining</p>
            </div>
        </div>
    );
}