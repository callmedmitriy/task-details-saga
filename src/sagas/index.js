import { takeLatest, put, spawn, debounce, retry } from 'redux-saga/effects';
import { 
    listFailture,
    listSuccess,
    serviceFailture,
    serviceSuccess
 } from '../actions/actionCreators';
import { LIST_REQUEST, SERVICE_REQUEST } from '../actions/actionTypes';
import { searchServices } from '../api/searchServices';

// workers

function* handleSearchServiceSaga(action) {
    try {
        const retryCount = 3;
        const retryDelay = 1 * 1000;
        const data = yield retry(retryCount, retryDelay, searchServices,action.payload.id)
        yield put(serviceSuccess(data))
    } catch (e) {
        yield put(listFailture(e.message))
    }
}

function* handleSearchListSaga(action) {
    try {
        const retryCount = 3;
        const retryDelay = 1 * 1000;
        const data = yield retry(retryCount, retryDelay, searchServices)
        yield put(listSuccess(data))
    } catch (e) {
        yield put(listFailture(e.message))
    }
}

// watchers
function* watchSearchListSaga() {
    yield takeLatest(LIST_REQUEST, handleSearchListSaga);
}
function* watchServiceInfoSaga() {
    yield takeLatest(SERVICE_REQUEST, handleSearchServiceSaga);
}

export default function* saga() {
    yield spawn(watchSearchListSaga);
    yield spawn(watchServiceInfoSaga);
}

