import { createReducer, on, combineReducers, ActionReducerMap, Action } from '@ngrx/store';
import { logout, updateUser, addItem, removeItem } from './actions'
import { Item } from '../models/item.model';
import { User } from '../models/user.model';

export const stateKeys = [ 'cart', 'user' ];

function merge(prev: any, next: any) {
    return Object.assign({}, prev, next);
}

const cartReducer = createReducer<Item[]>(
    [] as Item[],
    on(addItem, (state: Item[], payload: any) => {
        const filtered = state.find(item => item.product.id === payload.product.id);
        if (filtered) {
            return state.map(item => (item.product.id === payload.product.id) ? { ...payload, amount: item.amount + payload.amount } : item);
        }
        else return [ ...state, payload];
    }),
    on(removeItem, (state: Item[], payload: any) => (
        state.filter(item => item.product.id !== payload.product.id)
    ))
);

const userReducer = createReducer<User>(
    {} as User,
    on(logout, (state: any, payload: any) => ({})),
    on(updateUser, (state: User, payload: any) => (merge(state, payload)))
);

export default {
    [stateKeys[0]]: cartReducer,
    [stateKeys[1]]: userReducer
} as ActionReducerMap<any, Action>;