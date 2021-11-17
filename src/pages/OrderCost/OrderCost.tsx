import { useContext } from 'react';
import { OrderStore } from '../../store';
import './OrderCost.scss';

export const OrderCost = () => {
  const { price, delivery } = useContext(OrderStore);
  return (
    <div className='OrderCost__wrap'>
      <h4 className='OrderCost__title'>Сумма заказа</h4>
      <div className='OrderCost__items'>
        <div>
          <span>Подытог:</span>
          <span>{price ? `${price} ₽` : '-'}</span>
        </div>
        <div>
          <span>Доставка:</span>
          {delivery ? <span>{delivery} ₽</span> : <span className='free'>Бесплатно</span>}
        </div>
      </div>
      <div className='OrderCost__divider' />
      <div className='OrderCost__result'>
        <h3>Итого</h3>
        <span>{(price ?? 0) + (delivery ?? 0)} ₽</span>
      </div>
    </div>
  );
};
