export const DEFAULT_PATH = "/";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const FORGOT_PASSWORD_PATH = "/forgot-password";
export const RESET_PASSWORD_PATH = "/reset-password";

export const PROFILE_PATH = "/profile";
export const PROFILE_ORDERS_PATH = "/profile/orders"; // страница истории заказов пользователя. Доступен только авторизованным пользователям.
export const PROFILE_ORDERS_ID_PATH = "/profile/orders/:id"; // страница заказа в истории заказов. Доступен только авторизованным пользователям.

export const FEED_PATH = "/feed"; // страница ленты заказов. Доступен всем пользователям.
export const FEED_ID_PATH = "/feed/:id"; // страница заказа в ленте. Доступен всем пользователям.

export const INGREDIENTS_PATH = "/ingredients/:id";
export const ERROR_PATH = "*";