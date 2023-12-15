import { applyMiddleware, combineReducers, createStore, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import drawerHOCReducer from "./reducers/drawerHOCReducer"
import filterReducer from "./reducers/filterReducer"
import globalReducer from "./reducers/globalReducer"
import pageReducer from "./reducers/pageReducer"
import modalHOCReducer from "./reducers/modalHOCReducer"
import productReducer from "./reducers/productReducer"
import userReducer from "./reducers/userReducer"
import { rootSaga } from "./sagas/rootSaga"
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    global: globalReducer,
    filter: filterReducer,
    user: userReducer,
    product: productReducer,
    modalHOC: modalHOCReducer,
    drawerHOC: drawerHOCReducer,
    page: pageReducer,
})

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)
export default store
