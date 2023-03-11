const { createShop } = require('../controllers/createShop');

const { ShopRepository } = require('../shop.repository');
const { UserRepository } = require('../../users/index');

describe('Create new shop', () => {
  let findByEmailSpy;
  let createSpy;

  const ctx = {
    request: {
      body: {
        name: 'test shop',
        number: '111111111111111111',
        email: 'testuser@gmail.com',
      },
    },
  };

  const user = {
    id: 4,
    first_name: 'test first name',
    last_name: 'test last name',
    email: 'testuser@gmail.com',
    phone_number_id: 6,
  };

  const shop = {
    id: '885d668a-9993-4908-9e32-b47230b2e8c9',
    name: 'test shop',
    phone_number: [
      {
        number: '111111111111111111',
        type: 'shop',
        id: 8,
      },
    ],
    phone_number_id: 8,
  };

  beforeEach(() => {
    findByEmailSpy = jest.spyOn(UserRepository, 'findByEmail');
    createSpy = jest.spyOn(ShopRepository, 'create');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('createShop returns new shop', async () => {
    findByEmailSpy.mockResolvedValue(user);
    createSpy.mockResolvedValue(shop);

    const response = await createShop(ctx);

    expect(findByEmailSpy).toHaveBeenCalledWith(user.email);
    expect(createSpy).toHaveBeenCalledWith(ctx.request.body, user);
    expect(response).toEqual({
      id: '885d668a-9993-4908-9e32-b47230b2e8c9',
      name: 'test shop',
      phone_number: [{ number: '111111111111111111', type: 'shop', id: 8 }],
      phone_number_id: 8,
    });
  });
});
