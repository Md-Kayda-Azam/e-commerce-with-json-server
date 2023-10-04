import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from '../userSlice';

function UserOrders() {
  const user = useSelector(selectUserInfo);

  const orders = useSelector(selectUserOrders);
  const dispatch = useDispatch();

  console.log(orders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user.id]);
  return (
    <div>
      {orders?.map((order) => (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-12 font-bold tracking-tight text-gray-900">
              Order #{order.id}
            </h1>
            <h5 className="text-xl my-12 font-bold tracking-tight text-red-900">
              Order status : {order.status}
            </h5>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((order) => (
                  <>
                    <li key={order.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={order.thumbnail}
                          alt={order.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={order.href}>{order.title}</a>
                            </h3>
                            <p className="ml-4">${order.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {order.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty {order.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${order.totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{order.totalItems} Items</p>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Shiping address :
              </h2>
              <ul role="list">
                <li className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddressMethed.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddressMethed.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddressMethed.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {order.selectedAddressMethed.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {order.selectedAddressMethed.city}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default UserOrders;
