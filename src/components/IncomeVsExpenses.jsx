import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sampleMonths = [
    { month: 'Apr', income: 5000, expenses: 3300 },
    { month: 'May', income: 5000, expenses: 3450 },
    { month: 'Jun', income: 5100, expenses: 3000 },
    { month: 'Jul', income: 5100, expenses: 3250 },
    { month: 'Aug', income: 5200, expenses: 3400 },
    { month: 'Sep', income: 5200, expenses: 3120 },
];

const formatMoney = (n) => `$${n.toLocaleString('en-US')}`;

function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    const { income, expenses } = payload[0].payload;

    return (
        <div className="bg-[rgb(0,12,31)] border border-gray-600 rounded-[5px] p-2 text-[12px] flex flex-col gap-1">
            <p className="text-white font-bold">{label}</p>
            <p className="text-gray-400">Income: <span className="text-green-500">{formatMoney(income)}</span></p>
            <p className="text-gray-400">Expenses: <span className="text-[#1e90ff]">{formatMoney(expenses)}</span></p>
        </div>
    );
}

export default function IncomeVsExpenses({ data = sampleMonths }) {
    return (
        <div className="w-full flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <CartesianGrid vertical={false} stroke="#ffffff1a" />
                    <XAxis dataKey="month" padding={{ left: 10, right: 10 }} tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis
                        width={40}
                        tick={{ fill: '#9ca3af', fontSize: 11 }}
                        tickFormatter={(v) => `$${v / 1000}k`}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#ffffff33' }} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#9ca3af' }} />
                    <Line type="monotone" dataKey="income" name="Income" stroke="#22c55e" strokeWidth={2} dot={true} />
                    <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#1e90ff" strokeWidth={2} dot={true} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
