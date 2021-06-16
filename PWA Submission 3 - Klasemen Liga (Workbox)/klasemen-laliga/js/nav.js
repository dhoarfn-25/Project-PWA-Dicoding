window.addEventListener('DOMContentLoaded', function () {
  const sNav = document.querySelector('.sidenav')
  const preload = document.querySelector('.preloader-background')
  M.Sidenav.init(sNav)
  // preloaded
  preload.classList.add('fade-out')

})
// collapsible
function initCollapsable() {
  const collaps = document.querySelectorAll('.collapsible')
  M.Collapsible.init(collaps)
}

//loadnav
function loadNav() {
  const xhttpNav = new XMLHttpRequest()

  xhttpNav.onreadystatechange = function () {
      if (xhttpNav.readyState == 4) {
          if (xhttpNav.status != 200) return;
          document.querySelector('.topnav').innerHTML = xhttpNav.responseText
          document.querySelector('.mobilenav').innerHTML = xhttpNav.responseText

          document.querySelectorAll('.sidenav a ,.topnav a').forEach(e => {
              e.addEventListener('click', click => {
                  // Tutup sidenav
                  let sidenav = document.querySelector(".sidenav")
                  M.Sidenav.getInstance(sidenav).close()

                  // click.preventDefault()
                  let page = click.target.getAttribute('href').substr(1)
                  if (page != '!') {
                      route(page)
                  }
              })
          })
      }
  }
  xhttpNav.open('GET', 'nav.html')
  xhttpNav.send()
}

var convertDate = date => {
    const namaBulan = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return `${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()} ${formatAMPM(date)}`
}

function formatAMPM(date) {
    var jam = date.getHours();
    var menit = date.getMinutes();
    var ampm = jam >= 12 ? 'pm' : 'am';
    jam = jam % 12;
    jam = jam ? jam : 12;
    menit = menit < 10 ? '0' + menit : menit;
    var strTime = jam + ':' + menit + ' ' + ampm;
    return strTime;
}

//loadpage
function loadPage(page) {
  const xhttpPage = new XMLHttpRequest()
  xhttpPage.open('GET', `pages/${page}.html`, true)
  xhttpPage.send()
  return new Promise((resolve, reject) => {
      xhttpPage.onreadystatechange = function () {
        const dPage = document.querySelector("#body-content");

          if (xhttpPage.readyState == 4) {
              const dPage = document.querySelector('#main-display')
              if (xhttpPage.status == 200) {
                  dPage.innerHTML = xhttpPage.responseText
                  resolve(page)
              } else if (xhttpPage.status == 404) {
                  dPage.innerHTML = '<h2>halaman tidak ditemukan</h2>'
                  reject(new Error('http.status : 404 || file not found'))
              } else {
                  dPage.innerHTML = '<h2>Opps... halaman tidak dapat di akses</h2>'
              }
          }

      }
  })
}

/**
* 
* @param {String} url start with #
*/

function parseUrl(url) {
  let page, queryString, arr = [],
      queryObj = {}
  // url = url !== null ? url : new URL(window.location.href.replace('#',''))
  if (url != null) {
      url = url.indexOf('#') > -1 ? url.replace('#', '') : url
      page = url
      if (url.indexOf('?') > -1) {
          url = url.split('?')
          page = url[0]

          if (url[1].indexOf('&') > -1) {
              arr = url[1].split('&')
              arr.forEach(v => {
                  let subQuery = v.split('=')
                  if (subQuery[1]) {
                      queryObj[subQuery[0]] = subQuery[1]
                  } else {
                      queryObj[subQuery[0]] = true
                  }
              })
          } else {
              page = url[0]

              subQuery = url[1].indexOf('=') > -1 ? url[1].split('=') : url[1]
              if (Array.isArray(subQuery) && subQuery[1] != undefined) {
                  queryObj[subQuery[0]] = subQuery[1]
              } else {
                  queryObj[subQuery] = true
              }
          }
      } else {
          queryObj['noQuery'] = true
      }
  } else {
      page = window.location.hash != '' ? window.location.hash.split('?')[0].substr(1) : 'klasemen'
      queryString = window.location.hash.indexOf('?') > -1 ? window.location.hash.split('?')[1] : false
      if (queryString !== false && queryString.indexOf('&') > -1) {
          arr = queryString.split('&')
          arr.forEach(v => {
              let subQuery = v.split('=')
              if (subQuery[1] != undefined) {
                  queryObj[subQuery[0]] = subQuery[1]
              } else {
                  queryObj[subQuery[0]] = true
              }
          })
      } else {
          subQuery = queryString !== false ? queryString.split('=') : false
          if (subQuery !== false && subQuery[1] != undefined) {
              queryObj[subQuery[0]] = subQuery[1]
          } else if (subQuery === false) {
              queryObj['noQuery'] = true
          } else {
              queryObj[subQuery[0]] = true
          }
      }
  }

  return new Promise((resolve, reject) => {
      if (page != undefined && Object.keys(queryObj).length != 0) {
          resolve({
              page,
              query: queryObj
          })
      } else {
          reject(new Error('url did\'nt match the requirement : ' + url))
      }

  })
}