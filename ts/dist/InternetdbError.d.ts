import { Context } from './Context';
declare class InternetdbError extends Error {
    isInternetdbError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { InternetdbError };
