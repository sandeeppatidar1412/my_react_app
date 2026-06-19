import { useState } from "react";

export default function Task4() {
  const [array, setarray] = useState([]);
  const [evenarray, setevenarray] = useState([]);
  let Func = (num) => Number(num);
  let arr = Array.from(String(array), Func);

  const findeven = (arr) => {
    let even = [];
    let sum = 0;
    if (arr.length > 0) {
      console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
          sum += arr[i];
          console.log(sum);
          return sum;
        }
        setevenarray(sum);
      }
    }
  };

  useState(() => {
    findeven(array);
  }, [array]);

  //   console.log(evenarray);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold text-slate-900">Welcome</h2>
      <p className="mt-4 max-w-2xl text-slate-600">
        This demo app uses React Router and Tailwind CSS to display user data
        from DummyJSON.
      </p>
      <div className="mt-8 rounded-2xl bg-slate-50 p-6">
        <h3 className="text-xl font-semibold text-slate-900">Routes</h3>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li>array : </li>
          <li></li>
        </ul>

        <div class="w-full max-w-sm min-w-[200px]">
          <label class="block mb-1 text-sm text-slate-600">Enter Numbers</label>
          <input
            type="number"
            inputmode="numeric"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="ZIP code (02011)"
            maxlength="5"
            id="zipInput"
            value={array}
            onChange={(e) => setarray(e.target.value)}
          />
          <p class="flex items-center mt-2 text-xs text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 mr-2"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Your text helps us to provide location-specific services.
          </p>
        </div>
      </div>
    </section>
  );
}
