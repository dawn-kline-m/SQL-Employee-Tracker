# 12 SQL: Employee Tracker

## Description

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). This challenge is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

 Inquirer version 8.2.4 has been installed. 

## User Specifications

As a business owner, the business owner wants  to be able to view and manage the departments, roles, and employees in the company to organize and plan the business.

## Functionality

A command-line application that accepts user input:

When the user starts the application, the user is presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role.

When the user chooses to view all departments, the user is presented with a formatted table showing department names and department ids

When the user chooses to view all roles, the user is presented with the job title, role id, the department that role belongs to, and the salary for that role.

When the  user chooses to view all employees, the user is presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.

When the user chooses to add a department, the user is prompted to enter the name of the department and that department is added to the database.

When the user chooses to add a role, the user is prompted to enter the name, salary, and department for the role and that role is added to the database.

When the user chooses to add an employee, the user is prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database.

When the user chooses to update an employee role, the user is prompted to select an employee to update and their new role and this information is updated in the database. 

## Mock-Up

The following video shows an example of the application being used from the command line:

[![A video thumbnail shows the command-line employee management application with a play button overlaying the view.](./Assets/12-sql-homework-video-thumbnail.png)](https://2u-20.wistia.com/medias/2lnle7xnpk)

## Deliverables

The following walkthrough video demonstrates the functionality of the application: 

The URL of the GitHub repository: https://github.com/dawn-kline-m/SQL-Employee-Tracker
