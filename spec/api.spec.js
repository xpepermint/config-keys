process.env.NODE_ENV = 'test';

var _ = require('..');

describe('method', function() {
  describe('`read`', function() {

    it('should merge `default` and `{environment}` data', function() {
      var data = _.read(__dirname+'/config/settings0.js');
      expect(data.name).toBe('John');
      expect(data.location).toBe('Berlin');
    });

    it('should merge `settings.js` and `settings.local.js` data', function() {
      var data = _.read(__dirname+'/config/settings1.js');
      expect(data.name).toBe('Mandy');
      expect(data.location).toBe('Ljubljana');
    });

  });
  describe('`load`', function() {

    it('should set `data` attribute', function() {
      _.load(__dirname+'/config/settings1.js');
      expect(_.data.name).toBe('Mandy');
      expect(_.data.location).toBe('Ljubljana');
    });

  });
  describe('`is`', function() {

    it('should check the `environment name`', function() {
      expect(_.is('test')).toBe(true);
      expect(_.is('production')).toBe(false);
    });

  });
});
describe('attribute', function() {
  describe('`env`', function() {

    it('should get & set `environment name`', function() {
      _.env = 'fake';
      expect(_.env).toBe('fake');
      expect(_.is('fake')).toBe(true);
      expect(_.env).toBe(process.env.NODE_ENV);
    });

  });
});
