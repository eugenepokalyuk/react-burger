const burgerConstructorSelector = '[data-cy="burgerConstructorContainer"]';
const basket = [
  '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa0949"]',
  '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa0941"]',
  '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa0941"]',
  '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa093e"]',
  '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa0942"]',
  '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa0947"]',
  '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa0948"]',
]
const arr = ['Калории', 'Белки', 'Жиры', 'Углеводы'];
describe('service is available', function () {
  before(function () {
    cy.viewport(1920, 1024);
    cy.visit('http://localhost:3001/');
  });
  it('should drag & drop', () => {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });

    cy.get('[data-cy="dragableIngredients-643d69a5c3f7b9001cfa093c"]').first().trigger('dragstart');
    cy.get(burgerConstructorSelector).trigger('drop');

    basket.forEach((item) => {
      cy.get(item).trigger('dragstart');
      cy.get(burgerConstructorSelector).trigger('drop');
    })
    // should auth
    cy.intercept("POST", "api/auth/login", { fixture: "auth.json" });

    cy.get('button').contains('Авторизация').click();
    cy.get('[data-cy="loginSubmit"]').type('123123@ali.com');
    cy.get('[data-cy="pwdSubmit"]').type('123123');
    cy.get('[data-cy="submitLoginForm"]').click();

    // should submit order
    cy.get('[data-cy="submitConstructorForm"]').click();

    // mock fetch
    cy.intercept("POST", "api/orders", { fixture: "orders.json" });

    // preloader
    cy.contains('Оформляем заказ').should('exist');
    cy.contains('Подождите пожалуйста, примерное время ожидание 15 сек.').should('exist');

    // order details
    cy.get('[data-cy="orderNumber"]').should('exist');;
    cy.contains('идентификатор заказа').should('exist');
    cy.contains('Ваш заказ начали готовить').should('exist');
    cy.contains('Дождитесь готовности на орбитальной станции').should('exist');

    // close modal
    cy.get('[data-cy="modalCloseIcon"]').click();

    cy.get('[data-cy="modalContainer"]').should('not.exist');
  });
});