import { createAction, props } from '@ngrx/store';

import { Item } from '../models/item.model';
import { User } from '../models/user.model';

export const updateUser = createAction('UPDATE_USER', props<User>());
export const logout = createAction('LOGOUT');

export const addItem = createAction('ADD_ITEM', props<Item>());
export const removeItem = createAction('REMOVE_ITEM', props<Item>());