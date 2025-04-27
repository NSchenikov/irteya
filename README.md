Irteya (React + TypeScript App)
Это приложение создано с использованием React и TypeScript в рамках тестового задания для трудоустройства.

Установка и запуск

Клонируйте репозиторий (если нужно):
git clone https://github.com/NSchenikov/irteya
Перейдите в папку проекта:
cd irteya
Установите зависимости:
npm i
или
npm install
Запустите приложение в режиме разработки:
npm run start
После запуска приложение откроется автоматически в браузере по адресу: http://localhost:3000 (порт может отличаться в зависимости от настроек).
Доступные команды

npm start – запуск dev-сервера.
npm run build – сборка production-версии в папку build.

Технологии

React (функциональные компоненты, хуки)
TypeScript – статическая типизация
Сборка: Create React App (CRA)
Стили: CSS
Дополнительно: Redux / React Router / Axios (если есть)
Структура проекта

/src
/components – React-компоненты
/pages – Страницы приложения
/styles – Глобальные стили
/utils – Вспомогательные функции
/types – Типы TypeScript
App.tsx – Главный компонент
index.tsx – Точка входа

Деплой

Для деплоя на GitHub Pages, Vercel, Netlify или другой хостинг используйте:
npm run build
После этого загрузите содержимое папки build на хостинг.

Лицензия

MIT © NSchenikov