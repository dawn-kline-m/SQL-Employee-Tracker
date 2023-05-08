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
        ("Shop Manager", 90000, 3),
        ("Bookkeeper", 50000, 4),
        ("Shop Clerk", 40000, 5),
        ("Longarm Quilter", 60000, 6),
        ("Fabric Expert", 55000, 7),
        ("Web Designer", 80000, 8),
        ("Retreat Coordinator", 70000, 9),
        ("Maintenance", 40000, 10);
  

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Bill", "Smith", 1, null),
        ("Vickie", "Jane", 2, 1),
        ("Sue", "Moore", 3, 1),
        ("Kevin", "Johns", 4, 3),
        ("Kelly", "Joe", 5, 3),
        ("Jane", "Mitchell", 6, 3),
        ("Charles", "Hines", 7, 3),
        ("Jason", "Borne", 8, 2),
        ("Sara", "George", 5, 3),
        ("Jill", "Cline", 5, 3),
        ("Red", "Miller", 9, 2),
        ("Paul", "Newman", 10, 1);
        