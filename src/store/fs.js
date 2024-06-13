// импортируем модуль для работы с файловой системой
import fs from 'fs'

// массив, который мы хотим сохранить в файл
const array = [
    1,
    2,
    false,
    'hello world',
    ['nested array'],
    { 1: 'nested object' },
]

// для записи в файл воспользуемся синхронной функцией fs.writeFileSync()
fs.writeFileSync('fileWithArray.txt', JSON.stringify(array), 'utf-8')
