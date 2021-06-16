const route = function (id = null) {
    parseUrl(id).then(url => {
        switch (url.page) {
            case 'team':
                showTim(url.query.id)
                break
            case 'fav':
                showFav()
                break
            case 'teaminf':
                loadPage(url.page).then(page => {
                    if (page == 'teaminf') showTimInfo()
                })
                break
            default:
                loadPage(url.page).then(page => {
                    if (page == 'klasemen') showKlasemen()
                })
                break
        }
    })
}

document.addEventListener('DOMContentLoaded', async function () {
    loadNav()
    route()
})

//page klasemen laliga
async function showKlasemen() {
    const tbody = document.querySelector('tbody')
    let rowTable = ''
    const data = await getKlasemen()
    await data.standings[0].table.forEach(detailTim => {
        rowTable += 
        `<tr>
                <td class="card-panel  blue accent-3 z-depth-0">${detailTim.position}</td>
                <td class="card-panel z-depth-1"><img src="${detailTim.team.crestUrl.replace(/^http:\/\//i, 'https://')}"
                    class="responsive-img cres" alt=""> ${detailTim.team.name}</a> </td>
                <td class="card-panel z-depth-0">${detailTim.playedGames}</td>
                <td class="card-panel z-depth-0">${detailTim.won}</td>
                <td class="card-panel z-depth-0">${detailTim.draw}</td>
                <td class="card-panel z-depth-0">${detailTim.lost}</td>
                <td class="card-panel z-depth-0">${detailTim.goalsFor}</td>
                <td class="card-panel z-depth-0">${detailTim.goalsAgainst}</td>
                <td class="card-panel z-depth-0">${detailTim.goalDifference}</td>
                <td class="card z-depth-0">${detailTim.points}</td>
        </tr>`
    })
    tbody.innerHTML = rowTable

    document.querySelectorAll('.link-to-team').forEach(link => {
        link.addEventListener('click', async click => {
           
            route(click.target.getAttribute('href'))
        })
    })
    document.getElementById("klasemen");
}

async function showTimInfo() {
    const tbody = document.querySelector('tbody')
    let rowTable = ''
    
    const data = await getTeamInfo()
    await data.standings[0].table.forEach(detailTim => {
        rowTable += 
        `<ul>
                <li class="collection-item active grey darken-4 white-text z-depth-1"><a href="#team?id=${detailTim.team.id}" class="link-to-team valign-wrapper"><img
                    src="${detailTim.team.crestUrl.replace(/^http:\/\//i, 'https://')}"
                    class="responsive-img cres" alt=""> ${detailTim.team.name}</a> </li>
        </ul>`
    })
    tbody.innerHTML = rowTable

    document.querySelectorAll('.link-to-team').forEach(link => {
        link.addEventListener('click', async click => {
           
            route(click.target.getAttribute('href'))
        })
    })
    document.getElementById("teaminf");
}

//teampage
async function showTim(id) {
    const data = await getTim(id)
    const dp = await getPemain(id)
    const matchdata = await getPertandinganTim(id)
    
    let dataPemain = {
        name : dp.name
    }

    let league = '',
        squad = '',
        match = ''

    data.activeCompetitions.forEach(dp => {
        league += `<a href="">${dp.name}</a>,`
    })

    data.squad.forEach((dp, i) => {
        if (i < (data.squad.length)) {
            squad += `
                    <li>
                    <div class="collapsible-header black green-text"><i class = "material-icons icon-white">person</i> ${dp.name}</div>
                    <div class="collapsible-body p-0">
                        <table class="black white-text">
                            <tr><td>First Name</td> <td>: ${dp.firstName == null ? '-' : dp.firstName}</td></tr>
                            <tr><td>Last Name</td> <td>: ${dp.lastName == null ? '-' : dp.lastName}</td></tr>
                            <tr><td>position</td> <td>: ${dp.position == null ? '-' : dp.position}</td></tr>
                            <tr><td>date of birth</td> <td> : ${dp.dateOfBirth}</td></tr>
                            <tr><td>country of birth</td> <td>: ${dp.countryOfBirth}</td></tr>
                            <tr><td>nationality</td> <td>: ${dp.nationality}</td></tr>
                            <tr><td>shirt number</td> <td>: ${dp.shirtNumber == null ? '-' : dp.shirtNumber}</td></tr>
                            <tr><td>role</td> <td>: ${(dp.role).toLowerCase()}</td></li>
                       </table>
                    </div>
                    </li>
                    `
        } 
    })
   
    matchdata.matches.forEach(dp => {
        match += `
        <li class="transparent collection-item">
        <div class="row">
            <div class="col s12 m12 l12 justify-center">
                <p class=" yellow-text">KICK-OFF : ${new Date(dp.utcDate).toLocaleDateString('en-ID',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        </div>
        <div class="row mb-0">
            <div class="col s5 m5 l5">
                <h6 class="white-text">HOME</h6> 
                <a class="blue-text" href="#team?id=${dp.homeTeam.id}">${dp.homeTeam.name}</a> 
            </div>
            <div class="col s2 m2 l2">
                <h5 class="green-text">VS</h5>
            </div>
            <div class="col s5 m5 l5">
                <h6 class="white-text">AWAY</h6> 
                <a class="red-text" href="#team?id=${dp.awayTeam.id}">${dp.awayTeam.name}</a>   
            </div>
        </div>
    </li>
    `
    })

loadPage('team').then(function () {
initCollapsable()

    let dataTim = {
        id: data.id,
        name: data.name,
        address: data.address,
        shortName: data.shortName,
        tla: data.tla,
        phone: data.phone,
        website: data.website,
        founded: data.founded,
        clubColors: data.clubColors,
        venue: data.venue,
        squadMarketValue: data.squadMarketValue,
        crestUrl: data.crestUrl,
        squad: data.squad,
        lastUpdate: data.lastUpdate,
        squad,
        league,
        match,
    }

    document.querySelector('#info').innerHTML = `(${data.tla}) - Since ${data.founded} `
    document.querySelector('#squad').innerHTML = squad
    document.querySelector('.klub-nama h1').innerHTML = data.name
    document.querySelector('#information').innerHTML = `
        <table>
        <tr> <td>Short Name</td><td> : ${data.shortName}</td></tr>
        <tr> <td>Code</td><td> : ${data.tla}</td></tr>
        <tr> <td>Address</td><td> : ${data.address}</td></tr>
        <tr> <td>Phone</td> <td> : ${data.phone}</td></tr>
        <tr> <td>Website</td> <td> : <a href="${data.website}" target="_blank" rel="noreferrer">${data.website}</a></td></tr>
        <tr> <td>Email</td> <td> : ${data.email}</td></tr>
        <tr> <td>Founded</td> <td> : ${data.founded}</td></tr>
        <tr> <td>Color</td><td> : ${data.clubColors}</td></tr>
        <tr> <td>Venue</td> <td> : ${data.venue}</td></tr>
        <tr> <td>Squad Value</td> <td> : ${data.squadMarketValue}</td></tr>
        </table>`

    crestImage = document.querySelector('.klub-wraper-top img')
    crestImage.setAttribute('src', data.crestUrl.replace(/^http:\/\//i, 'https://'))
    crestImage.setAttribute('alt', data.name)

    document.querySelector('#nextFixture').innerHTML = match

    document.querySelectorAll('#nextFixture a').forEach(link => {
        link.addEventListener('click', click => {
            route(click.target.getAttribute('href'))
        })
    })

//favorite set
        goToFavTeam(data.id)
        const FavTeamButton = document.querySelector('.favteam-btn')
        FavTeamButton.addEventListener('click', click => {
            click.preventDefault()
            goToFavTeam(data.id, true)
        })

        function goToFavTeam(id, event = false,) {
            checkDataFav(id).then(dp => {
                if (dp) {
                    if (event) {
                        M.toast({html: data.name+' Dihapus dari favorite', classes:'rounded', duration:'1000'})
                        deleteFav(id);
                        FavTeamButton.innerHTML = '<i class = "material-icons">favorite_border</i>'
                    }
                } else {

                    if (event) {
                        M.toast({html: data.name + ' ditambahkan ke favorite', classes:'rounded'})
                        saveFav(dataTim);
                        FavTeamButton.innerHTML = '<i class = "material-icons">favorite</i>'
                    }
                }
            })
        }
    })
}


//favorite page
function showFav() {
    let data = ''

readFav().then(fav => {
    for (const f of fav) {
        data += 
            `<li class="collection-item grey darken-4 white-text left-align" id="unfav-id-${f.id}">
            <div class="flex space-betwen align-item-center">
                <a href="#team?id=${f.id}" class="left-align link-team">${f.name}</a>
                <a href="#unfav-me" class="waves-effect waves-light btn red unfav" data-id="${f.id}">Delete</a>
            </div>
            </li>`
    }
})

loadPage('fav').then(function () {
    const ulFav = document.querySelector('#ul-team-fav')
        ulFav.innerHTML = data

        document.querySelectorAll('.unfav').forEach( btn => {
            btn.addEventListener('click',click => {
            click.preventDefault()

deleteFav(parseInt(click.target.getAttribute('data-id')))
        ulFav.querySelector('#unfav-id-'+click.target.getAttribute('data-id')).style.display = 'none'})
        })

        ulFav.querySelectorAll('.link-team').forEach( link => {
        link.addEventListener('click', click => {
            route(click.target.getAttribute('href'))
            })
        })
})
}