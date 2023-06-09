describe('Deleta procedimento', () => {

    before(() => {
        cy.visit('http://localhost:8080/login')
        cy.get('.card-title').should('contain', 'Olá')

        cy.get('#email').type('rafael@outlook.com')
        cy.get('#password').type('qa@123')

        cy.get('#login').click()

        cy.get('.justify-content-between > .fs-5')
        .should('contain', 'Pets cadastrados')

        cy.get('#novoPet').click()

        cy.get('#nomePet').type('Bolinha')

        cy.get('#especiePet').should('be.visible').select('Canina')

        cy.get('#generoPet').should('be.visible').select('Macho')

        cy.get('#racaPet').should('be.visible').select('Siamês')

        cy.get('#pesoPet').type('2')

        const data = '2023-01-31';
        cy.get('#nascimentoPet').invoke('val', data).trigger('input');

        cy.get('#castradoPet').should('be.visible').select('Sim')

        cy.get('#nomeRespPet').type('Lucas')
        cy.get('#sobrenomeRespPet').type('Rabelo da Silva')
        cy.get('#contato1RespPet').type('48996561455')
        cy.get('#contato2RespPet').type('48996568525')
        cy.contains('button', 'Salvar').click()

        //Precisa adicionar a validação do snackbar de que foi cadastrado com sucesso

        cy.get('#petCard').contains('p#pet-name', 'Bolinha').should('exist');

        //Cadastra novo procedimento
        cy.get('#petCard')
            .contains('p#pet-name', 'Bolinha')
            .parents('.card')
            .find('a:contains("Ver carteirinha")')
            .click();

        cy.contains('button', ' Procedimento ').click()

        cy.wait(1000);

        cy.get('#novoProcedimento').should('contain', 'Cadastrar procedimento')
        //Precisa validar o modal
        cy.get('#procedureName').type('Antipulgas')
        cy.get('#procedureAddInfo').type('1 comprimido')
        const procedureDate = '2023-01-31';
        cy.get('#procedureDate').invoke('val', procedureDate).trigger('input');
        const procedureNextOne = '2023-01-31';
        cy.get('#procedureNextOne').invoke('val', procedureNextOne).trigger('input');
        cy.get('#procedureRespDoctor').type('Dra Léia')
        cy.get('#novoProcedimento > .modal-dialog > .modal-content > .modal-footer > .btn-success').click();

        cy.wait(1000);

        cy.get('.modal-body > .modal-footer > .btn-secondary').click()

        cy.get('#petCard')
            .contains('p#pet-name', 'Bolinha')
            .parents('.card')
            .find('a:contains("Procedimentos")')
            .click();

        cy.get('#modalVerProcedimentos').should('contain', 'Procedimentos do pet')
        cy.get('#modalVerProcedimentos').contains('td', 'Antipulgas').should('exist');
    })

    it('Deleto o procedimento criado', () => {
        cy.get('#modalVerProcedimentos')
            .should('be.visible')
            .within(() => {
                cy.contains('h1.modal-title.fs-5', 'Procedimentos do pet');
            });

        cy.get('[data-bs-target="#modalDeletaProced"]').click();
        cy.wait(1000);

        cy.get('#petCard')
            .contains('p#pet-name', 'Bolinha')
            .parents('.card')
            .find('a:contains("Procedimentos")')
            .click({ force: true });

        cy.get('[data-bs-target="#modalDeletaPet"]').click({ force: true });
        cy.wait(1000);

        cy.get('#btndeletarPet').click({ force: true });
        cy.wait(1000);

        cy.get('#petCard').should('not.contain', 'p#pet-name', 'Bolinha');
    });
})