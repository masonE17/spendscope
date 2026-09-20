const sampleData = [
    {budget: 4000, spending: 3120}
]

const formatMoney = (n) => `$${n.toLocaleString('en-US')}`;
const budgetRemaining = (sampleData[0].budget - sampleData[0].spending);
const budgetPercentage = Math.min((sampleData[0].spending / sampleData[0].budget) * 100, 100);

export default function MonthlyBudget() {
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-row justify-between items-center">
                <p className="text-white text-[18px] font-bold">Monthly Budget</p>
                <p className="text-gray-400 text-[14px]">{formatMoney(sampleData[0].spending)} / {formatMoney(sampleData[0].budget)}</p>
            </div>
            <div className="w-full h-3 rounded-[5px] border border-gray-400 overflow-hidden">
                <div className="h-full bg-[#1e90ff]" style={{ width: `${budgetPercentage}%`}}></div>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
                <p className="text-gray-400 text-[14px]">{budgetPercentage}% of budget used</p>
                <p className="text-gray-400 text-[14px]">{formatMoney(budgetRemaining)} remaining</p>
            </div>
        </div>
    );
}