import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.body).render(
  <BrowserRouter basename="">
    <App />
  </BrowserRouter>
);