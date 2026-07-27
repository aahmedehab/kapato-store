const DashboardHome = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500">
            Orders
          </p>

          <h2 className="text-4xl font-bold mt-2">
            0
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500">
            Revenue
          </p>

          <h2 className="text-4xl font-bold mt-2">
            LE 0
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500">
            Products
          </p>

          <h2 className="text-4xl font-bold mt-2">
            0
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500">
            Customers
          </p>

          <h2 className="text-4xl font-bold mt-2">
            0
          </h2>
        </div>

      </div>

    </div>
  );
};

export default DashboardHome;