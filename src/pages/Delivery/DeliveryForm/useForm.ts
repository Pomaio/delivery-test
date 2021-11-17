import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { OrderStore } from "../../../store";


interface Provider {
    title: string;
    price: number;
    iconSrc: string;
    key: string;
    disabled?: boolean;
}
const deleveryProvider: Provider[] = [
    {
        title: 'DPD Курьер',
        price: 300,
        key: 'dpd',
        iconSrc: 'icons/dpd.svg',
    },
    {
        title: 'СДЭК Курьер',
        price: 0,
        key: 'sdek',
        iconSrc: 'icons/sdek.svg',
    },
    {
        title: 'Почта россии курьер',
        price: 200,
        key: 'russian',
        iconSrc: 'icons/russian.svg',
    },
];

interface IDeliveryInfo {
    country: string,
    postcode: string,
    city: string,
    customer: string,
    address: string,
    phone: string,
    comment: string,
    shouldBeSave: boolean,
    provider: string,
}

const initialState: IDeliveryInfo = {
    country: '',
    postcode: '',
    city: '',
    customer: '',
    address: '',
    phone: '',
    comment: '',
    shouldBeSave: true,
    provider: '',
}

export const useForm = () => {
    const [formState, setFormState] = useState(initialState);
    const { changeOrderPrice } = useContext(OrderStore);

    const handleValueChange = useCallback((value: Partial<IDeliveryInfo>) => {
        setFormState({ ...formState, ...value })
    }, [formState]);

    const isFormValid = useMemo(() => Object.entries(formState).every(
        ([key, value]) => ['shouldBeSave', 'provider'].includes(key) || value
    ), [formState]);

    useEffect(() => {
        if (isFormValid) return
        setFormState(v => ({ ...v, provider: '' }))
    }, [isFormValid])

    useEffect(() => {
        changeOrderPrice?.({
            delivery: formState.provider
                ? deleveryProvider.find(({ key }) => key === formState.provider)?.price
                : undefined
        })
    }, [formState.provider])

    return {
        handleValueChange,
        formState,
        isFormValid,
        deleveryProvider
    };
};