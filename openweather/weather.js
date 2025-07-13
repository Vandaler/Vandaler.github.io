// Weather App JavaScript
const API_KEY = 'b0dfc9e8bb1b7d07259bd9d5542ce3ff'; // Replace with your OpenWeatherMap API key

// Weather icon mapping
const weatherIcons = {
    'ท้องฟ้าแจ่มใส': '☀️',
    'มีเมฆเล็กน้อย': '🌤️',
    'มีเมฆกระจาย': '⛅',
    'มีเมฆมาก': '☁️',
    'พายุฝน': '🌦️',
    'ฝนตก': '🌧️',
    'พายุฝนฟ้าคะนอง': '⛈️',
    'หิมะ': '❄️',
    'หมอก': '🌫️',
    'ฟ้าครึ้ม': '☁️'
};

function getWeatherIcon(description) {
    return weatherIcons[description.toLowerCase()] || '🌤️';
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('weatherResult').classList.remove('show');
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    hideLoading();
}

function showWeatherResult(data) {
    hideLoading();
    document.getElementById('error').style.display = 'none';
    
    // Extract weather data
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;
    const description = data.weather[0].description;
    const icon = getWeatherIcon(description);
    
    // Update UI elements
    document.getElementById('weatherIcon').textContent = icon;
    document.getElementById('temperature').textContent = `${temperature} องศา(°C)`;
    document.getElementById('description').textContent = description;
    document.getElementById('feelsLike').textContent = `${feelsLike} องศา(°C)`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${windSpeed} เมตร/วินาที(m/s)`;
    document.getElementById('pressure').textContent = `${pressure} ปาสคาล(hPa)`;
    
    // Show the result
    document.getElementById('weatherResult').classList.add('show');
}

async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.cod === 200) {
            showWeatherResult(data);
        } else {
            showError(`City "${city}" not found. Please check the spelling and try again.`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Failed to fetch weather data. Please check your internet connection and try again.');
    }
}

// Event listeners
document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value.trim();
    
    if (!city) {
        showError('Please enter a city name.');
        return;
    }
    
    showLoading();
    fetchWeatherData(city);
});

// Add keyboard support
document.getElementById('city').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('weatherForm').dispatchEvent(new Event('submit'));
    }
});

// Clear error when user starts typing
document.getElementById('city').addEventListener('input', function() {
    document.getElementById('error').style.display = 'none';
});
