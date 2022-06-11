import * as axios from 'axios';

declare const SERVICES: {
    NPSE: {
        todaysPrice: string;
    };
    IDX: {
        companies: string;
    };
};
declare const getNepseTodaysPrice: (date: string) => Promise<axios.AxiosResponse<any, any>>;

export { SERVICES, getNepseTodaysPrice };
