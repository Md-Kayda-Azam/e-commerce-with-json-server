import React, { useEffect, useState } from 'react';
import DataTables from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from '../../order/orderSlice';
import { ITEMS_PER_PAGE } from '../../../app/constants';
const AdminOrders = () => {
  const cols = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Items',
      selector: (row) => (
        <>
          {row.items.map((item) => (
            <div className="flex items-center">
              <div className="mr-2 flex flex-drection-row items-center gap-3 my-2">
                <img
                  className="w-9 h-9 rounded-full"
                  src={item.thumbnail}
                  alt="thumbnail"
                />
                <div className="">
                  <p>{item.title}</p>
                  <span>#{item.quantity}</span> - &nbsp;
                  <span>${item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </>
      ),
      sortable: true,
    },
    {
      name: 'Addresses',
      selector: (row) => (
        <>
          <div>
            <ul className="flex gap-2 flex-col my-3">
              <li>
                <strong>Name: {row.selectedAddressMethed.name}</strong>
              </li>
              <li>Email: {row.selectedAddressMethed.email}</li>
              <li>Phone: {row.selectedAddressMethed.phone}</li>
              <li>Country: {row.selectedAddressMethed.country}</li>
              <li>City: {row.selectedAddressMethed.city}</li>
              <li>State: {row.selectedAddressMethed.state}</li>
              <li>Street: {row.selectedAddressMethed.street}</li>
            </ul>
          </div>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Total Amount',
      selector: (row) => <>${row.totalAmount}</>,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (
        <>
          {row.id === editTableOrderId ? (
            <select onChange={(e) => handleStatusUpdate(e, row)}>
              <option value="">-choose--</option>
              <option value="Pending">Pending</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
              <option value="Cencelled">Cencelled</option>
            </select>
          ) : (
            <div
              className={`${chooseColor(
                row.status
              )} rounded-full px-3 py-1 text-xs`}
            >
              {row.status}
            </div>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      selector: (row) => (
        <>
          <button
            onClick={(e) => handleShow(e, row)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            <i className="fa-solid fa-eye"></i>
          </button>{' '}
          <button
            onClick={() => handleEdit(row.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <i className="fa-solid fa-trash-can"></i>
          </button>{' '}
        </>
      ),
      sortable: true,
    },
  ];
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [editTableOrderId, setEditTableOrderId] = useState(-1);

  /**
   * GET ALl Orders
   */
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  /**
   * Handle Edit ID
   * @param {*} order
   */
  const handleEdit = (order) => {
    setEditTableOrderId(order);
  };

  /**
   * Handle Show Product
   * @param {*} order
   */
  const handleShow = (order) => {
    dispatch();
  };

  /**
   * Handle Status update product
   * @param {*} e
   * @param {*} order
   */
  const handleStatusUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditTableOrderId(-1);
  };

  /**
   * Choose color function
   * @param {*} status
   * @returns
   */
  const chooseColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-purple-200 text-purple-600';
      case 'Dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'Delivered':
        return 'bg-green-200 text-green-600';
      case 'Cencelled':
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  };
  return (
    <>
      <div className="overflow-x-auto">
        <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <DataTables
                fixedHeader
                pagination
                title="All Products Data"
                columns={cols}
                data={orders}
                // onSelectedRowsChange={handleRowSelect}
                // contextActions={contextActions}
                selectableRows
                highlightOnHover
                // clearSelectedRows={toggleCleared}
                subHeader
                subHeaderComponent={
                  <>
                    <input
                      id="search"
                      type="text"
                      className="rounded-md"
                      placeholder="Search ..."
                      aria-label="Search Input"
                      style={{ width: '200px' }}
                      // value={filterText}
                      // onChange={(e) => setFilterText(e.target.value)}
                    />
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      <i className="fa fa-times"></i>
                    </button>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
