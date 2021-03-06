import { createStore } from 'redux';
import { InitialState } from '../utils/types';
import reducer from './reducer';
import { initialState } from '../index';


const configureStore = (state: InitialState = initialState) => {
    return createStore(reducer, state);
}

export default configureStore
