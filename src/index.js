//import('!style-loader!css-loader!./test.css');
//import('./test.css');
import('./index.scss');
import $ from 'jquery';
import intro  from './intro.js';

$(function () {
    $("#info").text(intro);
});
