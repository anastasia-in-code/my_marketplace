const { roleCheckGuard } = require('../roleCheckGuard');
const { ShopRepository } = require('../../shops/shop.repository');
// const { checkRolePermissions } = require('../../../libs/checkRolePermissions');

describe('Role Check Guard', () => {
  const ctx = {
    params: {
      id: '43f9d9e3-275d-4554-ab79-80dacccd0981',
    },
    req: {
      user: {
        id: 18,
        first_name: 'test first name',
        last_name: 'test last name',
        email: '55@gmail.com',
        phone_number_id: 96,
        password: '$argon2id$v=19$m=65536,t=3,p=4$SeR08OhLY7h2uNlA/aUOAQ$iQhfEy+Crnyq0Q3ICQ2z8mSpXXnZqeFCe6H7cc/ypH4',
      },
    },
  };

  const shop = {
    id: 22,
    uuid: '0375bae5-8a69-40ef-abaf-a9ce2c587e7c',
    name: 'newshop',
    phone_number_id: 22,
    expirationDate: null,
  };

  let findByUUIDSpy;

  beforeEach(() => {
    findByUUIDSpy = jest.spyOn(ShopRepository, 'findByUUID');
    
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('admin has permissions to assign new admin', async () => {
    findByUUIDSpy.mockResolvedValue(shop);
    const checkRolePermissions = jest.fn(()=> true);

    console.log(checkRolePermissions)

    const result = await roleCheckGuard('GET_SHOP')(ctx);
    console.log(result);
  });
});
