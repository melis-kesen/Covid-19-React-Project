// redux/sagas.js
import { takeEvery, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_DATA_REQUEST,
  fetchDataSuccess,
  fetchDataFailure,
} from "./actions";

function* fetchDataSaga(action) {
  try {
    const response = yield call(fetchDataFromApi, action.payload);
    let list = [];
    for (let i = 0; i < response.data.data.length; i++) {
      list.push({
        province:
          response.data.data[i].region.province === ""
            ? "ALL"
            : response.data.data[i].region.province,
        active: response.data.data[i].active,
        deaths: response.data.data[i].deaths,
        confirmed: response.data.data[i].confirmed,
        regionName: response.data.data[i].region.name,
        date: response.data.data[i].date,
        fatalityRate: response.data.data[i].fatality_rate,
      });
    }
    yield put(fetchDataSuccess(list));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

function fetchDataFromApi(name) {
  return axios.get(
    `https://covid-19-statistics.p.rapidapi.com/reports?iso=${name}`,
    {
      headers: {
        "X-RapidAPI-Key": "your-key",
        "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
      },
    }
  );
}

function* rootSaga() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchDataSaga);
}

export default rootSaga;
