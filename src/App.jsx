import './App.css'
import Sidebar from "./components/layouts/Sidebar";

import RightContent from "./components/layouts/RightContent";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import {applyMiddleware, createStore} from "redux";
import rootReducer from './reducers'
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
function App() {

  return (
      <Provider store={store}>
        <BrowserRouter>
            <div className="App">
                <div className="app-layout">
                    <Sidebar />
                    <RightContent />
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover={false}
                    theme="dark"
                />
            </div>
        </BrowserRouter>
      </Provider>
  )
}
store.subscribe(() => {
    var str = store.getState();
    //console.log(str)
});

export default App
