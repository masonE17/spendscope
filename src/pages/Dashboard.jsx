import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CategoryBreakdown from "../components/CategoryBreakdown";
import IncomeVsExpenses from "../components/IncomeVsExpenses";
import MonthlyBudget from "../components/MonthlyBudget";
import FinancialOverview from "../components/FinancialOverview";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric'
    });
    const expenseFormatter = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });

    const icons = {
        "income": faCoins,
        "groceries": faBagShopping,
        "shopping": faCartShopping,
        "food": faBowlFood,
        "transport": faGasPump,
        "other": faEllipsis
    };

    const [isEditingBudget, setIsEditingBudget] = useState(false);
    const [isAccessingAccount, setIsAccessingAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAmountError, setIsAmountError] = useState(false);
    const [isBudgetError, setIsBudgetError] = useState(false);
    const [isEditBudgetError, setIsEditBudgetError] = useState(false);
    const isSubmitting = useRef(false);

    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [updateUserName, setUpdateUserName] = useState("");

    const [totalBalance, setTotalBalance] = useState("");
    const [monthlyBudget, setMonthlyBudget] = useState("");
    const [financialSummary, setFinancialSummary] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [savingsRate, setSavingsRate] = useState(0);
    
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchUser();
        fetchFinancialSummary();
        fetchExpenses();
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

    async function fetchFinancialSummary() {
        let { data: accounts, error } = await supabase.from('accounts').select('*');
        if (error) {
            console.log("Error fetching account info: " + error.message);
            return;
        }
        setFinancialSummary(accounts);
    }

    async function fetchExpenses() {
        let { data, error } = await supabase.from('expenses').select('*').order('created_at', { ascending: false });
        setIsLoading(false);
        if (error) {
            console.log("Error fetching expenses: ", error.message);
            return;
        }
        let income = 0;
        let expenses = 0;
        data.forEach((item) => {
            if (item.category === "income") {
                income += item.amount;
            } else {
                expenses += item.amount;
            }
        })
        setIncomeTotal(income);
        setExpenseTotal(expenses);
        setExpenses(data);
        setSavingsRate(income !== 0 ? (((income - expenses) / income) * 100).toFixed(0) : 0);
    };

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error.message);
        }
        navigate("/");
    }

    async function updateFinancialSummary() {
        if (isSubmitting.current) {
            return;
        }
        const update = {};
        let hasError = false;
        if (totalBalance !== "") {
            if (isNaN(totalBalance)) {
                setTotalBalance("");
                setIsAmountError(true);
                hasError = true;
            } else {
                update.balance = parseFloat(totalBalance).toFixed(2);
            }
        }
        if (monthlyBudget !== "") {
            if (isNaN(monthlyBudget)) {
                setMonthlyBudget("");
                setIsBudgetError(true);
                hasError = true;
            } else {
                update.monthly_budget = parseFloat(monthlyBudget).toFixed(2);
            }
        }
        if (hasError) return;
        if (Object.keys(update).length === 0) {
            setIsEditBudgetError(true);
            return;
        }
        isSubmitting.current = true;
        if (financialSummary.length > 0) {
            const { data, error } = await supabase.from('accounts').update({ balance: update.balance, monthly_budget: update.monthly_budget }).eq('user_id', financialSummary[0].user_id).select();
            isSubmitting.current = false;
            if (error) {
                console.log("Error updating account: ", error.message);
                return;
            }
            setFinancialSummary(data);
            setTotalBalance("");
            setMonthlyBudget("");
            setIsEditingBudget(false);
        }
        const { data, error } = await supabase.from('accounts').insert([{ balance: update.balance, monthly_budget: update.monthly_budget},]).select();
        isSubmitting.current = false;
        if (error) {
            console.log("Error updating account: ", error.message);
            return;
        }
        setFinancialSummary(data);
        setTotalBalance("");
        setMonthlyBudget("");
        setIsEditingBudget(false);
    }

    async function updateUserProfile() {
        if (isSubmitting.current) {
            return;
        }
        isSubmitting.current = true;
        if (updateUserName === "") {
            console.log("Error: User name is empty.");
            isSubmitting.current = false;
            return;
        }
        const { data: {user}, error } = await supabase.auth.updateUser({data: { userName: updateUserName } });
        isSubmitting.current = false;
        if (error) {
            console.log("Error updating user profile: ", error.message);
            return;
        }
        let metaData = user?.user_metadata;
        setUserName(formatUserName(metaData.userName));
        setUpdateUserName("");
        setIsAccessingAccount(false);
    }

    function formatUserName(name) {
        if (!name) {
            console.log("Error: User name is undefined");
            return "User";
        }
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    function closedEditBudget() {
        setIsEditingBudget(false);
        setTotalBalance("");
        setMonthlyBudget("");
        setIsAmountError(false);
        setIsBudgetError(false);
        setIsEditBudgetError(false);
    }

    return (
        <div className="w-full mb-15">

            {/*Accessing Acount Section*/}
            {isAccessingAccount && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-110 flex items-center justify-center">
                    <div className="w-110 bg-[rgb(0,12,31)] border border-gray-600 rounded-[5px] p-7">
                        <div className="w-full flex flex-col justify-center items-start gap-1">

                            <div className="flex flex-row justify-between items-center w-full">
                                <div className="flex flex-row justify-start items-center gap-3">
                                    <div className="bg-[#1e90ff] w-13 h-13 rounded-full flex justify-center items-center hover:bg-[#0d7ae9] hover:cursor-pointer">
                                        <p className="text-white font-bold text-[24px]">{ userName.charAt(0).toUpperCase() }</p>
                                    </div>
                                    <div className="flex flex-col justify-center items-start">
                                        <p className="text-white text-[20px] font-bold">{ userName }</p>
                                        <p className="text-gray-400 text-[16px]">{ userEmail }</p>
                                    </div>
                                </div>
                                <div>
                                    <button className="text-gray-400 p-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]" onClick={() => setIsAccessingAccount(false)}><FontAwesomeIcon icon={faX} /></button>
                                </div>
                            </div>

                            <div className="w-full mt-3">
                                <p className="text-gray-400 text-[12px] mb-1">DISPLAY NAME</p>
                                <input type="text" placeholder={userName} className="w-full bg-[rgb(5,21,49)] border border-gray-600 rounded-[5px] p-2 text-white mb-3" onChange={(e) => setUpdateUserName(e.target.value)}/>
                            </div>


                            <div className="w-full border-b-2 border-gray-600 mt-3"></div>

                            <div className="w-full flex flex-row justify-between items-center mt-3">
                                <button className="text-red-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-red-400 border hover:text-red-500 hover:cursor-pointer hover:border-red-500" onClick={signOut}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign Out</button>
                                <div className="flex flex-row justify-center items-center gap-4">
                                    <button className="text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]" onClick={() => setIsAccessingAccount(false)}>Cancel</button>
                                    <button className="bg-[#1e90ff] text-white px-3 py-2 text-[12px] rounded-[5px] hover:bg-[#0d7ae9] hover:cursor-pointer" onClick={updateUserProfile}>Save Changes</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/*Editing Budget Section*/}
            {isEditingBudget && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-110 flex items-center justify-center">
                    <div className="w-110 bg-[rgb(0,12,31)] border border-gray-600 rounded-[5px] p-7">
                        <div className="w-full flex flex-col justify-center items-start gap-1">
                            <p className="text-white text-[18px] font-bold">Edit Budget</p>
                            <p className="text-gray-400 text-[14px] -mt-1 mb-3">Update your balance and month's spending target</p>
                            
                            {isEditBudgetError && (
                                <div className="flex flex-row justify-center items-center w-full">
                                    <p className="text-red-500 text-[14px] mb-2 font-bold text-center">Error: Please enter a valid amount for either Total Balance or Monthly Budget</p>
                                </div>
                            )}
                            <p className="text-gray-400 text-[12px]">TOTAL BALANCE</p>
                            {isAmountError ? (
                                <input type="text" value={totalBalance} placeholder="Error: Please enter a valid amount" className="w-full bg-[rgb(5,21,49)] border border-red-500 placeholder:text-red-500 placeholder:font-bold text-white mb-3 rounded-[5px] p-2" onChange={(e) => {setTotalBalance(e.target.value); setIsAmountError(false); }} />
                            ) : (
                                <input type="text" value={totalBalance} placeholder="Total balance (e.g. 10000.00)" className="w-full bg-[rgb(5,21,49)] border border-gray-600 rounded-[5px] p-2 text-white mb-3" onChange={(e) => {setTotalBalance(e.target.value); setIsEditBudgetError(false); }} />
                            )}
                            <p className="text-gray-400 text-[12px]">MONTHLY BUDGET</p>
                            {isBudgetError ? (
                                <input type="text" value={monthlyBudget} placeholder="Error: Please enter a valid amount" className="w-full bg-[rgb(5,21,49)] border border-red-500 placeholder:text-red-500 placeholder:font-bold text-white mb-3 rounded-[5px] p-2" onChange={(e) => {setMonthlyBudget(e.target.value); setIsBudgetError(false); }} />
                            ) : (
                                <input type="text" value={monthlyBudget} placeholder="Monthly budget (e.g. 2500.00)" className="w-full bg-[rgb(5,21,49)] border border-gray-600 rounded-[5px] p-2 text-white" onChange={(e) => {setMonthlyBudget(e.target.value); setIsEditBudgetError(false); }} />
                            )}

                            <div className="w-full border-b-2 border-gray-600 mt-3"></div>
                            <div className="w-full flex flex-row justify-end items-center gap-4 mt-4">
                                <button className="text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]" onClick={closedEditBudget}>Cancel</button>
                                <button className="bg-[#1e90ff] text-white px-3 py-2 text-[12px] rounded-[5px] hover:bg-[#0d7ae9] hover:cursor-pointer" onClick={updateFinancialSummary}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
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
                            <p className="text-center text-white">Dashboard</p>
                            <div className="w-full border-b-2 border-[#1e90ff] rounded-[5px]"></div>
                        </div>
                        <div className="group flex flex-col justify-center items-center">
                            <Link to="/add-expense">
                                <button className="text-center group-hover:text-white">Add Expense</button>
                            </Link>
                            <div className="w-full border-b-2 border-transparent group-hover:border-[#1e90ff] rounded-[5px]"></div>
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

            {/* Page Content */}
            <div className="w-full">

                {/* Sub Header Section */}
                <div className="w-full max-w-300 m-auto">
                    <div className="flex flex-row justify-between items-center p-2">
                        <div className="flex flex-col justify-center items-start">
                            <p className="text-white text-[30px] font-bold">Dashboard</p>
                            <p className="text-gray-400 text-[15px]">Welcome back { userName }! Here's where you can manage your finances.</p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-4">
                            <button className="text-gray-400 px-3 py-2 text-[12px] rounded-[5px] border-solid border-gray-400 border hover:text-[#1e90ff] hover:cursor-pointer hover:border-[#0d7ae9]" onClick={() => {setIsEditingBudget(true); seteditBudgetError(false);}} >Edit Budget</button>
                            <Link to="/add-expense">
                                <button className="bg-[#1e90ff] text-white px-3 py-2 text-[12px] rounded-[5px] hover:bg-[#0d7ae9] hover:cursor-pointer"><FontAwesomeIcon icon={faPlus} /> Add Expense</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/*User Financial Overview Section*/}
                <div className="w-full max-w-300 m-auto">
                    <div className="flex flex-row justify-center items-center py-3 px-2 gap-5">
                        <FinancialOverview financialSummary={financialSummary} incomeTotal={incomeTotal} expenseTotal={expenseTotal} savingsRate={savingsRate} />
                    </div>
                </div>

                {/*Chart Section*/}
                <div className="w-full max-w-300 m-auto">
                    <div className="flex flex-row justify-center items-center py-3 px-2 gap-5">
                        <div className="w-150 h-95 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col items-start gap-1">
                            <p className="text-white text-[18px] font-bold">Category Breakdown</p>
                            <p className="text-gray-400 text-[14px] -mt-1 mb-3">Where your money went this month</p>
                            <CategoryBreakdown expenses={expenses} expenseTotal={expenseTotal} />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-5">
                            <div className="w-150 h-60 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col items-start gap-1">
                                <p className="text-white text-[18px] font-bold">Income vs. Expenses</p>
                                <p className="text-gray-400 text-[14px] -mt-1 mb-3">How your spending compares to your budget</p>
                                <IncomeVsExpenses expenses={expenses} budget={financialSummary[0]?.monthly_budget ?? 0} />
                            </div>
                            <div className="w-150 h-30 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col items-start gap-1">
                                <MonthlyBudget budget={financialSummary[0]?.monthly_budget ?? 0} expenseTotal={expenseTotal} isLoading={isLoading} />
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
                                <Link to="/expenses">
                                    <p className="text-[#1e90ff] text-[14px] font-bold hover:text-[#0d7ae9] hover:cursor-pointer">View All <FontAwesomeIcon icon={faArrowRight} /></p>
                                </Link>
                            </div>
                            
                            <div className="w-full flex flex-col gap-4 mt-2">
                                {expenses.slice(0, 4).map((expense) => (
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
                                            <p className="text-[14px] font-bold" style={{ color: expense.category === "income" ? "#7CFC00" : "#FF0000" }}>{expense.category === "income" ? "+" : "-"} ${expense.amount.toFixed(2)}</p>
                                        </div>
                                        <div className="w-full border-b-2 border-gray-400"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}