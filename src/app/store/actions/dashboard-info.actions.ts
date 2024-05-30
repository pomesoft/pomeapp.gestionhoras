import { createAction, props } from '@ngrx/store';
import { DashboardInfo, DataFiltro } from '../../models/entity.models';


export const cargarDashboardInfo = createAction(
    '[DashboardInfo] Cargar Dashboard Info'
);

export const cargarDashboardInfoSuccess = createAction(
    '[DashboardInfo] Cargar Dashboard Info Success',
    props<{ dashboardInfo: DashboardInfo }>()
);

export const cargarDashboardInfoError = createAction(
    '[DashboardInfo] Cargar Dashboard Info Error',
    props<{ payload: any }>()
);
