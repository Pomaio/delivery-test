import { DeliveryProgress } from './DeliveryProgress';
import { DeliveryForm } from './DeliveryForm';

import './Delivery.scss';
import { useMemo, useState } from 'react';

const deliveryTabs = [
  {
    type: 'courier',
    title: 'Курьер',
    disabled: false,
    children: DeliveryForm,
  },
  {
    type: 'pickup',
    title: 'Самовывоз',
    disabled: true,
    children: () => null,
  },
] as const;

export const Delivery = () => {
  const [type, setType] = useState<typeof deliveryTabs[number]['type']>('courier');

  const Content = useMemo(() => deliveryTabs.find((v) => v.type === type)?.children ?? (() => null), [type]);

  return (
    <div className='Delivery__wrap'>
      <h2 className='Delivery__header'>Доставка</h2>
      <DeliveryProgress />
      <div>
        <h4 className='Delivery__label'>тип доставки</h4>
        <div className='Delivery__tabs'>
          {deliveryTabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => !tab.disabled && setType(tab.type)}
              className={'Delivery__tabs__item' + (tab.disabled ? ' disabled' : '')}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <Content />
      </div>
    </div>
  );
};
