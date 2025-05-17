const username = 'Admin';
const password = 'admin123';
const newusername = 'askaraya';
const newpassword = 'Admin12345';
const randomNumber = Cypress._.random(100000, 999999);
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
const randomUsername = Cypress._.sampleSize(characters, 5).join('');
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
const strongPassword = Cypress._.sampleSize(chars, 12 ).join('');
const today = new Date();
const startDate = today.toISOString().split('T')[0];
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const endDate = tomorrow.toISOString().split('T')[0];

// const employeeUsername = 'john.doe';
// const employeePassword = 'Password123!';
const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

function login(username, password) {
  cy.visit(baseUrl);
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
}
// function loginKaryawan(newusername, newpassword) {
//     cy.visit(baseUrl);
//     cy.get('input[name="username"]').type(newusername);
//     cy.get('input[name="password"]').type(newpassword);
//     cy.get('button[type="submit"]').click();
//   }

describe('Menambahkan Karyawan Baru', () => {
    it('Tambah Karyawan Baru', ()=> {
        login(username, password);
        cy.screenshot('berhasil-login');
    
        // Navigasi ke PIM
        cy.get(':nth-child(2) > .oxd-main-menu-item').contains('PIM', { timeout: 10000 }).click();
        // Klik tombol Add
        cy.xpath("//button[normalize-space()='Add']").click();
        cy.screenshot('click-add-employee');  // Screenshot setelah klik Add

    
        // Isi Form Karyawan Baru
        cy.wait(3000);
        cy.xpath("//input[@placeholder='First Name']").type('Puti');
        cy.xpath("//input[@placeholder='Middle Name']").type('Andini');
        cy.xpath("//input[@placeholder='Last Name']").type('Sukoco');
    
        const randomNumber = Math.floor(Math.random() * 1000000); // Random number untuk Employee ID
        cy.xpath("//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']")
          .clear()
          .type(randomNumber.toString());
        cy.screenshot('input-data-karyawan');  // Screenshot setelah mengisi form
    
        // Klik Save
        cy.xpath("//button[normalize-space()='Save']").click();
        cy.wait(4000);
        // Verifikasi URL
        cy.url().should('include', '/pim/viewPersonalDetail');
        cy.screenshot('employee-detail-page');  // Screenshot halaman detail
    
        // Scroll ke atas
        cy.wait(3000);
        cy.scrollTo('top');
    
        // Verifikasi nama karyawan
        cy.get('.orangehrm-edit-employee-name > .oxd-text')
          .contains('Puti Sukoco')
          .should('be.visible')
          .then(() => {
            cy.screenshot('berhasil-menampilkan-detail-karyawan');  // Screenshot verifikasi nama
          });
    
        cy.wait(4000);
    });

    it('Buat Akun Karyawan', ()=>{
        login(username,password);
        cy.wait(4000);
        cy.get(':nth-child(1) > .oxd-main-menu-item').contains('Admin').click();
        cy.xpath("//button[normalize-space()='Add']").click();

        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        cy.get('.oxd-select-dropdown').contains('Admin').click();

        cy.get('.oxd-autocomplete-text-input > input').type('s');
        cy.wait(2000);
        cy.get('.oxd-autocomplete-dropdown').should('be.visible');
        cy.get('.oxd-autocomplete-option').eq(0).click();

        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        cy.get('.oxd-select-dropdown').contains('Enabled').click();

        cy.xpath("(//input[@class='oxd-input oxd-input--active'])[2]").type(randomUsername);
        cy.xpath("(//input[@type='password'])[1]").type(strongPassword);
        cy.xpath("(//input[@type='password'])[2]").type(strongPassword);

        cy.xpath("(//input[@type='password'])[1]").invoke('val').then((pwd) => {
        cy.xpath("(//input[@type='password'])[2]").invoke('val').should('eq', pwd);
        });
        cy.xpath("//button[normalize-space()='Save']").click();

        cy.get('.oxd-toast-content').should('contain', 'Success');
    });

    it('Tambah Cuti Karyawan',()=> {
        login(username,password);
        cy.get(':nth-child(3) > .oxd-main-menu-item').contains('Leave').click();

        cy.get('.oxd-topbar-body-nav > ul > :nth-child(3)').click();
        cy.get('.oxd-dropdown-menu > :nth-child(1)').contains('Add Entitlements').click();
        cy.xpath("//label[normalize-space()='Individual Employee']").click();

        cy.get('.oxd-autocomplete-text-input > input').type('s');
        cy.wait(2000);
        cy.get('.oxd-autocomplete-dropdown').should('be.visible');
        cy.get('.oxd-autocomplete-option').eq(0).click();

        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        cy.get('.oxd-select-dropdown').contains('CAN - Personal').click();

        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').then($select => {
            const options = $select.find('option');
            const randomIndex = Math.floor(Math.random() * options.length);
            const randomValue = options.eq(randomIndex).val();

        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click(randomValue);
        });
        
        cy.xpath("(//input[@class='oxd-input oxd-input--active'])[2]").type('1');
        cy.xpath("//button[normalize-space()='Save']").click();
        cy.wait(2000);
        cy.xpath("//button[normalize-space()='Confirm']").click();

        cy.get('.oxd-toast-content').should('contain', 'Success');
        cy.xpath("//span[normalize-space()='(1) Record Found']").should('contain', "Record Found")
    });

    it('Cuti Karyawan Baru',()=> {
        loginKaryawan(newusername,newpassword);
            cy.get(':nth-child(1) > .oxd-main-menu-item').contains('Leave').click();
            cy.get('.oxd-topbar-body-nav > ul > :nth-child(1)').click();
            cy.xpath("(//div[@class='oxd-select-text oxd-select-text--active'])[1]").click();
            cy.get('.oxd-select-dropdown').contains('CAN - Personal').click();
            cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').clear().type('2025-19-05');
            cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').clear().type('2025-20-05');
            cy.xpath("//button[normalize-space()='Apply']").click();
            cy.get('.oxd-toast-content').should('contain', 'Success');
        });
    });


