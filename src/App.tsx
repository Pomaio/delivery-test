import { useState } from 'react';
import './App.scss';
import { Delivery, OrderCost } from './pages';
import { IOrderPrice, OrderStore } from './store';

function App() {
  const [orderPrice, setOrderPrice] = useState<Omit<IOrderPrice, 'changeOrderPrice'>>({ price: 4800 });
  return (
    <OrderStore.Provider
      value={{ ...orderPrice, changeOrderPrice: (values) => setOrderPrice({ ...orderPrice, ...values }) }}
    >
      <div className='layout'>
        <Delivery />
        <OrderCost />
      </div>
    </OrderStore.Provider>
  );
}

export default App;
