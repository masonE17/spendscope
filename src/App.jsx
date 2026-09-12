import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

function NavLink({ label }) {
  return (
    <div className="group flex flex-col justify-center items-center">
      <button className="text-center group-hover:text-[#1e90ff]">{ label }</button>
      <div className="w-full border-b-2 border-transparent group-hover:border-[#1e90ff] rounded-[5px]"></div>
    </div>
  );
}

function HomeDetails({ fWord, lWord, icon }) {
  return (
    <div className="border-solid border-gray-600 border w-45 p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-[#1e90ff]">
      <div className="rounded-[5px] w-full p-4 bg-[rgb(0,12,31)] flex flex-col justify-center items-center gap-2">
        <FontAwesomeIcon icon={ icon } className="text-white text-[22px] bg-[#1e90ff] p-2 rounded-[5px]"/>
        <p className="text-white text-[13px] text-center"><b className="text-[#1e90ff] text-[16px] font-bold">{ fWord } </b>{ lWord }</p>
      </div>
    </div>
  );
}

function FeatureDetails({ description }) {
  return (
    <p className="text-gray-400 text-[13px]">{ description }</p>
  );
}

export default function App() {
  return (
    <div className="w-full">

      {/* Header Section */}
      <div className="w-full sticky top-0 bg-[rgb(0,12,31)] opacity-98 z-100">
        <div className="flex flex-row justify-evenly items-center max-w-350 m-auto py-4">
          <h1 className="text-[#1e90ff] font-bold text-[22px]">SpendScope</h1>
          <div className="flex flex-row justify-center gap-4 items-center text-gray-400 text-[14px]">
            <NavLink label="Home" />
            <NavLink label="Features" />
            <NavLink label="Pricing" />
            <NavLink label="Dashboard" />
          </div>
            <button className="bg-[#1e90ff] text-white p-2 text-[12px] rounded-[5px] hover:bg-[#0d7ae9] hover:cursor-pointer">Get Started Free</button>
        </div>
      </div>

      {/* Home Section */}
      <div>
        <div className="w-full bg-[rgb(0,12,31)] pb-6">
          <div className="max-w-250 m-auto">
            <div className="max-w-150 m-auto py-5 flex flex-col justify-center items-center">
              <p className="text-white text-[42px] font-bold">The Only Free</p>
              <div className="flex flex-row gap-3 justify-center items-center">
                <div className="bg-[linear-gradient(90deg,#1e90ff_0%,#1e90ff_35%,#7dd3fc_50%,#1e90ff_65%,#1e90ff_100%)] bg-size-[300%_auto] bg-clip-text text-transparent animate-wave text-[48px] font-bold -mt-4">Expense Tracker</div>
                <p className="text-white text-[42px] font-bold -mt-4"> You'll</p>
              </div>
              <p className="text-white text-[42px] font-bold -mt-4">Ever Need</p>
              <div className="flex flex-col justify-center items-center gap-7">
                <p className="text-gray-400 text-[14px] text-center mt-6">Build optimal expense management strategies with our <br />intuitive platform.</p>
                <button className="bg-[#1e90ff] text-white px-4 py-3 text-[16px] rounded-[5px] animate-pulse hover:bg-[#0d7ae9] hover:cursor-pointer">Get Started Free</button>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-4 mt-3">
              <p className="text-gray-400 text-[12px]"><FontAwesomeIcon icon={faSquareCheck} className="text-green-500 mr-1" />No Credit Card Required</p>
              <p className="text-gray-400 text-[12px]"><FontAwesomeIcon icon={faSquareCheck} className="text-green-500 mr-1" />Unlimited Features</p>
              <p className="text-gray-400 text-[12px]"><FontAwesomeIcon icon={faSquareCheck} className="text-green-500 mr-1" />Setup in Minutes</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-6 mt-6">
              <HomeDetails fWord="Live" lWord="Tracking" icon={faChartPie} />
              <HomeDetails fWord="Smart" lWord="Budgets" icon={faPiggyBank} />
              <HomeDetails fWord="Secure" lWord="Data" icon={faLock} />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-[rgb(1,16,39)] py-6">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-white text-[26px] text-center font-bold">See What Unique Features Set Us Apart</p>
          <p className="text-gray-400 text-[14px] text-center mb-8">Discover the innovative tools and features that sets our expense tracker apart from the rest.</p>
        </div>
        <div className="max-w-350 border-solid m-auto flex flex-row justify-center items-center gap-4 p-4">
          <div className="max-w-90 h-full border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-center gap-3">
            <div className="w-full">
              <p className="text-green-500 font-bold text-[18px]"><FontAwesomeIcon icon={faCheck} /> Strengths Identified</p>
              <div className="px-3 py-1 w-full">
                <FeatureDetails description="We analyze your income and expenses to identify the strong areas in your financial management." />
              </div>
            </div>
            <div className="w-full">
              <p className="text-yellow-500 font-bold text-[18px]"><FontAwesomeIcon icon={faLightbulb} /> Improvements Suggested</p>
              <div className="px-3 py-1 w-full">
                <FeatureDetails description="We provide actionable suggestions to help you optimize your spending habits." />
              </div>
            </div>
            <div className="border-solid border-b-2 border-gray-600 rounded-[5px] w-full"></div>
            <div className="w-full">
              <div className="flex flex-row justify-between items-center w-full text-gray-400 text-[13px] px-3 py-1">
                <p>Overall Performance</p>
                <p>94%</p>
              </div>
              <div className="w-full px-6 py-1">
                <div className="w-full h-2 border-solid border-gray-600 border rounded-[5px]">
                  <div className="w-[94%] h-full bg-green-500 rounded-[5px]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-120">
            <img src="src/assets/SpendScope_Logo.png" alt="SpendScope Logo" className="w-full rounded-full" />
          </div>
          <div className="max-w-90 h-full flex flex-col justify-center items-center">
            <div className="border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-center">
              <div className="w-full">
                <p className="text-white font-bold text-[18px]">Adpative Charts</p>
                <div className="px-2 py-1 w-full">
                  <FeatureDetails description="Personalized charts that adpat to your spending patterns and income sources." />
                  <div className="border-solid border-b-2 border-gray-600 rounded-[5px] w-full my-2"></div>
                  <p className="text-green-500 text-[13px] mb-2"><b className="text-[14px]">• Category Breakdown:</b> Pie/donut chart showing exactly where your money goes each month (groceries, bills, entertainment, etc.)</p>
                  <p className="text-green-500 text-[13px]"><b className="text-[14px]">• Income vs. Expenses:</b> Line chart comparing your income and expenses over time, helping you identify trends and make informed financial decisions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="w-full bg-[rgb(0,12,31)] py-6">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-white text-[26px] text-center font-bold">Choose Your Plan</p>
          <p className="text-gray-400 text-[14px] text-center mb-8">Start free and upgrade as you're ready to accelerate your financial journey.</p>
          <div className="max-w-200 m-auto flex flex-row justify-center items-center gap-28 p-4">
            <div className="w-70 h-70 border-solid border-gray-600 border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-center gap-3">
              <p className="text-white font-bold text-[18px]">Free</p>
              <p className="text-gray-400 text-[12px]"><b className="text-white text-[20px]">$0</b>/forever</p>
              <p className="text-gray-400 text-[14px]">Basic expense tracking</p>
              <div className="w-full flex flex-col justify-center items-start gap-1">
                <p className="text-white text-[14px]"><FontAwesomeIcon icon={faCheck} className="text-green-500" /> Manual Creation</p>
                <p className="text-white text-[14px]"> <FontAwesomeIcon icon={faCheck} className="text-green-500" /> Unlimited Plans</p>
                <p className="text-white text-[14px]"><FontAwesomeIcon icon={faX} className="text-red-500" /> No Premium Upcoming Features</p>
              </div>
              <button className="bg-[#1e90ff] text-white p-2 text-[12px] rounded-[5px] hover:bg-[#0d7ae9] hover:cursor-pointer">Get Started Free</button>
            </div>
            <div className="w-70 h-70 border-solid border-[#1e90ff] shadow-[0_0_6px_#1e90ff] border p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-center gap-3">
              <p className="text-white font-bold text-[18px]">Pro</p>
              <p className="text-gray-400 text-[12px]"><b className="text-white text-[20px]">$2.99</b>/month</p>
              <p className="text-gray-400 text-[14px]">Advanced expense tracking</p>
              <div className="w-full flex flex-col justify-center items-start gap-1">
                <p className="text-white text-[14px]"><FontAwesomeIcon icon={faCheck} className="text-green-500" /> Everything in Free Included</p>
                <p className="text-white text-[14px]"><FontAwesomeIcon icon={faCheck} className="text-green-500" /> AI assistance</p>
                <p className="text-white text-[14px]"><FontAwesomeIcon icon={faCheck} className="text-green-500" /> Priority Support</p>
              </div>
              <p className="text-[#1e90ff] text-[18px] font-bold">COMING SOON</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}