# > Проект. Роутинг в React приложении. Реализация механизмов авторизации в React приложении.

Нужно доделать 
- Восстановление пароля и сохранение нового работает корректно.
- При клике по ингредиенту происходит переход на маршрут /ingredients/:id и открывается модальное окно с описанием ингредиента. При прямом переходе на этот маршрут открывается страница с информацией об ингредиенте.

защищены HOC-компонентом ProtectedRoute .
- При запросах, использующих accessToken , проверяется ответ сервера. Если время жизни токена истекло, то
выполняется запрос обновления токена и повторяется запрос, который не был выполнен успешно.
- Для обновления токена и выхода из системы используется refreshToken .
- При получении и обновлении информации о пользователе серверу передаётся токен в поле authorization
- Корректно используются компоненты <Switch /> , <Route /> , <Redirect /> .