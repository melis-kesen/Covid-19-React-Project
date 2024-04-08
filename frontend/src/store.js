/*import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

// Tarayıcı geçmişi oluştur
export const history = createBrowserHistory();

// Redux Saga ortamını oluştur
const sagaMiddleware = createSagaMiddleware();

// Redux Store oluştur
const store = createStore(
  rootReducer(history), // rootReducer'a geçmişi iletilir
  compose(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history) // React Router geçmişi iletilir
    ),
    // İhtiyaca göre diğer middleware'leri ekleyebilirsiniz
  )
);

// Redux Saga'ları çalıştır
sagaMiddleware.run(rootSaga);

export default store;*/
