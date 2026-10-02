export default function MonthlyBudget({ budget, expenseTotal, isLoading }) {
    const formatMoney = (n) => `$${n.toLocaleString('en-US')}`;

    const budgetRemaining = (budget - expenseTotal);
    const budgetPercentage = (budget > 0) ? (expenseTotal / budget) * 100 : 0;

    return (
        <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-row justify-between items-center">
                <p className="text-white text-[18px] font-bold">Monthly Budget</p>
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