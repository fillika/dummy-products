export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
};

export const formatRating = (rating: number): string => {
    return rating.toFixed(1);
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
    return classes.filter(Boolean).join(" ");
};

export const debounce = <T extends (...args: string[]) => unknown>(
    func: T,
    delay: number
): ((...args: string[]) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: string[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

export const validateSku = (sku: string): boolean => {
    const skuRegex = /^[A-Z0-9-]+$/i;
    return skuRegex.test(sku) && sku.length >= 3;
};
