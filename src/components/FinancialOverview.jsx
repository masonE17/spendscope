import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

export default function FinancialOverview({ financialSummary, incomeTotal, expenseTotal, savingsRate }) {

    return (
        <div className="w-full flex flex-row gap-5">
            <div className="w-70 h-40 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-start gap-1">
                <div className="px-2 py-1 bg-[#1e90ff]/20 rounded-[5px] text-[#1e90ff] text-[20px]">
                    <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <div className="pt-2 bb-1.5">
                    <p className="text-gray-400 text-[12px]">TOTAL BALANCE</p>
                    <p className="text-white text-[24px] font-bold">{ financialSummary.length > 0 ? financialSummary[0].balance.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "..." }</p>
                </div>
                <div className="w-full border-b-gray-400 border-2"></div>
            </div>
            <div className="w-70 h-40 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-start gap-1">
                <div className="px-2 py-1 bg-green-500/20 rounded-[5px] text-green-500 text-[20px]">
                    <FontAwesomeIcon icon={faCircleUp} />
                </div>
                <div className="pt-2 bb-1.5">
                    <p className="text-gray-400 text-[12px]">INCOME</p>
                    <p className="text-white text-[24px] font-bold">{ incomeTotal !== 0 ? incomeTotal.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "..."}</p>
                </div>
                <div className="w-full border-b-gray-400 border-2"></div>
            </div>
            <div className="w-70 h-40 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-start gap-1">
                <div className="px-2 py-1 bg-red-500/20 rounded-[5px] text-red-500 text-[20px]">
                    <FontAwesomeIcon icon={faCircleUp} />
                </div>
                <div className="pt-2 bb-1.5">
                    <p className="text-gray-400 text-[12px]">EXPENSES</p>
                    <p className="text-white text-[24px] font-bold">{ expenseTotal !== 0 ? expenseTotal.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "..."}</p>
                </div>
                <div className="w-full border-b-gray-400 border-2"></div>
            </div>
            <div className="w-70 h-40 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-start gap-1">
                <div className="px-2 py-1 bg-[#1e90ff]/20 rounded-[5px] text-[#1e90ff] text-[20px]">
                    <FontAwesomeIcon icon={faSackDollar} />
                </div>
                <div className="pt-2 bb-1.5">
                    <p className="text-gray-400 text-[12px]">SAVINGS RATE</p>
                    <p className="text-white text-[24px] font-bold">{ savingsRate !== 0 ? `${savingsRate}%` : "..." }</p>
                </div>
                <div className="w-full border-b-gray-400 border-2"></div>
            </div>
        </div>
    );
}
