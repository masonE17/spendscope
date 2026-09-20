import { Pie, PieChart, Cell } from 'recharts';

const sampleCategories = [
    { name: 'Rent', value: 1500, color: '#1e90ff' },
    { name: 'Groceries', value: 620, color: '#38bdf8' },
    { name: 'Dining', value: 380, color: '#7dd3fc' },
    { name: 'Transport', value: 260, color: '#a78bfa' },
    { name: 'Entertainment', value: 200, color: '#34d399' },
    { name: 'Other', value: 160, color: '#64748b' },
];

const formatMoney = (n) => `$${n.toLocaleString('en-US')}`;

export default function CategoryBreakdown({ data = sampleCategories }) {
    const total = data.reduce((sum, d) => sum + d.value, 0);

    return (
        <div className="flex flex-row items-center gap-4 m-auto">
            <PieChart width={220} height={220}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="50%"
                    outerRadius="90%"
                    stroke="none"
                >
                    {data.map((d) => (
                        <Cell key={d.name} fill={d.color} />
                    ))}
                </Pie>
            </PieChart>

            <div className="flex flex-col gap-2 p-3">
            <div className="flex flex-col pb-3 mb-1 border-b-2 border-gray-400">
                <p className="text-gray-400 text-[12px]">TOTAL SPENT</p>
                <p className="text-white text-[28px] font-bold">{formatMoney(total)}</p>
            </div>
            <ul className="flex flex-col gap-2 text-[13px]">
                {data.map((d) => (
                    <li key={d.name} className="flex flex-row items-center gap-3">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                        <span className="w-28 text-white">{d.name}</span>
                        <span className="w-10 text-white font-bold text-right">{Math.round((d.value / total) * 100)}%</span>
                        <span className="w-14 text-gray-400 text-right">{formatMoney(d.value)}</span>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}
