import { format, formatDistance } from "date-fns";
import { enUS } from "date-fns/locale";

export function formatNowDistance(date: Date | number,
    options?: {
        addSuffix?: boolean;
        unit?: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';
        roundingMethod?: 'floor' | 'ceil' | 'round';
        locale?: Locale;
    }
): string {
    return formatDistance(date, new Date(), { locale: enUS, ...options });
}

export function formatDateTime(date: Date | number, options?: { locale?: Locale }) {
    return format(date, "dd/MM/yyyy HH:mm", options);
}
