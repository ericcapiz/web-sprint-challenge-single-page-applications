describe('Testing form inputs',()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3000")
    });
    it("checks form for input, select multiple toppings and form submission", ()=>{
        //test to get to the order pizza

        cy.get('[data-cy=pizza]').click();

        //testing for input type fields


        cy.get('[data-cy=name]').type("Eric").should("have.value","Eric");

         cy.get('[data-cy=phone]').type("9999999999").should("have.value","9999999999")

         cy.get('[data-cy=instructions]').type("test").should("have.value","test")
         
        cy.get('select').select('XL').should('have.value','XL')

         //checkbox testing

         cy.get('[data-cy=pep]').check().should('be.checked');
         cy.get('[data-cy=saus]').check().should('be.checked');
         cy.get('[data-cy=pine]').check().should('be.checked');
         cy.get('[data-cy=cheese]').check().should('be.checked');

         //submit form testing

         cy.get('[data-cy=submit]').click().pause();  
         
        //back to home link
         cy.get('[data-cy=home]').click();

         

         

    });
});