// redux/store.js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

// Redux Saga middleware oluşturuluyor
const sagaMiddleware = createSagaMiddleware();

// Redux mağazası oluşturuluyor ve Redux Saga middleware ekleniyor
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Redux Saga middleware çalıştırılıyor
sagaMiddleware.run(rootSaga);

export default store;
