import { createReducer, on } from '@ngrx/store';
import { DashboardInfo } from '../../models/entity.models';
import { cargarDashboardInfo, cargarDashboardInfoSuccess, cargarDashboardInfoError } from '../actions';

export interface DashboardInfoState {
    dashboardInfo: DashboardInfo,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const dashboardInfoInitialState: DashboardInfoState = {
    dashboardInfo: null,
    loaded: false,
    loading: false,
    error: null
}

const _dashboardInfoReducer = createReducer(dashboardInfoInitialState,

    on(cargarDashboardInfo, state => ({ 
        ...state, 
        loading: true 
    })),

    on(cargarDashboardInfoSuccess, (state, { dashboardInfo }) => ({
        ...state,
        loading: false,
        loaded: true,
        dashboardInfo: dashboardInfo
    })),

    on(cargarDashboardInfoError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),

);

export function dashboardInfoReducer(state, action) {
    return _dashboardInfoReducer(state, action);
}