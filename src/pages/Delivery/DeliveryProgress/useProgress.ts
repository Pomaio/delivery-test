import { useMemo, useRef } from "react";
import { IDeliveryPoint } from "./DeliveryProgress";
import { useResizeObserver } from "./useResizeObserver";

type PointWithRef = IDeliveryPoint & { ref?: React.MutableRefObject<HTMLDivElement> }

export const useProgress = (rowData: IDeliveryPoint[]) => {
    const firstElementRef = useRef<HTMLDivElement>(null);
    const lastActiveElementRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    const resizeWrap = useResizeObserver(wrapRef);

    const { width, offset } = useMemo(() => {
        const firstRects = firstElementRef.current?.getClientRects();
        const secondRects = lastActiveElementRef.current?.getClientRects();
        if ((resizeWrap?.width ?? 0) <= 580) {
            return {
                width: (secondRects?.item(0)?.x ?? 0)
                    - (firstRects?.item(0)?.x ?? 0)
                    + Math.max((firstRects?.item(0)?.width ?? 0) / 2 - 8, 0),
                offset: 0
            }
        }
        return {
            width: (secondRects?.item(0)?.x ?? 0) - (firstRects?.item(0)?.x ?? 0),
            offset: Math.max((firstRects?.item(0)?.width ?? 0) / 2 - 8, 0)
        }
    }, [resizeWrap])


    const data = rowData.map((v, pos, arr) => {
        if (v.disabled) return v
        if (pos === 0) return { ...v, ref: firstElementRef }
        if (arr[pos + 1].disabled) return { ...v, ref: lastActiveElementRef }
        return v
    }) as Array<PointWithRef>

    return {
        data,
        wrapRef,
        progressProps: {
            width,
            left: offset
        }
    }
};