import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import { rootReducer } from "./root.reducer";
import { rootSaga } from "./root.saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares: any = [sagaMiddleware];
if (process.env.NODE_ENV === "development") {
	middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
