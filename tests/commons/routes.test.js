import { paramSeparator } from '@src/commons/routes';
import { getNavigationRoutes, getProfileRoutes, replacePathParams } from '@src/commons/routeUtils';

describe('Testing Routes helpers', () => {
  it.only('fds', () => {
    console.log({
      profile: getProfileRoutes(),
      navigation: getNavigationRoutes(),
    })
  });
  describe('Testing routes with params', () => {
    it('should resolve required params', () => {
      const param1 = 'id-432';

      const result = replacePathParams(`/examples/${paramSeparator}param1`, { param1 });
      // console.log('El resultado es: ', result);

      expect(result).toBe('/examples/id-432');
    });

    it('should resolve required and queryString params', () => {
      const param1 = 'id-432';
      const anotherParam = 'fjdslk';
      const aSpecialParam = 43;

      const result = replacePathParams(`/examples/${paramSeparator}param1`, { param1, anotherParam, 'a-special_param': aSpecialParam });
      // console.log('El resultado es: ', result);

      expect(result).toContain(`a-special_param=${aSpecialParam}`);
      expect(result).toContain(`anotherParam=${anotherParam}`);
      expect(result).not.toContain(paramSeparator);
      expect(result).toContain('?');
      expect(result).toBe(`/examples/${param1}?anotherParam=${anotherParam}&a-special_param=${aSpecialParam}`);
    });

    it('should resolve more than 1 required param', () => {
      const param1 = 'id-432';
      const anotherParam = 'fjdslk';
      const aSpecialParam = 43;
      const userId = '____anUserId_____';

      const result = replacePathParams(
        `/examples/:param1/another-part-of-the-app/:userId`,
        { param1, userId, anotherParam, 'a-special_param': aSpecialParam }
      );

      expect(result).toContain(param1);
      expect(result).toContain(userId);
      expect(result).toContain(`a-special_param=${aSpecialParam}`);
      expect(result).toContain(`anotherParam=${anotherParam}`);
      expect(result).not.toContain(paramSeparator);
      expect(result).toContain('?');
      expect(result).toBe('/examples/id-432/another-part-of-the-app/____anUserId_____?anotherParam=fjdslk&a-special_param=43');
    });
  });

  describe('Testing routes without params', () => {
    it('should return the same path if no params are added and does not require params', () => {
      const result = replacePathParams('/home');

      expect(result).toBe('/home');
    });
  });

  describe('Testing routes that require some params but they are not presented (error)', () => {
    it('should throw error if required params is not presented', () => {
      expect(() => replacePathParams('/post/:postId')).toThrow(/The route still needs some params/);
    });
  });
});
