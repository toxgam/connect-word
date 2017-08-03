import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))

const loadAdMob = () => {
  if (window.AdMob) {
    const adId = /(android)/i.test(navigator.userAgent)
      ? 'ca-app-pub-6654289360326490/9422160073'
      : 'ca-app-pub-6654289360326490/2114515697'
    window.AdMob.createBanner({
      adId,
      position: window.AdMob.AD_POSITION.TOP_CENTER,
      autoShow: true
    })
  }
}
document.addEventListener('deviceready', loadAdMob, false)
