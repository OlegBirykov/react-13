import { takeLatest, put, spawn, debounce, retry } from 'redux-saga/effects';
import { searchSkillsRequest, searchSkillsSuccess, searchSkillsFailure } from '../actions/actionCreators';
import { CHANGE_SEARCH_FIELD, SEARCH_SKILLS_REQUEST } from '../actions/actionTypes';
import { searchSkills } from '../api/index';

// watcher
function* watchChangeSearchSaga() {
  yield debounce(100, CHANGE_SEARCH_FIELD, handleChangeSearchSaga);
}

// worker
function *handleChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload.search.trim()));
}

// watcher
function* watchSearchSkillsSaga() {
  yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga);
}

// worker
function* handleSearchSkillsSaga(action) {
  if (action.payload.search) {
    try {
      const retryCount = 3;
      const retryDelay = 1 * 1000; // ms
      const data = yield retry(retryCount, retryDelay, searchSkills, action.payload.search);
      yield put(searchSkillsSuccess(data));
    } catch (e) {
      yield put(searchSkillsFailure(e.message));
    }
  } else {
    yield put(searchSkillsSuccess([]));
  }
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga)
}