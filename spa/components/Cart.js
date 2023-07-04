const dateFormatter = new Intl.DateTimeFormat("sv-SE");

export default function Cart({ user, date, products }) {
  const totalPrice = products.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  );

  const formattedDate = dateFormatter.format(new Date(date));

  return (
    <div className="w-full rounded-sm border border-gray-200 bg-white shadow-lg">
      <header className="border-b border-gray-100 px-5 py-4">
        <div className="font-semibold text-gray-800">
          Cart for user{" "}
          <span className="text-pink-500">
            {user.name.firstname} {user.name.lastname}
          </span>{" "}
          at {formattedDate}
        </div>
      </header>

      <div className="overflow-x-auto p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
            <tr>
              <th className="p-2">
                <div className="text-left font-semibold">Product Name</div>
              </th>
              <th className="p-2">
                <div className="text-left font-semibold">Quantity</div>
              </th>
              <th className="p-2">
                <div className="text-left font-semibold">Total</div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {products.map(({ id, title, quantity, price }) => (
              <tr key={id}>
                <td className="p-2">
                  <div className="font-medium text-gray-800">{title}</div>
                </td>
                <td className="p-2">
                  <div className="text-left">{quantity}</div>
                </td>
                <td className="p-2">
                  <div className="text-left font-medium text-green-500">
                    $ {price * quantity}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-4 border-t border-gray-100 px-5 py-4 text-2xl font-bold">
        <div>Total</div>
        <div className="text-blue-600">
          $ <span>{totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
