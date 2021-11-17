import './DeliveryProgress.scss';
import { useProgress } from './useProgress';

export interface IDeliveryPoint {
  iconSrc: string;
  title: string;
  disabled?: boolean;
}

const deliveryPoints: IDeliveryPoint[] = [
  {
    iconSrc: 'icons/home.svg',
    title: 'Авторизация',
  },
  {
    iconSrc: 'icons/box.svg',
    title: 'Доставка',
  },
  {
    iconSrc: 'icons/wallet.svg',
    title: 'Оплата',
    disabled: true,
  },
];

export const DeliveryProgress = () => {
  const { data, wrapRef, progressProps } = useProgress(deliveryPoints);
  return (
    <div className='DeliveryProgress__bar' ref={wrapRef}>
      <span className='DeliveryProgress__bar__current' style={progressProps} />
      {data.map(({ iconSrc, title, disabled, ref }, pos) => (
        <div className={'DeliveryProgress__point' + (disabled ? ' disabled' : '')} key={pos} ref={ref}>
          <img src={iconSrc} width='24' height='24' alt={`${title}-logo`} />
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
};
