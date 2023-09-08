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
  });
});