import { IPokemonsResults, Pokemon } from "../../API/types/apiTypes";

export interface IAppState {
    inputValue: string;
    inputCurrentValue: string;
    detailData: Pokemon | null;
    data: IPokemonsResults[] | Pokemon;
    loading: boolean;
    arrAllPages: number[];
    page: number;
    itemAllPages: number;
    lastPage: number;
    error: boolean;
    isClosed: boolean;
}