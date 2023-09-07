describe('service is available', function () {
  const burgerConstructorSelector = '[class^=BurgerConstructor_flexContainer__lul23]';
  const basket = [
    '[href^="#/ingredients/60666c42cc7b410027a1a9be"]',
    '[href^="#/ingredients/60666c42cc7b410027a1a9b3"]',
    '[href^="#/ingredients/60666c42cc7b410027a1a9ba"]',
    '[href^="#/ingredients/60666c42cc7b410027a1a9b5"]',
    '[href^="#/ingredients/60666c42cc7b410027a1a9bb"]',
    '[href^="#/ingredients/60666c42cc7b410027a1a9bb"]',
  ]
  const arr = ['Калории', 'Белки', 'Жиры', 'Углеводы'];

  before(function () {
    cy.viewport(1920, 1024);
    cy.visit('http://localhost:3001');
  });

  it('should do all test', () => {
    // should auth
    cy.get('button').contains('Авторизация').click();
    cy.get('[class^="input__container LoginPage_inputEmail__skX2U"]').type('123123@ali.com');
    cy.get('[class^="input__container LoginPage_inputPwd__incbK"]').type('123123');
    cy.get('[class^="button button_type_primary button_size_medium"]').click();

    // should open modal
    basket.map((item) => {
      cy.get(item).first().click();
      cy.get('[class^=Modal_modal__]').should('exist').contains('Детали ингредиента');

      arr.map((item) => {
        cy.get('[class^=Modal_modal__]').should('exist').contains(item);
      });

      // close modal
      cy.get('[class^="Modal_closeIcon__9I0vC"]').click();
    })

    // should drag and drop
    cy.get('[class^=IngredientDetails_cardItem__]').first().trigger('dragstart');
    cy.get(burgerConstructorSelector).trigger('drop');

    basket.map((item) => {
      cy.get(item).trigger('dragstart');
      cy.get(burgerConstructorSelector).trigger('drop');
    })

    cy.get('[href^="#/ingredients/60666c42cc7b410027a1a9b2"]').trigger('dragstart');
    cy.get(burgerConstructorSelector).trigger('drop');

    // should submit order
    cy.get('[class^="button button_type_primary button_size_large"]').click();

    // mock fetch
    cy.intercept("POST", "api/orders", { fixture: "orders.json" });

    // preloader
    cy.contains('Оформляем заказ').should('exist');
    cy.contains('Подождите пожалуйста, примерное время ожидание 15 сек.').should('exist');

    // order details
    cy.contains('идентификатор заказа').should('exist');
    cy.contains('Ваш заказ начали готовить').should('exist');
    cy.contains('Дождитесь готовности на орбитальной станции').should('exist');

    // close modal
    cy.get('[class^="Modal_closeIcon__9I0vC"]').click();
  });
});