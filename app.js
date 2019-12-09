window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = documents.querySelector('.degree-section');
    const tempSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/290def109a7004d41ad214c3eff2bbee/${lat},${long}`;
            
            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                const {temp, summary, icon} = data.currently;
                tempDegree.textContent = temp;
                tempDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                setIcons(icon, document.querySelector('.icon'))

                //change temp to Celsius/Fahrenheit

                temperatureSection.addEventListener('click', () => {
                    if(tempSpan.textContent === 'F'){
                        tempSpan.textContent = 'C'
                    }else{
                        tempSpan.textContent = "F"
                    }
                    
                })
            })
        });
        
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: grey});
        const currentIcon =  icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return  skycons.set(iconID, Skycons[currentIcon]);
    }
})