const { getAdmin, insertaAdmin, loginAdmin, logoutAdmin, isLogged } = require('../controllers/administrator/queries');
const { getUser, insertaUser, getAllUsers, actualizaUser } = require('../controllers/user/queries');

const faker = require('faker');

describe('Test report transaction queries', () => {

    it('Deberia traer administradores', async () => {
        
        let rows = await getAdmin('e');
        expect(rows.rows.length).toBeGreaterThan(0);
    });

    it('Deberia insertar un administrador', async () => {
        let name = await faker.name.firstName().toString().slice(0,20);
        let lastName = await faker.name.lastName().toString().slice(0,30);
        let password = await faker.internet.password().toString().slice(0,20);
        let email = await faker.internet.email().toString().slice(0,20);
        let phone1 = await faker.phone.phoneNumber().toString().slice(0,11);
        let phone2 = await faker.phone.phoneNumber().toString().slice(0,11);
        let username = await faker.internet.userName().toString().slice(0,20);
        let cedula = Math.floor(Math.random() * 100000000);
        let rows = await insertaAdmin(username, password, name, lastName, email, phone1, phone2, cedula);

        expect(rows.rows.length).toBe(0);

    })

    it('Deberia insertar un usuario', async () => {

        let name = await faker.name.firstName().toString().slice(0,20);
        let lastName = await faker.name.lastName().toString().slice(0,30);
        let email = await faker.internet.email().toString().slice(0,20);
        let phone1 = await faker.phone.phoneNumber().toString().slice(0,11);
        let cedula = Math.floor(Math.random() * 100000000);
        let rows = await insertaUser(name, lastName, cedula, phone1, email, name, 10);

        expect(rows.rows.length).toBe(0);
    })

    it('Deberia loguear un admin', async () => {
        let rows = await loginAdmin('Karina.Romaguera', 'n5pDR7GN1QIlEui');
        expect(rows).toBe('SUCCESS');
    })

    it('Deberia traer todos los usuarios', async () => {
        let rows = await getAllUsers();

        expect(rows.rows.length).toBeGreaterThan(0);
    })

    it('Deberia traer un usuario', async () => {
        let rows = await getUser(parseInt('91106244'));
        expect(rows.rows.length).toBeGreaterThan(0);
    })

    it('Deberia cerrar sesion usuario', async () => {
        let username = 'Karina.Romaguera';
        let rows = await logoutAdmin(username);
        expect(rows.rows.length).toBe(0);
    })

    it('Deberia chequear usuario', async () => {
        let username = 'Karina.Romaguera';
        let rows = await isLogged(username);
        expect(rows.rows[0].logged).toBe(false);
    })

    it('Deberia actualizar usuario', async () => {
        let usuario = 91106244;

        let rows = await actualizaUser('si', 'si', usuario, 'no', 'no', 'no', usuario);

        expect(rows.rows.length).toBe(0);

    })
})


