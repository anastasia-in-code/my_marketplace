/* eslint-disable no-undef */
const { addAdminOrEditor } = require('../controllers/addAdminOrEditor');

const { UserRepository } = require('../../users/user.repository');
const { ShopRepository } = require('../shop.repository');

describe('Assign Admin or Editor to shop', () => {
  describe('Admin permissions', () => {
    let findByEmailSpy;
    let findByUUIDSpy;
    let addAdminSpy;

    const admin = {
      id: 12,
      first_name: 'test first name',
      last_name: 'test last name',
      email: 'user2@gmail.com',
      phone_number_id: 45,
      password: '$argon2id$v=19$m=65536,t=3,p=4$WRSNuSOP9GiyEHdt0NqhZg$vhVSNeG8Cx2r0ee4V+B+D0X5Mdg0Op4jZU185bjEbmQ',
    };

    const shop = {
      uuid: '0375bae5-8a69-40ef-abaf-a9ce2c587e7c',
      name: 'newshop',
      phone_number_id: 22,
      expirationDate: null,
    };
 
    const ctx = {
      request: {
        body: {
          newAdminEmail: 'user2@gmail.com',
          role: 'admin',
        },
      },
      params: {
        shopId: '0375bae5-8a69-40ef-abaf-a9ce2c587e7c',
      },
    };

    beforeEach(() => {
      findByEmailSpy = jest.spyOn(UserRepository, 'findByEmail');
      findByUUIDSpy = jest.spyOn(ShopRepository, 'findByUUID');
      addAdminSpy = jest.spyOn(ShopRepository, 'addAdmin');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should contain shop info in response', async () => {
      findByEmailSpy.mockResolvedValue(admin);
      findByUUIDSpy.mockResolvedValue(shop);
      addAdminSpy.mockResolvedValue(shop);

      const response = await addAdminOrEditor(ctx);

      expect(findByEmailSpy).toHaveBeenCalledWith(admin.email);
      expect(findByUUIDSpy).toHaveBeenCalledWith(shop.uuid);
      expect(addAdminSpy).toHaveBeenCalled();
      expect(response).toEqual({
        uuid: '0375bae5-8a69-40ef-abaf-a9ce2c587e7c',
        name: 'newshop',
        phone_number_id: 22,
        expirationDate: null,
      });
    });
  });
});
