import { createStore, applyMiddleware, compose, Middleware, combineReducers } from 'redux';
//import { composeSlice } from '..//compose/compose.config';
//import { sidebarSlice } from '../folders/folders.config';
//import { lettersSlice } from '../letters/letters.config';
import { notificationSlice } from '..//notification/notification.config';
import { popupSlice } from '../popup/popup.config';
import { appSlice } from '../app/app.config';
//import { settingsSlice } from 'src/settings/settings.config';
import {reducers} from './reducer';
import { System, useSystem } from '@reflexio/reflexio-on-redux/lib/System';
import { MiddlewareHotSwapManager } from './middlewareHotSwapManager';
import { LoadModuleManager } from './loadModuleManager';

const lettersMvHSManager = new MiddlewareHotSwapManager();
const composeMvHSManager = new MiddlewareHotSwapManager();
const foldersMvHSManager = new MiddlewareHotSwapManager();

const moduleManager = new LoadModuleManager()

let rootReducer = combineReducers(reducers);


setTimeout( async()=> {
  await moduleManager.loadScript('/letter.js')
  //@ts-ignore
  const ls = window.lettersSlice;
  if(ls) {
    console.log('LOADED LETTERS MODULE');
    reducers['letters'] = ls.reducer['letters'];
    rootReducer = combineReducers({...reducers});
    store.replaceReducer(rootReducer);
    lettersMvHSManager.addMiddleware(ls.middleware)
    store.dispatch({
      'type': 'lettersList/init',
      payload: null,
    })
  }
  else {
    console.log('NO LS module');
  }

  await moduleManager.loadScript('/compose.js')
  //@ts-ignore
  const cp = window.composeSlice;
  if(cp) {
    console.log('LOADED COMPOSE MODULE');
    reducers['compose'] = cp.reducer['compose'];
    rootReducer = combineReducers({...reducers});
    store.replaceReducer(rootReducer);
    composeMvHSManager.addMiddleware(cp.middleware)
    store.dispatch({
      'type': 'setContent/init',
      payload: null,
    })
  }
  else {
    console.log('NO CP module');
  }


  await moduleManager.loadScript('/folders.js')
  //@ts-ignore
  const sb = window.sidebarSlice;
  if(sb) {
    console.log('LOADED FOLDERS MODULE');
    reducers['folders'] = sb.reducer['folders'];
    rootReducer = combineReducers({...reducers});
    store.replaceReducer(rootReducer);
    foldersMvHSManager.addMiddleware(sb.middleware)
    store.dispatch({
      'type': 'folders/init',
      payload: null,
    })
  }
  else {
    console.log('NO SB module');
  }

  // import('../letters/letters.config' ).then( module => {
  //   //@ts-ignore
  //   reducers['letters'] = module.default.reducer['letters'];
  //   rootReducer = combineReducers({...reducers});
  //   store.replaceReducer(rootReducer);
  //   lettersMvHSManager.addMiddleware(module.default.middleware);
  //   console.log('LOADED LETTERS MODULE');
  //   store.dispatch({
  //     'type': 'lettersList/init',
  //     payload: null,
  //   })
  // })
  // import('../compose/compose.config' ).then( module => {
  //   //@ts-ignore
  //   reducers['compose'] = module.default.reducer['compose'];
  //   rootReducer = combineReducers({...reducers});
  //   store.replaceReducer(rootReducer);
  //   composeMvHSManager.addMiddleware(module.default.middleware);
  //   console.log('LOADED COMPOSE MODULE')
  //   store.dispatch({
  //     'type': 'setContent/init',
  //     payload: null,
  //   })
  // })
  // import('../folders/folders.config' ).then( module => {
  //   //@ts-ignore
  //   reducers['folders'] = module.default.reducer['folders'];
  //   rootReducer = combineReducers({...reducers});
  //   store.replaceReducer(rootReducer);
  //   foldersMvHSManager.addMiddleware(module.default.middleware);
  //   console.log('LOADED FOLDERS MODULE')
  //   store.dispatch({
  //     'type': 'folders/init',
  //     payload: null,
  //   })
  // })
},5000)


function configureStore() {
  const middlewares: Middleware[] = [
    //lettersSlice.middleware,
    //  settingsSlice.middleware,
    lettersMvHSManager.cumulativeMiddleWare,
    composeMvHSManager.cumulativeMiddleWare,
    foldersMvHSManager.cumulativeMiddleWare,
    //composeSlice.middleware,
    notificationSlice.middleware,
    popupSlice.middleware,
    //sidebarSlice.middleware,
    appSlice.middleware,
  ];
  let mw = applyMiddleware(...middlewares)
  const store = createStore(
    rootReducer,
    compose(mw)
  );

  store.subscribe;

  return store;
}
export const system = useSystem();

//system.afterHandlers.forEach( ah => store.subscribe(ah))

export const store = configureStore();
store.subscribe(() => {
  system.afterHandlers.forEach((s) => s());
});


export const dispatch = store.dispatch;

