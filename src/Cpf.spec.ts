import * as random from "./utils/random";
import Cpf from "./Cpf";

describe("Cpf", () => {
  describe("validateFormat", () => {
    it("should validate format", () => {
      expect(Cpf.validateFormat("000.000.000-00")).toBeTruthy();
    });

    it("should not validate format", () => {
      expect(Cpf.validateFormat("123123.000-00")).toBeFalsy();
      expect(Cpf.validateFormat("000.000.000.05")).toBeFalsy();
      expect(Cpf.validateFormat("000-000-000-05")).toBeFalsy();
      expect(Cpf.validateFormat("000-000-000.05")).toBeFalsy();
      expect(Cpf.validateFormat("000-000.000-05")).toBeFalsy();
      expect(Cpf.validateFormat("00000000005")).toBeFalsy();
      expect(Cpf.validateFormat("000.000.000.00")).toBeFalsy();
      expect(Cpf.validateFormat("9999999")).toBeFalsy();
      expect(Cpf.validateFormat("000.000-00")).toBeFalsy();
    });
  });

  describe("generate", () => {
    it("should call random once", () => {
      const spy = jest.spyOn(random, "random");
      Cpf.generate();
      expect(spy).toBeCalled();
    });

    it("should call Cpf.format", () => {
      const spy = jest.spyOn(Cpf, "format");
      Cpf.generate();
      expect(spy).toBeCalledTimes(1);
    });

    it("should return the cpf as formated as string", () => {
      const cpf = Cpf.generate();
      expect(Cpf.validateFormat(cpf)).toBeTruthy();
    });

    it("should generate a valid CPF", () => {
      expect.assertions(10);
      for (let i = 0; i < 10; i++) {
        const cpf = Cpf.generate();
        expect(Cpf.validate(cpf)).toBe(true);
      }
    });
  });

  describe("validate", () => {
    it("should return false if cpf length is less than 11", () => {
      expect(Cpf.validate("13212asas32")).toBeFalsy();
      expect(Cpf.validate("13212")).toBeFalsy();
    });

    it("should validate cpf", () => {
      expect(Cpf.validate("273.032.394-56")).toBeTruthy();
      expect(Cpf.validate("649.981.360-54")).toBeTruthy();
      expect(Cpf.validate("65280961043")).toBeTruthy();
      expect(Cpf.validate("28988756002")).toBeTruthy();
    });

    it("should not validate cpf if format is wrong", () => {
      expect(Cpf.validate("273-232-394-56")).toBeFalsy();
      expect(Cpf.validate("649.981.360.54")).toBeFalsy();
      expect(Cpf.validate("65280961043 ")).toBeFalsy();
      expect(Cpf.validate("289as88756002")).toBeFalsy();
    });

    it("should not validate if cpf is sequence", () => {
      expect(Cpf.validate("222-222-222-22")).toBeFalsy();
      expect(Cpf.validate("999-999-999-99")).toBeFalsy();
      expect(Cpf.validate("11111111111")).toBeFalsy();
      expect(Cpf.validate("00000080000")).toBeFalsy();
    });

    it("should not validate if cpf is not valid", () => {
      expect(Cpf.validate("271.032.394-56")).toBeFalsy();
      expect(Cpf.validate("649.980.360-54")).toBeFalsy();
      expect(Cpf.validate("65280561043")).toBeFalsy();
      expect(Cpf.validate("28980756002")).toBeFalsy();
    });
  });

  describe("format", () => {
    it("should format cpf", () => {
      expect(Cpf.format("27303239456")).toBe("273.032.394-56");
      expect(Cpf.format("649.98136054")).toBe("649.981.360-54");
      expect(Cpf.format("652-809-610-43")).toBe("652.809.610-43");
      expect(Cpf.format("289 asasa88a  sassa7.56as002")).toBe("289.887.560-02");
    });
  });

  describe("cleanUp", () => {
    it("should clean up cpf", () => {
      expect(Cpf.cleanUp("273.032.394-56")).toBe("27303239456");
      expect(Cpf.cleanUp("649.98136054")).toBe("64998136054");
      expect(Cpf.cleanUp("652-809-610-43")).toBe("65280961043");
      expect(Cpf.cleanUp("289 asasa88a  sassa7.56as002")).toBe("28988756002");
    });
  });
});
