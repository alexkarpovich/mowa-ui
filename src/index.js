import ReactDOM from 'react-dom';
import './fonts/KaiTi.ttf';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from './serviceWorker';
import ApolloProvider from './apollo-provider';

ReactDOM.render(ApolloProvider, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
