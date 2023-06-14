const Employee = require('../employee.model.js');
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Employee', () => {

  it('should throw an error if no "firstName" arg', () => {
    const emp = new Employee({});

    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
    });
  });

  it('should throw an error if no "lastName" arg', () => {
    const emp = new Employee({});

    emp.validate(err => {
      expect(err.errors.lastName).to.exist;
    });
  });

  it('should throw an error if no "department" arg', () => {
    const emp = new Employee({});

    emp.validate(err => {
      expect(err.errors.department).to.exist;
    });
  });

  it('should throw an error if "firstName" is not a string', () => {
    const cases = [{}, []];
    for (let firstName of cases) {
      const emp = new Employee({ firstName });

      emp.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });

  it('should throw an error if "lastName" is not a string', () => {
    const cases = [{}, []];
    for (let lastName of cases) {
      const emp = new Employee({ lastName });

      emp.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it('should throw an error if "department" is not a string', () => {
    const cases = [{}, []];
    for (let department of cases) {
      const emp = new Employee({ department });

      emp.validate(err => {
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should not throw an error if all fields are valid', () => {
    const validEmployeeData = {
      firstName: 'John',
      lastName: 'Doe',
      department: 'HR',
    };

    const employee = new Employee(validEmployeeData);

    employee.validate(err => {
      expect(err).to.not.exist;
    });
  });
});