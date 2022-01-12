import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Home from './component/Home';
import Insert from './component/Insert';
import Update from './component/updateformik';
import { ToastContainer } from 'react-toastify';
import { Zoom } from 'react-toastify';


function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer transition={Zoom} style={{ marginRight:25,maxWidth:250 }}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Insert" component={Insert} />
          <Route exact path="/Update/:_id" component={Update} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
