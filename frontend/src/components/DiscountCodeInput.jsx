import Right from "../icons/Right";

export default function DiscountCodeInput() {
  return (
    <div className="flex gap-4 mt-8 mb-4 items-center">
      <input
        type="text"
        placeholder="Discount Code"
        className="border-2 border-black p-2 bg-white text-black rounded-lg w-50 uppercase font-semibold tracking-wide text-uppercase"
      />
      <button className="flex gap-1 bg-accent1 text-black uppercase font-bold rounded-full px-4 py-2">
        Apply
        <Right />
      </button>
    </div>
  );
}
