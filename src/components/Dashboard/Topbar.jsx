import { Bell } from "lucide-react";

const Topbar = () => {
  return (
    <header className="bg-white px-8 py-5 border-b flex justify-between items-center">

      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-6">

        <Bell />

        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
          A
        </div>

      </div>

    </header>
  );
};

export default Topbar;