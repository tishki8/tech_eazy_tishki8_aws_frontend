import React, { useEffect, useState } from 'react';
import { getTodayOrders } from './api';

function DeliveryOrders({ token }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getTodayOrders(token).then((res) => setOrders(res.data));
  }, [token]);

  return (
    <div>
      <h3>Today's Delivery Orders</h3>
      <ul>
        {orders.map((o, i) => (
          <li key={i}>{o.vendor_name} - {o.total_orders} orders - <a href={o.file_link}>File</a></li>
        ))}
      </ul>
    </div>
  );
}

export default DeliveryOrders;