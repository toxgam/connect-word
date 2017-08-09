import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

const initApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))

  if (window.AdMob) {
    // gplinh@gmail.com
    const adId = /(android)/i.test(navigator.userAgent)
      ? 'ca-app-pub-6654289360326490/9422160073'
      : 'ca-app-pub-6654289360326490/2114515697'

    window.AdMob.createBanner({
      adId,
      position: window.AdMob.AD_POSITION.BOTTOM_CENTER,
      autoShow: true,
      success: function() {
        console.log('Loaded AdMob')
      },
      error: function() {
        console.log('Could not load AdMob')
      }
    })
  }
}

if (/(ipad|iphone|ipod|android)/i.test(navigator.userAgent)) {
  document.addEventListener('deviceready', initApp, false)
} else {
  initApp()
}
