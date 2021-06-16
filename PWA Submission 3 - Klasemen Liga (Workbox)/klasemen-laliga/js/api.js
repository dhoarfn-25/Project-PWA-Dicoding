const config = {
  base_url_API: 'https://api.football-data.org/v2',
  token: '8c4ccaf8e2974f399368213837d21cf5',
  liga_id: '2014', //La Liga
  get endPoint() {
    return {
        base_url_API: this.base_url_API,
        tim: `${this.base_url_API}/teams/`,
        klasemen: `${this.base_url_API}/competitions/${this.liga_id}/standings/`,
        teaminf: `${this.base_url_API}/competitions/${this.liga_id}/standings/`,
        fixture: `${this.base_url_API}/competitions/${this.liga_id}/matches?status=SCHEDULED`,
    }
}
}

const {
token,
endPoint,
} = config

function fetchData(url) {
return fetch(url, {
    method: "GET",
    headers: {
        'X-Auth-Token': token
    }
})
}

//GET Klasemen La Liga
async function getKlasemen() {
try {
    if ('caches' in window) {
        let res = await caches.match(endPoint.klasemen)
        return await res.json()
    }
} catch (error) {
    try {
        const res = await fetchData(endPoint.klasemen)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}
}

//GET Klasemen Premier League
async function getTeamInfo() {
try {
    if ('caches' in window) {
        let res = await caches.match(endPoint.teaminf)
        return await res.json()
    }
} catch (error) {
    try {
        const res = await fetchData(endPoint.teaminf)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
} 
}

async function getTim(id) {
try {
    if ('caches' in window) {
        let res = await caches.match(endPoint.tim + '/' + id)
        if (res !== undefined) {
            return await res.json()
        }
        throw 'err'
    }

} catch (error) {
    try {
        const res = await fetchData(endPoint.tim + '/' + id)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}
}

async function getPemain(id) {
    try {
        if ('caches' in window) {
            let res = await caches.match(endPoint.tim + '/' + id)
            if (res !== undefined) {
                return await res.json()
            }
            throw 'err'
        }
    
    } catch (error) {
        try {
            const res = await fetchData(endPoint.tim + '/' + id)
            return await res.json()
        } catch (error) {
            console.log(error);
        }
    }
    }

async function getPertandinganTim(id, limit = 5) {
try {
    if ('caches' in window) {
        let res = await caches.match(endPoint.base_url_API + `/teams/${id}/matches/?status=SCHEDULED${limit === 5 ? '&limit=5' : ''}`)
        return await res.json()
    }
} catch (error) {
    try {
        const res = await fetchData(endPoint.base_url_API + `/teams/${id}/matches/?status=SCHEDULED${limit === 5 ? '&limit=5' : ''}`)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}
}

