import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  return (
    <div className="w-full">
      <div className="w-full sticky top-0 bg-[rgb(0,12,31)] opacity-95">
        <div className="flex flex-row justify-evenly items-center max-w-350 m-auto py-4">
          <h1 className="text-[#1e90ff] font-bold text-[22px]">SpendScope</h1>
          <div className="flex flex-row justify-center gap-4 items-center text-gray-400 text-[14px]">
            <div className="group flex flex-col justify-center items-center">
              <button className="text-center group-hover:text-[#1e90ff]">Home</button>
              <div className="w-full border-b-2 border-transparent group-hover:border-[#1e90ff] rounded-[5px]"></div>
            </div>
            <div className="group flex flex-col justify-center items-center">
              <button className="text-center group-hover:text-[#1e90ff]">Explore</button>
              <div className="w-full border-b-2 border-transparent group-hover:border-[#1e90ff] rounded-[5px]"></div>
            </div>
            <div className="group flex flex-col justify-center items-center">
              <button className="text-center group-hover:text-[#1e90ff]">Pricing</button>
              <div className="w-full border-b-2 border-transparent group-hover:border-[#1e90ff] rounded-[5px]"></div>
            </div>
            <div className="group flex flex-col justify-center items-center">
              <button className="text-center group-hover:text-[#1e90ff]">Dashboard</button>
              <div className="w-full border-b-2 border-transparent group-hover:border-[#1e90ff] rounded-[5px]"></div>
            </div>
          </div>
            <button className="bg-[#1e90ff] text-white p-2 text-[12px] rounded-[5px]">Get Started Free</button>
        </div>
      </div>
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
                <p className="text-gray-400 text-[15px] text-center mt-6">Build optimal expense management strategies with our <br />intuitive platform.</p>
                <button className="bg-[#1e90ff] text-white px-4 py-3 text-[16px] rounded-[5px] animate-pulse">Get Started Free</button>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-4 mt-3">
              <p className="text-gray-400 text-[12px]"><FontAwesomeIcon icon={faSquareCheck} className="text-green-500 mr-1" />No Credit Card Required</p>
              <p className="text-gray-400 text-[12px]"><FontAwesomeIcon icon={faSquareCheck} className="text-green-500 mr-1" />Unlimited Features</p>
              <p className="text-gray-400 text-[12px]"><FontAwesomeIcon icon={faSquareCheck} className="text-green-500 mr-1" />Setup in Minutes</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-6 mt-6">
              <div className="border-solid border-gray-600 border w-40 p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-[#1e90ff]">
                <div className="rounded-[5px] w-full p-4 bg-[rgb(0,12,31)] flex flex-col justify-center items-center gap-2">
                  <FontAwesomeIcon icon={faChartPie} className="text-white text-[22px] bg-[#1e90ff] p-2 rounded-[5px]"/>
                  <p className="text-white text-[13px] text-center">Live Tracking</p>
                </div>
              </div>
              <div className="border-solid border-gray-600 border w-40 p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-[#1e90ff]">
                <div className="rounded-[5px] w-full p-4 bg-[rgb(0,12,31)] flex flex-col justify-center items-center gap-2">
                  <FontAwesomeIcon icon={faPiggyBank} className="text-white text-[22px] bg-[#1e90ff] p-2 rounded-[5px]"/>
                  <p className="text-white text-[13px] text-center">Smart Budgets</p>
                </div>
              </div>
              <div className="border-solid border-gray-600 border w-40 p-4 bg-[rgb(5,21,49)] rounded-[5px] flex flex-col justify-center items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-[#1e90ff]">
                <div className="rounded-[5px] w-full p-4 bg-[rgb(0,12,31)] flex flex-col justify-center items-center gap-2">
                  <FontAwesomeIcon icon={faLock} className="text-white text-[22px] bg-[#1e90ff] p-2 rounded-[5px]"/>
                  <p className="text-white text-[13px] text-center">Secure Data</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}