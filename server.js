const express = require('express');
const app = express();
const geoip = require('geoip-lite');
const fs = require('fs');

// Путь к файлу, куда будут записываться данные
const logFilePath = '/path/to/your/project/visitor_log.txt';

app.get('/', (req, res) => {
  // Получаем IP-адрес посетителя
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Определяем географическое местоположение по IP-адресу
  const geoData = geoip.lookup(ipAddress);

  // Записываем данные в файл
  fs.appendFileSync(logFilePath, `${ipAddress}, ${geoData.city}, ${geoData.region}\n`);

  res.send('Your location has been recorded.');
});

// Настройка cron job для очистки файла
setInterval(() => {
  fs.writeFileSync(logFilePath, ''); // Очистка файла
}, 1000 * 60 * 60); // Интервал в секундах (например, каждый час)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});