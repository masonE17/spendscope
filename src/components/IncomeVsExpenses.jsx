import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

const formatMoney = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const categoryColors = {
    "groceries": '#34d399',
    "shopping": '#38bdf8',
    "food": '#a78bfa',
    "transport": '#7dd3fc',
    "other": '#64748b'
};

function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    const { value } = payload[0].payload;

    return (
        <div className="bg-[rgb(0,12,31)] border border-gray-600 rounded-[5px] p-2 text-[12px] flex flex-col gap-1">
            <p className="text-white font-bold">{label}</p>
            <p className="text-gray-400">Spent: <span className="text-[#1e90ff]">{formatMoney(value)}</span></p>
        </div>
    );
}

export default function IncomeVsExpenses({ expenses, budget }) {
    const totals = {
        groceries: 0,
        shopping: 0,
        food: 0,
        transport: 0,
        other: 0
    };

    expenses.forEach((expense) => {
        if (expense.category in totals) {
            totals[expense.category] += expense.amount;
        }
    });

    const data = Object.entries(totals).map(([category, value]) => ({
        key: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value
    }));

    return (
        <div className="w-full flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <CartesianGrid vertical={false} stroke="#ffffff1a" />
                    <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis
                        width={40}
                        domain={[0, (dataMax) => Math.max(budget, dataMax)]}
                        tick={{ fill: '#9ca3af', fontSize: 11 }}
                        tickFormatter={(v) => `$${v >= 1000 ? `${v / 1000}k` : v}`}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: '#ffffff0d' }} />
                    {budget > 0 && <ReferenceLine y={budget} stroke="#22c55e" strokeDasharray="4 4" />}
                    <Bar dataKey="value" name="Spent" radius={[10, 10, 0, 0]}>
                        {data.map((entry) => (
                            <Cell key={entry.key} fill={categoryColors[entry.key]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
