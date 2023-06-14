const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employee', () => {
    
      
      before(async () => {

        try {
          await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }
    });

    describe('Reading data', () => {

        after(async () => {
            await Employee.deleteMany();
          });
       
        before(async () => {
          const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'HR'});
          await testEmpOne.save();
      
          const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Dwight', department: 'Production' });
          await testEmpTwo.save();
        });

        after(async () => {
            await Employee.deleteMany();
          });
      
        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
          });

          it('should return proper document by various params with findOne method', async () => {
            const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'HR' });
            expect(employee.firstName).to.be.equal('John');
            expect(employee.lastName).to.be.equal('Doe');
            expect(employee.department).to.be.equal('HR');
          });
      });

      describe('Creating data', () => {
        after(async () => {
            await Employee.deleteMany();
          });

          it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ firstName: 'First', lastName: 'Insert', department: 'HR' });
            await employee.save();
            expect(employee.isNew).to.be.false;
          });

      });
      describe('Updating data', () => {

        afterEach(async () => {
            await Employee.deleteMany();
          });

        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'HR'});
            await testEmpOne.save();
          
            const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Dwight', department: 'Production' });
            await testEmpTwo.save();
          });
        
          it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'John', lastName: 'Doe', department: 'HR' }, { $set: { firstName: 'Johny', lastName: 'Doee', department: 'HR' }});
            const updatedEmployee = await Employee.findOne({ firstName: 'Johny', lastName: 'Doee', department: 'HR' });
            expect(updatedEmployee).to.not.be.null;
          });
      
          it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'HR' });
            employee.firstName = 'Amigo';
            employee.lastName = 'Amigos';
            employee.department = 'Production';
            await employee.save();
          
            const updatedEmployees = await Employee.findOne({ firstName: 'Amigo', lastName: 'Amigos', department: 'Production' });
            expect(updatedEmployees).to.not.be.null;
          });
      
        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { firstName: 'Admin', lastName: 'Admino', department: 'IT' }});
            const employees = await Employee.find({ firstName: 'Admin', lastName: 'Admino', department: 'IT' });
            expect(employees[0].firstName).to.be.equal('Admin');
            expect(employees[0].lastName).to.be.equal('Admino');
            expect(employees[0].department).to.be.equal('IT');
            expect(employees[1].firstName).to.be.equal('Admin');
            expect(employees[1].lastName).to.be.equal('Admino');
            expect(employees[1].department).to.be.equal('IT');
        });
      
      });

      describe('Removing data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'HR'});
            await testEmpOne.save();
          
            const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Dwight', department: 'Production' });
            await testEmpTwo.save();
          });
          
          afterEach(async () => {
            await Employee.deleteMany();
          });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne( { firstName: 'John', lastName: 'Doe', department: 'HR' } );;
            const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'HR' });
            expect(employee).to.be.null;
        });
      
        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'HR' });
            await employee.remove();
            const removedEmployee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'HR' });
            expect(removedEmployee).to.be.null;
          });
      
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employees = await Employee.find({});
            expect(employees.length).to.be.equal(0);
        });
      
      });

    });