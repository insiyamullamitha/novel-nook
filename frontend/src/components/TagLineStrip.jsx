import TagLine from "./TagLine";

export default function TagLineStrip() {
  return (
    <div
      className="bg-white nav-font text-black text-center p-2"
      style={{ whiteSpace: "nowrap", overflow: "hidden" }}
    >
      <TagLine />
      <TagLine />
      <TagLine />
      <TagLine />
      <TagLine />
      <TagLine />
    </div>
  );
}
