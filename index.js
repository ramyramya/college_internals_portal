const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const session = require('express-session');
const app = express();
const flash = require('express-flash');
const path = require('path');
const router = express.Router();

const mysql = require('mysql');
// Set up multer to save files to the 'uploads' folder in the 'public' directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('questionPapers');
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define the directory for views
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'secret', // Change this to a more secure secret
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'faculty_dashboard'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});
// GET request handler for rendering the index page
app.get('/', (req, res) => {
    res.render('index.ejs'); // Assuming you have a view engine set up to render EJS files
});

// GET request handler for rendering the admin login page
app.get('/admin/login', (req, res) => {
    // Check if session is already present
    if (req.session.adminuser) {
        // Session is present, render admin_dashboard
        res.render('admindashboard.ejs');
    } else {
        // Session is not present, render adminlogin.ejs
        res.render('adminlogin.ejs',{ messages: req.flash() });
    }
});


app.get('/faculty/login', (req, res) => {
    if (req.session.facultyuser) {
        // Session is present, render admin_dashboard
        res.redirect('/faculty/dashboard');
    }
    else{
        res.render('facultylogin.ejs',{ messages: req.flash() }); // Assuming you have a view engine set up to render EJS files
    }
    
});

app.get('/hod/login', (req, res) => {
    
    // Check if session is already present
    if (req.session.user) {
        // Session is present, render admin_dashboard
        res.render('hoddashboard.ejs');
        
    } else {
        // Session is not present, render adminlogin.ejs
        res.render('hodlogin.ejs',{ messages: req.flash() });
    }
});

app.get('/middle/login', (req, res) => {
    // Check if session is already present
    if (req.session.user) {
        // Session is present, render admin_dashboard
        res.render('middledashboard.ejs');
    } else {
        // Session is not present, render adminlogin.ejs
        res.render('middlelogin.ejs',{ messages: req.flash() });
    }
});

// GET request handler for rendering the admin dashboard
app.get('/admin_dashboard', (req, res) => {
    res.render('admindashboard.ejs'); // Assuming you have a view engine set up to render EJS files
});


// POST request handler for processing the admin login form submission
app.post('/admin/login', (req, res) => {
    const { email, password } = req.body;

    // Dummy authentication logic (replace with actual authentication logic)
    if (email === 'admin@example.com' && password === 'admin123') {
        // If credentials are valid, set session variable for admin
        req.session.adminuser = { email: email }; // Storing admin email in session
        req.session.save(() => {
            // Redirect to admin dashboard or another page
            req.flash('success', 'Login successful!');
            res.redirect('/admin_dashboard');
        });
    } else {
        
        // If credentials are invalid, render the login page again with an error message
        req.flash('error', 'Invalid email or password.');
        res.render('adminlogin.ejs', { error: 'Invalid email or password' });
    }
});


// Define the logout route
app.get('/admin/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
            return;
        }
        // Redirect to the login page after logout
        res.redirect('/');
    });
});


// POST request handler for processing the faculty login form submission
app.post('/faculty/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the email and password match a record in the registration table
    const sql = 'SELECT * FROM registration WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error fetching faculty details:', err);
            res.status(500).send('Error fetching faculty details');
            return;
        }

        // If results are empty, credentials are invalid
        if (results.length === 0) {
            req.flash('error', 'Invalid email or password.');
            res.render('facultylogin.ejs', { error: 'Invalid email or password' });
            return;
        }

        // If credentials are valid, set session variable for faculty
        req.session.facultyuser = results[0].Id;
        req.session.facultyId = results[0].Id; // Assuming the faculty ID is stored in the 'id' column
        console.log(req.session.facultyId); 
        req.session.save(() => {
            res.redirect('/faculty/dashboard');
        });
    });
});


// GET request handler for rendering the faculty dashboard
app.get('/faculty/dashboard', (req, res) => {
    const facultyId = req.session.facultyId;

    // Retrieve faculty name from the database using facultyId
    const sql = 'SELECT facultyName FROM faculties WHERE facultyId = ?';
    connection.query(sql, [facultyId], (err, results) => {
        if (err) {
            console.error('Error fetching faculty name:', err);
            return res.status(500).send('Error fetching faculty name');
        }

        // If faculty name is found, render faculty_dashboard.ejs with the faculty name
        if (results.length > 0) {
            const facultyName = results[0].facultyName;
            return res.render('faculty_dashboard.ejs', { facultyName, flash: req.flash() });
        } else {
            return res.status(404).send('Faculty not found');
        }
    });
});

app.get('/hod/dashboard', (req, res) => {
    res.render('hoddashboard.ejs'); // Assuming you have a view engine set up to render EJS files
});

app.get('/middle_dashboard', (req, res) => {
    res.render('middledashboard.ejs'); // Assuming you have a view engine set up to render EJS files
});

// GET request handler for logging out faculty
app.get('/faculty/logout', (req, res) => {
    // Destroy the session to log out the faculty
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error logging out');
            return;
        }
        // Redirect the faculty to the index page after logout
        res.redirect('/');
    });
});

// POST request handler for HOD login
app.post('/hod/login', (req, res) => {
    const { email, password } = req.body;

    // Dummy authentication logic (replace with actual authentication logic)
    const hodEmail = 'hod@example.com';
    const hodPassword = 'hod123';

    // Check if the email and password match the HOD credentials
    if (email === hodEmail && password === hodPassword) {
        // If credentials are valid, redirect to HOD dashboard or another page
        req.session.user = { email: email }; // Storing admin email in session
        req.session.save(() => {
            // Redirect to admin dashboard or another page
            res.redirect('/hod/dashboard');
        });
    } else {
        // If credentials are invalid, render the login page again with an error message
        req.flash('error', 'Invalid email or password.');
        res.render('hodlogin.ejs', { error: 'Invalid email or password' });
    }
});
// Define the logout route
app.get('/hod/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
            return;
        }
        // Redirect to the login page after logout
        res.redirect('/');
    });
});


app.post('/middle/login', (req, res) => {
    const { email, password } = req.body;

    // Dummy authentication logic (replace with actual authentication logic)
    const mEmail = 'middleman@example.com';
    const mPassword = 'middleman123';

    // Check if the email and password match the HOD credentials
    if (email === mEmail && password === mPassword) {
        // If credentials are valid, redirect to HOD dashboard or another page
        req.session.user = { email: email }; // Storing admin email in session
        req.session.save(() => {
            // Redirect to admin dashboard or another page
            res.redirect('/middle_dashboard');
        });
    } else {
        // If credentials are invalid, render the login page again with an error message
        req.flash('error', 'Invalid email or password.');
        res.render('middlelogin.ejs', { error: 'Invalid email or password' });
    }
});
// Define the logout route
app.get('/middle/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
            return;
        }
        // Redirect to the login page after logout
        res.redirect('/');
    });
});

// Route to serve faculty_actions.html
app.get('/faculty_actions', (req, res) => {
    //res.sendFile(path.join(__dirname, 'views', 'faculty_actions.html'));
    res.render('faculty_actions');
});

// Route to render the form for adding faculty
app.get('/add_faculty', (req, res) => {
    //res.sendFile(__dirname + '/views/add_faculty.html');
    res.render('add_faculty');
});

// Route to handle form submission for adding faculty
app.post('/add_faculty', (req, res) => {
    const { facultyId, facultyName, year, semester, subject, section } = req.body;

    // Insert faculty details into database
    const sql = 'INSERT INTO faculties (facultyId, facultyName, facultyYear, facultySemester, facultySubject,Section) VALUES (?, ?, ?, ?, ?,?)';
    connection.query(sql, [facultyId, facultyName, year, semester, subject, section], (err, result) => {
        if (err) {
            console.error('Error adding faculty:', err);
            res.send('Error adding faculty');
            return;
        }

        console.log('Faculty added successfully');
        res.send('Faculty added successfully');
    });
});
app.get('/edit_faculty', (req, res) => {
    //res.sendFile(path.join(__dirname, 'views', 'edit_faculty.html'));
    res.render('edit_faculty');
});

app.post('/edit_faculty', (req, res) => {
    const { facultyId, facultyName, year, semester, subject } = req.body;

        // Update faculty details in the database
        const sql = 'UPDATE faculties SET facultyName = ?, facultyYear = ?, facultySemester = ?, facultySubject = ? WHERE facultyId = ?';
        connection.query(sql, [facultyName, year, semester, subject, facultyId], (err, result) => {
            if (err) {
                console.error('Error updating faculty:', err);
                res.send('Error updating faculty');
                return;
            }

            console.log('Faculty updated successfully');
            res.send('Faculty updated successfully');
        });
    });
    app.get('/get_faculty_list', (req, res) => {
        // Query to retrieve all faculty data from the database
        const sql = 'SELECT * FROM faculties';
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching faculty list:', err);
                res.status(500).json({ error: 'Error fetching faculty list' });
                return;
            }
            res.json(results); // Send JSON response containing faculty data
        });
    });

app.get('/delete_faculty', (req, res) => {
    //res.sendFile(path.join(__dirname, 'views', 'delete_faculty.html'));
    console.log(req.flash('message'));
    res.render('delete_faculty',{ message: req.flash('message') });
});

// Route to handle form submission for deleting faculty
app.post('/delete_faculty', (req, res) => {
    const { facultyId } = req.body;

    // Delete faculty record from the database
    const sql = 'DELETE FROM faculties WHERE facultyId = ?';
    connection.query(sql, [facultyId], (err, result) => {
        if (err) {
            console.error('Error deleting faculty:', err);
            req.flash('message', { type: 'error', text: 'Error deleting faculty' });
            
        }
        else {
            console.log('Faculty deleted successfully');
            req.flash('message', { type: 'success', text: 'Faculty deleted successfully' });
        }
        console.log(req.flash('message')); 
         
    });
});

app.get('/faculty_registration', (req, res) => {
    res.render('faculty_registration.ejs',{ message: req.flash('message') });
});

// Route to handle faculty registration form submission
app.post('/faculty/register', (req, res) => {
    const { id, email, password } = req.body;

    // Insert faculty registration details into the database
    const sql = 'INSERT INTO registration (id, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [id, email, password], (err, result) => {
        if (err) {
            console.error('Error registering faculty:', err);
           req.flash('message', { type: 'error', text: 'Error registering faculty' });
            res.redirect('/faculty_registration');
            return;
        }

        console.log('Faculty registered successfully');
        req.flash('message', { type: 'success', text: 'Faculty registered successfully' });
        res.redirect('/faculty_registration');
    });
});

// Route to handle POST request to /add_subjects
app.post('/add_subjects', (req, res) => {
    // Extract data from the request body
    const { year, semester, subject1, subject2, subject3, subject4, subject5, subject6 } = req.body;

    // Construct SQL query to insert data into the curriculum table
    const curriculumSql = 'INSERT INTO curriculum (year, semester, subject1, subject2, subject3, subject4, subject5, subject6) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const curriculumValues = [year, semester, subject1, subject2, subject3, subject4, subject5, subject6];

    // Execute the SQL query to insert data into the curriculum table
    connection.query(curriculumSql, curriculumValues, (err, result) => {
        if (err) {
            res.status(500).send('Error adding subjects to curriculum');
            throw err;
        }
        console.log('Subjects added to curriculum');

        // Insert each subject as individual rows into the question_papers table
        const subjects = [subject1, subject2, subject3, subject4, subject5, subject6];
        const yearSemesterValues = [year, semester];
        const questionPapersSql = 'INSERT INTO question_papers (year, semester, subject) VALUES ?';
        const subjectValues = subjects.map(subject => [...yearSemesterValues, subject]);

        // Execute the SQL query to insert data into the question_papers table
        connection.query(questionPapersSql, [subjectValues], (err, result) => {
            if (err) {
                res.status(500).send('Error adding subjects to question_papers');
                throw err;
            }
            console.log('Subjects added to question_papers');
            res.status(200).send('Subjects added to curriculum and question_papers');
        });
    });
});



app.get('/get_subjects', (req, res) => {
    const { year, semester } = req.query;

    // Construct the SQL query to fetch subjects
    const sql = `SELECT subject1, subject2, subject3, subject4, subject5, subject6 
                 FROM curriculum 
                 WHERE year = ? AND semester = ?`;

    // Execute the query
    connection.query(sql, [year, semester], (err, results) => {
        if (err) {
            console.error('Error fetching subjects from MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log(results);
        // Check if any rows were returned
        if (results.length === 0) {
            res.status(404).json({ error: 'Curriculum not found' });
            return;
        }

        // Extract subjects from the result row
        const curriculum = results[0];
        const subjects = Object.values(curriculum).filter(subject => subject !== null);

        // Send the subjects as a response
        res.json(subjects);
    });
});


app.post('/fetch_subjects', (req, res) => {
    const { year, semester } = req.body;

    // Construct the SQL query to fetch subjects
    const sql = `SELECT subject1, subject2, subject3, subject4, subject5, subject6 
                 FROM curriculum 
                 WHERE year = ? AND semester = ?`;

    // Execute the query
    connection.query(sql, [year, semester], (err, results) => {
        if (err) {
            console.error('Error fetching subjects from MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log(results);
        // Check if any rows were returned
        if (results.length === 0) {
            res.status(404).json({ error: 'Curriculum not found' });
            return;
        }

        // Extract subjects from the result row
        const curriculum = results[0];
        const subjects = Object.values(curriculum).filter(subject => subject !== null);

        // Send the subjects as a response
        res.json(subjects);
    });
});

// Route to handle form submission and file upload
app.post('/upload_question_papers', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).send('Error uploading file');
        }

        // Extract form data
        const { year, semester, subject, mid } = req.body;
        const file = req.file;

        // Determine which column to update based on mid
        let columnToUpdate = '';
        if (mid === 'mid1') {
            columnToUpdate = 'mid1_paper1';
        } else if (mid === 'mid2') {
            columnToUpdate = 'mid2_paper1';
        }

        // Check if the columnToUpdate is already uploaded
        const sqlCheckColumn = `SELECT * FROM question_papers WHERE year = ? AND semester = ? AND subject = ?`;
        connection.query(sqlCheckColumn, [year, semester, subject], (error, results) => {
            if (error) {
                console.error('Error checking existing paper:', error);
                return res.status(500).send('Internal server error');
            }
            console.log(results);
            // Check if the columnToUpdate is empty
            const columnEmpty = results[0][columnToUpdate] === null;

            // If the columnToUpdate is not empty, check the next column
            if (!columnEmpty) {
                if (mid === 'mid1') {
                    columnToUpdate = 'mid1_paper2';
                } else if (mid === 'mid2') {
                    columnToUpdate = 'mid2_paper2';
                }
            }

            // If the next column is also not empty, check the next column
            if (!columnEmpty && results[0][columnToUpdate] !== null) {
                if (mid === 'mid1') {
                    columnToUpdate = 'mid1_paper3';
                } else if (mid === 'mid2') {
                    columnToUpdate = 'mid2_paper3';
                }
            }
            if (results[0][columnToUpdate] === null){
            // Update the appropriate column with the file path
            const sqlUpdatePaper = `UPDATE question_papers SET ${columnToUpdate} = ? WHERE year = ? AND semester = ? AND subject = ?`;
            connection.query(sqlUpdatePaper, [file.path, year, semester, subject], (err, result) => {
                if (err) {
                    console.error('Error updating question papers table:', err);
                    return res.status(500).send('Internal server error');
                }

                return res.status(200).send(`File uploaded successfully to ${columnToUpdate}`);
            });
        }
        else{
            return res.status(200).send("All files are already uploaded!!");
        }
        });
    });
});

// Define a route to handle POST requests to '/fetch_question_papers'
app.post('/fetch_question_papers', (req, res) => {
    const { year, semester, mid, subject } = req.body;

    // Construct the SQL query to fetch question papers
    let sql;
    if (mid === '1') {
        sql = `SELECT selected_paper_1 FROM question_papers WHERE year = ? AND semester = ? AND subject = ?`;
    } else if (mid === '2') {
        sql = `SELECT selected_paper_2 FROM question_papers WHERE year = ? AND semester = ? AND subject = ?`;
    } else {
        res.status(400).json({ error: 'Invalid mid value' });
        return;
    }

    // Execute the query
    connection.query(sql, [year, semester, subject], (err, results) => {
        if (err) {
            console.error('Error fetching question papers from MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Check if any question papers were found
        if (results.length === 0) {
            res.status(404).json({ error: 'Question papers not found' });
            return;
        }

        // Extract the question papers from the result and modify the URLs
        const questionPapers = Object.values(results[0]).filter(paper => paper !== null).map(paper => paper.replace('public\\', ''));

        // Send the modified question papers URLs as a response
        res.json(questionPapers);
    });
});

app.post('/update_hod_selected', (req, res) => {
    const { year, semester, mid, subject, set } = req.body;

    // Construct the SQL query to update the HOD selected column based on the provided parameters
    let sql, selectedPaperColumn;
    if (mid === '1') {
        sql = `UPDATE question_papers SET hod_selected_1 = ${set}, `;
        selectedPaperColumn = 'selected_paper_1';
    } else if (mid === '2') {
        sql = `UPDATE question_papers SET hod_selected_2 = ${set}, `;
        selectedPaperColumn = 'selected_paper_2';
    } else {
        res.status(400).json({ error: 'Invalid mid value' });
        return;
    }

    // Construct the SQL query to update the selected_paper column based on the provided parameters
    sql += `${selectedPaperColumn} = CASE 
                WHEN ? = 1 THEN mid${mid}_paper1
                WHEN ? = 2 THEN mid${mid}_paper2
                WHEN ? = 3 THEN mid${mid}_paper3
            END 
            WHERE year = ? AND semester = ? AND subject = ?`;

    // Execute the query to update the database
    connection.query(sql, [set, set, set, year, semester, subject], (err, result) => {
        if (err) {
            console.error('Error updating HOD selected in MySQL:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Check if any rows were affected (indicating successful update)
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'No matching records found for update' });
            return;
        }

        // Send success response
        const response = { success: true, message: 'HOD Selected updated successfully.' };
        res.json(response);
    });
});
// Route to handle fetching HOD selected papers


app.post('/post_marks', function(req, res) {
    // Extract selected values from the form
    var year = req.body.yearp;
    var semester = req.body.semesterp;
    var section = req.body.sectionp;
    var mid = req.body.midp;
    var subject = req.body.subjectp;

    // Query the database to check if there's a match with the faculty ID
    var sqlQuery = `SELECT * FROM faculties WHERE facultyId = ? AND facultyYear = ? AND facultySemester = ? AND facultySubject = ? AND Section = ?`;
    connection.query(sqlQuery, [req.session.facultyId, year, semester, subject, section], function(err, rows) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        if (rows.length > 0) {
            // If there's a match, redirect to marks_table with query parameters
            req.flash('success', 'marks posted successfully.');
            res.redirect(`/marks_table?year=${year}&semester=${semester}&section=${section}&mid=${mid}&subject=${subject}`);
        } else {
            // If no match, redirect to faculty_dashboard with an alert message
            req.flash('error', 'You do not have access to view marks for this subject and section.');
            res.redirect('/faculty/dashboard');
        }
    });
});

app.post('/view_marks', function(req, res) {
    // Extract selected values from the form
    var year = req.body.yearv;
    var semester = req.body.semesterv;
    var mid = req.body.midv;
    var subject = req.body.subjectv;
    res.redirect(`/view_marks_table?year=${year}&semester=${semester}&mid=${mid}&subject=${subject}`);
        
    });

app.get('/marks_table', function(req, res) {
    // Extract query parameters from the URL
    var year = req.query.year;
    var semester = req.query.semester;
    var section = req.query.section;
    var mid = req.query.mid;
    var subject = req.query.subject;

    // Construct SQL query to fetch data from the database
    var sqlQuery = `SELECT Roll_no, Student_name, ${subject}_mid${mid} FROM Year${year}Semester${semester} WHERE Section = '${section}'`;

    // Execute the SQL query to fetch data from the database
    connection.query(sqlQuery, function(err, rows) {
        if (err) {
            // Handle error
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        console.log(year,semester,subject,mid);
        // Render the HTML template with the fetched data
        res.render('marks_table', { data: rows ,year,semester,subject, mid});
    });
});

app.get('/view_marks_table', function(req, res) {
    // Extract query parameters from the URL
    var year = req.query.year;
    var semester = req.query.semester;
    var mid = req.query.mid;
    var subject = req.query.subject;

    // Construct SQL query to fetch data from the database
    var sqlQuery = `SELECT Roll_no, Student_name, Section, ${subject}_mid${mid} FROM Year${year}Semester${semester}`;

    // Execute the SQL query to fetch data from the database
    connection.query(sqlQuery, function(err, rows) {
        if (err) {
            // Handle error
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        console.log(year,semester,subject,mid);
        // Render the HTML template with the fetched data
        res.render('view_marks_table', { data: rows ,year,semester,subject, mid});
    });
});
app.post('/update_marks', (req, res) => {
    // Extract metadata values from the request body
    const { year, semester, subject, mid } = req.body.metadata;
    console.log(req.body);
    // Iterate through the submitted form data and update the database accordingly
    for (const rollNo in req.body) {
        if (rollNo !== 'metadata') { // Skip metadata field
            const newMarks = req.body[rollNo];
            // Update the database with the new marks
            const sqlUpdateMarks = `
                UPDATE Year${year}Semester${semester} 
                SET ${subject}_mid${mid} = ? 
                WHERE Roll_no = ?
            `;
            connection.query(sqlUpdateMarks, [newMarks, rollNo], (err, result) => {
                if (err) {
                    console.error('Error updating marks:', err);
                    // Handle error
                    return res.status(500).json({ error: 'Error updating marks' });
                }
                console.log(`Marks updated successfully for student with Roll No ${rollNo}`);
            });
        }
    }res.json({ success: true,message: 'Marks updated successfully' });

    // Send a response back to the client
    
});

app.post('/change_password', (req, res) => {
    const facultyId = req.body.facultyID; // Corrected field name
    const newPassword = req.body.newPassword;

    // Check if the faculty ID exists in the database
    const checkQuery = 'SELECT * FROM registration WHERE Id = ?';
    connection.query(checkQuery, [facultyId], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking faculty ID:', checkErr);
            return res.status(500).json({ error: 'Error checking faculty ID' });
        }
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Faculty ID not found' });
        }

        // Update password in the database
        const updateQuery = 'UPDATE registration SET password = ? WHERE Id = ?';
        connection.query(updateQuery, [newPassword, facultyId], (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Error updating password:', updateErr);
                return res.status(500).send({ success: false, message: 'Error updating password' });
            }
            return res.status(200).send({ success: true, message: 'Password updated successfully' });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});