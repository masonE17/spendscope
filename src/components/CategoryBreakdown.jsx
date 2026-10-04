import { Pie, PieChart, Cell } from 'recharts';

export default function CategoryBreakdown({ expenses, expenseTotal }) {
    const totals = {
        groceries: 0,
        shopping: 0,
        food: 0,
        transport: 0,
        other: 0
    }

    expenses.map((expense) => {
        if (expense.category in totals) {
            totals[expense.category] += expense.amount;
        }
    });

    const expensesData = [
        { name: 'Groceries', value: totals.groceries },
        { name: 'Shopping', value: totals.shopping },
        { name: 'Food', value: totals.food },
        { name: 'Transport', value: totals.transport },
        { name: 'Other', value: totals.other }
    ];

    const iconColors = {
        "groceries": '#34d399',
        "shopping": '#38bdf8',
        "food": '#a78bfa',
        "transport": '#7dd3fc',
        "other": '#64748b'
    };

    return (
        <div className="flex flex-row items-center gap-4 m-auto">
            <PieChart width={220} height={220}>
                <Pie
                    data={expensesData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="50%"
                    outerRadius="90%"
                    stroke="none"
                >
                    {expensesData.map((expense) => (
                        <Cell key={expense.name} fill={iconColors[expense.name.toLowerCase()]} />
                    ))}
                </Pie>
            </PieChart>

            <div className="flex flex-col gap-2 p-3">
            <div className="flex flex-col pb-3 mb-1 border-b-2 border-gray-400">
                <p className="text-gray-400 text-[12px]">TOTAL SPENT</p>
                <p className="text-white text-[28px] font-bold">{ expenseTotal ? expenseTotal.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "..."}</p>
            </div>
            <ul className="flex flex-col gap-2 text-[13px]">
                {expensesData.map((expense) => (
                    <li key={expense.name} className="flex flex-row items-center gap-3">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: iconColors[expense.name.toLowerCase()] }}></span>
                        <span className="w-28 text-white">{expense.name}</span>
                        <span className="w-10 text-white font-bold text-right">{ expenseTotal ? Math.round((expense.value / expenseTotal) * 100) : "..." }%</span>
                        <span className="w-14 text-gray-400 text-right">{ expenseTotal ? (expense.value).toLocaleString("en-US", { style: "currency", currency: "USD" }) : "..."}</span>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}
