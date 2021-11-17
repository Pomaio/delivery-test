import './DeliveryForm.scss';
import { useForm } from './useForm';

export const DeliveryForm = () => {
  const { formState, handleValueChange, isFormValid, deleveryProvider } = useForm();
  return (
    <form
      className='DeliveryForm__form'
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formState);
      }}
    >
      <div className='DeliveryForm__form__row'>
        <div className='DeliveryForm__form__item'>
          <label htmlFor='country'>Страна и регион</label>
          <select
            name='country'
            value={formState.country}
            onChange={(e) => handleValueChange({ country: e.target.value })}
          >
            <option value='' disabled>
              Выберите вашу страну и регион
            </option>
            <option>РФ</option>
          </select>
        </div>
        <div className='DeliveryForm__form__item'>
          <label htmlFor='postcode'>ПОЧТОВЫЙ ИНДЕКС</label>
          <input
            name='postcode'
            placeholder='Введите ваш почтовый индекс'
            value={formState.postcode}
            onChange={(e) => handleValueChange({ postcode: e.target.value })}
          />
        </div>
      </div>
      <div className='DeliveryForm__form__row'>
        <div className='DeliveryForm__form__item'>
          <label htmlFor='city'>ГОРОД</label>
          <input
            name='city'
            placeholder='Введите город'
            value={formState.city}
            onChange={(e) => handleValueChange({ city: e.target.value })}
          />
        </div>
        <div className='DeliveryForm__form__item'>
          <label htmlFor='customer'>ФИО ПОЛУЧАТЕЛЯ</label>
          <input
            name='customer'
            placeholder='Введите ФИО'
            value={formState.customer}
            onChange={(e) => handleValueChange({ customer: e.target.value })}
          />
        </div>
      </div>
      <div className='DeliveryForm__form__row'>
        <div className='DeliveryForm__form__item'>
          <label htmlFor='address'>Адрес</label>
          <input
            name='address'
            placeholder='Введите улицу, дом и квартиру'
            value={formState.address}
            onChange={(e) => handleValueChange({ address: e.target.value })}
          />
        </div>
        <div className='DeliveryForm__form__item'>
          <label htmlFor='phone'>ТЕЛЕФОН ПОЛУЧАТЕЛЯ</label>
          <input
            name='phone'
            placeholder='+7 (___)-___-__-__'
            value={formState.phone}
            onChange={(e) => handleValueChange({ phone: e.target.value })}
          />
        </div>
      </div>
      <div className='DeliveryForm__form__item'>
        <label htmlFor='comment'>Комментарий</label>
        <textarea
          name='comment'
          placeholder='Введите ваш комментарий'
          value={formState.comment}
          onChange={(e) => handleValueChange({ comment: e.target.value })}
        />
      </div>
      <label className='DeliveryForm__form__checkoboxItem'>
        <input
          type='checkbox'
          name='shouldBeSave'
          checked={formState.shouldBeSave}
          onChange={(e) => handleValueChange({ shouldBeSave: e.target.checked })}
        />
        <span className='DeliveryForm__form__checkoboxItem__checkmark' />
        Сохранить данные для последующих заказов
      </label>
      <div className='DeliveryForm__form__item'>
        <label>Службы доставки</label>
        <div className='DeliveryForm__form__providers'>
          {deleveryProvider.map((value, index) => (
            <div
              key={index}
              className={
                'DeliveryForm__form__providers__item' +
                (value.disabled || !isFormValid ? ' disabled' : value.key === formState.provider ? ' active' : '')
              }
              onClick={() => handleValueChange({ provider: value.key })}
            >
              <img src={value.iconSrc} alt={value.title + ' logo'} />
              <div className='DeliveryForm__form__providers__item__info'>
                <h4>{value.title}</h4>
                {value.disabled || !isFormValid ? (
                  <span>Сумма</span>
                ) : value.price ? (
                  <span>{value.price} ₽</span>
                ) : (
                  <span className='free'>Бесплатно</span>
                )}
              </div>
              <div className='DeliveryForm__form__providers__item__check'></div>
            </div>
          ))}
        </div>
      </div>
      <button className='DeliveryForm__form__button' type='submit'>
        Далее
      </button>
    </form>
  );
};
