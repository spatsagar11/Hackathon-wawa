import { ACTION_TYPES, DATA_LOAD_STATUS } from './rootReducer'
import Server, { RESOURCE_URI } from 'server'
import { get } from 'lodash';

const processTSData = (rawData) => {
    const dates = Object.keys(rawData.dates);
    return dates.map(date => ({
        date,
        confirmed: get(rawData, `dates[${date}].total.confirmed`, 0),
        recovered: get(rawData, `dates[${date}].total.recovered`, 0),
        deceased: get(rawData, `dates[${date}].total.deceased`, 0),
        tested: get(rawData, `dates[${date}].total.tested`, 0),
    }))
        .map(data => ({ ...data, active: data.confirmed - data.recovered - data.deceased }));
}

export function loadDataAction() {
    return async (dispatch, getState) => {
        const reduxState = getState();
        if (reduxState.app.dataLoadStatus === DATA_LOAD_STATUS.DATA_NOT_LOADED) {

            dispatch({ type: ACTION_TYPES.SET_DATA_LOAD_STATUS, status: DATA_LOAD_STATUS.IN_PROGRESS });

            const [response, timeSeriesResponse] = await Promise.all([
                Server.get(RESOURCE_URI.data),
                Server.get(RESOURCE_URI.timeSeriesData)
            ]);

            if (response.ok) {
                const { TT: countryData, ...stateWiseData } = response.payload;
                dispatch({ type: ACTION_TYPES.DATA_LOADED, data: { stateWiseData, countryData } });
            }

            if (timeSeriesResponse.ok) {
                const { TT: countryData, ...stateWiseData } = timeSeriesResponse.payload;
                const countryTSData = processTSData(countryData);
                const stateWiseTSData = Object.keys(stateWiseData)
                    .map(stateCode => ({ stateCode, data: processTSData(stateWiseData[stateCode]) }))
                    .reduce((acc, { stateCode, data }) => ({ ...acc, [stateCode]: data }), {});

                dispatch({ type: ACTION_TYPES.DATA_LOADED, data: { countryTSData, stateWiseTSData } });
            }

        }
    }
}

export function setActiveChart(activeChart) {
    return {
        type: ACTION_TYPES.SET_ACTIVE_CHART,
        activeChart
    }
}
const EMPTY_SUMMARY_DATA = { total: {}, delta: {} };
const EMPTY_ARRAY = [];
const EMPTY_MAP = {};

export const stateWiseDataSelector = (state) => get(state, 'app.stateWiseData', EMPTY_SUMMARY_DATA);
export const countryDataSelector = (state) => get(state, 'app.countryData', EMPTY_SUMMARY_DATA);

export const stateWiseTSDataSelector = (state) => get(state, 'app.stateWiseTSData', EMPTY_MAP);
export const countryTSDataSelector = (state) => get(state, 'app.countryTSData', EMPTY_ARRAY);

export const activeChartSelector = (state) => get(state, 'app.activeChart', undefined);