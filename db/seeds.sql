INSERT INTO department (dept_name)
VALUES  ("Owner"),
        ("Marketing"),
        ("Manager"),
        ("Bookkeeping"),
        ("Clerk"),
        ("Longarm Quilting"),
        ("Fabric"),
        ("Web Design"),
        ("Retreat"),
        ("Maintenance");

INSERT INTO role (title, salary, department_id)
VALUES  ("Shop Owner", 100000, 1),
        ("Marketing Manager", 80000, 2),
        ("Shop Manager", 110000, 2),
        ("Shop Clerk", 90000, 2),
        ("Longarm Quilter", 90000, 3),
        ("Fabric Expert", 125000, 7),
        ("Web Designer", 100000, 4),
        ("Retreat Coordinator", 190000, 4);
  

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Bill", "Smith", 1, null),
        ("Vickie", "Jane", 2, 1),
        ("Sue", "Moore", 3, 1),
        ("Kevin", "Johns", 4, 3),
        ("Kelly", "Joe", 5, 1),
        ("Jane", "Mitchell", 6, null),
        ("Miles", "Jones", 7, 1),
        ("Tom", "Jones", 8, 7);