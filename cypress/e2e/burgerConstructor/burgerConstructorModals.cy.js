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
    it('should modal actions', () => {
        basket.forEach((item) => {
            cy.get(item).first().click();
            cy.get('[data-cy="modalContainer"]').should('exist').contains('Детали ингредиента');

            arr.forEach((item) => {
                cy.get('[data-cy="modalContainer"]').should('exist').contains(item);
            });

            // close modal
            cy.get('[data-cy="modalCloseIcon"]').click();
            cy.get('[data-cy="modalContainer"]').should('not.exist');
        })
    });
});