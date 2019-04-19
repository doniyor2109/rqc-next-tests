/* eslint no-extend-native: 0 */
// core-js comes with Next.js. So, you can import it like below
import includes from 'core-js/library/fn/string/virtual/includes'
import repeat from 'core-js/library/fn/string/virtual/repeat'


// Add your polyfills
// import 'core-js/es6/map';
import 'core-js/es6/symbol';
import 'core-js/es6/set';


import 'core-js/fn/object/assign';
// import 'core-js/fn/string/ends-with';
import 'core-js/fn/string/starts-with';
// import 'core-js/fn/string/includes';
import 'core-js/fn/array/includes';
// import 'core-js/fn/array/find';

// import 'core-js/fn/number/is-finite';
// This files runs at the very beginning (even before React and Next.js core)
// console.log('Load your polyfills')

String.prototype.includes = includes
String.prototype.repeat = repeat