
const input = document.querySelector('input')
const ipOutput = document.querySelector('#ip-address')
const locationOutput = document.querySelector('#location')
const timezone = document.querySelector('#timezone')
const isp = document.querySelector('#isp')
const button = document.querySelector('button')


const comfirmInput = () => {
    if (input.value.length < 1) {
        alert('Input an IP Address')
    } else {
        fetchInfo(input.value)
    }
}

const renderData = (e) => {
    ipOutput.textContent = e.ip;
    timezone.textContent = e.location.timezone;
    isp.textContent = e.isp
    if (e.location.region == '') {
        locationOutput.innerHTML = `<span>${e.location.city}</span>`;
    } else {
        locationOutput.innerHTML = `<span>${e.location.region}, ${e.location.city}</span>`;
    }
    initializeMap(e)
    
}

const fetchInfo = (e) => {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qzIVc2gng5TnxY6dORLMZGJN64Gpz&ipAddress=${e}`)
    .then(response => {
        if(!response.ok) {
            console.log('response not okay')
            alert('Input correct IPv4 or IPv6 address.')
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
        renderData(data)
    })
    .catch(error => {throw error})

}
const map = L.map('map')
const initializeMap = (e) => {
    map.setView([e.location.lat, e.location.lng], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([e.location.lat, e.location.lng]).addTo(map)
        .bindPopup(`${e.location.region}, ${e.location.city}`)
        .openPopup();
}


button.onclick = comfirmInput
