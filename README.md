# Pizza39-App

Проєкт сайту доставки піци

---

## Структура

- `/client/my-jerseygoal-ts` — фронтенд (React).  
  Детальна інструкція в `client/my-jerseygoal-ts/README.md`.
---

## Запуск

### Клонування репозиторію
```bash
git clone https://github.com/jacobstxt/pizza39-app.git
cd pizza39-app
```

### Запуск frontend
```bash
cd client/my-jerseygoal-ts
npm install
npm run dev
```

### Запуск backend
```bash
cd server/JearsyGoal_WebApi
dotnet restore
dotnet run
```

### Технології
```bash
- **Фронтенд:** React, TypeScript, Vite (або CRA), CSS Modules / Styled Components  
- **Бекенд:** ASP.NET Core Web API, C#, Entity Framework Core  
- **База даних:** PostgreSQL 
- **Контроль версій:** Git, GitHub  
- **Управління пакетами:** npm (фронтенд), NuGet (бекенд)  
- **Інструменти:** Visual Studio / WebStorm, Swagger для тестування API  
```

### Налаштування
```bash
- Для бекенду потрібно налаштувати підключення до бази даних у файлі `appsettings.json`.  
- Використовуй `.env` файли для секретних ключів та інших конфігурацій.
```


