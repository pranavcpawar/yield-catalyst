import React from 'react'

const Trove = ({ eth_price, lusd_price }) => {
  const MCR = 1.1;
  const collateral = 1;
  const borrow = 1000;
  const tapInThreshold = 20;
  const buyBackThreshold = 10;

  console.log(eth_price, lusd_price);

  return (
    <div className="flex flex-col bg-[#A2D2FF] border-2 border-black w-full items-center sm:w-[60vw] p-4 pr-2 shadow-[4px_4px_black] space-y-4">
			<h1 className="text-black text-xl font-semibold underline">Troves</h1>
      <div className="flex flex-col w-full space-y-4">
        <div className="flex flex-row items-center space-x-5 w-full bg-[#CDB4DB] border-2 border-black p-2">
          <h2 className="text-black font-epilogue text-md font-semibold">Collateral</h2>
          <input value={collateral + " ETH"} type="text" placeholder="Ex. 0.0 ETH" className="input text-black bg-transparent placeholder:text-[#252525] placeholder:font-poppins input-xl placeholder:items-start w-full max-w-xs" />
        </div>
        <div className="flex flex-row items-center space-x-5 w-full bg-[#CDB4DB] border-2 border-black p-2">
          <h2 className="text-black font-epilogue text-md font-semibold">Borrow</h2>
          <input value={borrow + " LUSD"} type="text" placeholder="Ex. 10 LUSD" className="input text-black bg-transparent placeholder:text-[#252525] placeholder:font-poppins input-xl placeholder:items-start w-full max-w-xs" />
        </div>
        <div className='flex flex-row space-x-2 w-full mx-auto'>
          <div className="flex flex-row items-center space-x-5 w-full bg-[#CDB4DB] border-2 border-black p-2">
            <h2 className="text-black font-epilogue text-md font-semibold">CR</h2>
            <input value={((collateral*eth_price/borrow*lusd_price)*100).toFixed(2) + "%"} type="text" placeholder="Ex. 10 LUSD" className="input text-black bg-transparent placeholder:text-[#252525] placeholder:font-poppins input-xl placeholder:items-start w-full max-w-xs" />
          </div>
          <div className="flex flex-row items-center space-x-5 w-full bg-[#CDB4DB] border-2 border-black p-2">
            <h2 className="text-black font-epilogue text-md font-semibold">LIQ. Price</h2>
            <input value={(MCR*borrow)/collateral} type="text" placeholder="Ex. 10 LUSD" className="input text-black bg-transparent placeholder:text-[#252525] placeholder:font-poppins input-xl placeholder:items-start w-full max-w-xs" />
          </div>
        </div>
        <div className="flex flex-row items-center space-x-5 w-full bg-[#CDB4DB] border-2 border-black p-2">
          <h2 className="text-black font-epilogue text-md font-semibold">Tap-in threshold</h2>
          <input type="text" placeholder="Ex. 20%" className="input text-black bg-transparent placeholder:text-[#252525] placeholder:font-poppins input-xl placeholder:items-start w-full max-w-xs" />
        </div>
        <div className="flex flex-row items-center space-x-5 w-full bg-[#CDB4DB] border-2 border-black p-2">
          <h2 className="text-black font-epilogue text-md font-semibold">Buyback threshold</h2>
          <input type="text" placeholder="Ex. 10%" className="input text-black bg-transparent placeholder:text-[#252525] placeholder:font-poppins input-xl placeholder:items-start w-full max-w-xs" />
        </div>
        <div className="flex flex-row items-center space-x-5 w-full bg-[#CDB4DB] border-2 border-black p-2">
          <h2 className="text-black font-epilogue text-md font-semibold">Repayment threshold</h2>
          <input type="text" placeholder="Ex. 20%" className="input text-black bg-transparent placeholder:text-[#252525] placeholder:font-poppins input-xl placeholder:items-start w-full max-w-xs" />
        </div>
        <div className="flex flex-row items-center space-x-5 w-full bg-[#CDB4DB] border-2 border-black p-2">
          <h2 className="text-black font-epilogue text-md font-semibold">Boost toggle</h2>
          <input type="checkbox" className="toggle toggle-sm toggle-info" checked />
        </div>
        <div className="flex flex-row items-center space-x-5 w-full bg-[#CDB4DB] border-2 border-black p-2">
          <h2 className="text-black font-epilogue text-md font-semibold">Risk Tolerance</h2>
          <input type="range" min={0} max="100" className="range range-xs range-info" /> 
        </div>
      </div>
    </div>
  )
}

export default Trove