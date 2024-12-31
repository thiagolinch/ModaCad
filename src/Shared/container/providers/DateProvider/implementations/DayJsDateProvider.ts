import dayjs from "dayjs"
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc)

class DaysJSDateProvider implements IDateProvider {

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    compareInHours(start_date: Date, end_date: Date): number {
        const end_date_utc = dayjs(end_date).utc().local().format();
        const start_date_utc = dayjs.utc().local().format();

        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = dayjs(end_date).utc().local().format();
        const start_date_utc = dayjs.utc().local().format();

        return dayjs(end_date_utc).diff(start_date_utc, "days");
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hours").toDate();
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date)
    }

}

export { DaysJSDateProvider }