/*import { all, takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router'; // React Router ile entegrasyon için

function* handleCountryClick(action) {
  const { countryName } = action.payload;
  yield put(push(`/country/${countryName}`)); // Yeni sayfayı aç
}

function* watchCountryClick() {
  yield takeEvery('COUNTRY_CLICK', handleCountryClick);
}

export default function* rootSaga() {
  yield all([
    watchCountryClick(),
    // İhtiyaca göre diğer watcher'ları buraya ekleyin
  ]);
}*/
