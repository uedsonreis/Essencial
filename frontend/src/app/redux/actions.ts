import { createAction, props } from '@ngrx/store';

import { Item } from '../models/item.model';

export const updateUser = createAction('UPDATE_USER', props<any>());
export const logout = createAction('LOGOUT');

export const addItem = createAction('ADD_ITEM', props<Item>());
export const removeItem = createAction('REMOVE_ITEM', props<Item>());