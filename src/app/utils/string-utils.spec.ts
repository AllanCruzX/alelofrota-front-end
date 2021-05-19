import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StringUtils } from './string-utils';


describe('StringUtils' , () => {

  describe('Teste Isolado', () => {

      const util = new  StringUtils();

      it('Deve retirar caracter nao numerico', () => {

        expect(util.somenteNumeros('aa11')).toBe('11');

      });

  });

});
