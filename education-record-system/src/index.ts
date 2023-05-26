import "reflect-metadata";
import express from "express";
import {createConnection, getRepository, MoreThan, LessThan, Between } from "typeorm";
import { Request, Response } from "express";
import { Student } from "./entity/Student";
import { Course } from "./entity/Course";
import { Teacher } from "./entity/Teacher";
import { Subject } from "./entity/Subject";
import { Grade } from "./entity/Grade";
import cors from 'cors';

createConnection().then(async connection => {

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get("/students", async (req: Request, res: Response) => {
        try {
            const studentRepository = getRepository(Student);
            const students = await studentRepository.find({ relations: ["courses", "grades"] });
            res.json(students);
        } catch (err) {
            res.status(500).json({ error: "An error occurred while retrieving students." });
        }
    });

    app.post("/students", async (req: Request, res: Response) => {
        try {
            const studentRepository = getRepository(Student);
            const newStudent = studentRepository.create(req.body); // assuming the body has the correct format
            const results = await studentRepository.save(newStudent);
            res.status(201).json(results);
        } catch (err) {
            res.status(500).json({ error: "An error occurred while creating a new student." });
        }
    });

    app.get("/students/:studentId", async (req: Request, res: Response) => {
        try {
            const studentRepository = getRepository(Student);
            const student = await studentRepository.findOne({ 
                where: { id: Number(req.params.studentId) }, 
                relations: ["courses", "grades"]
            });
            
    
            if (student) {
                res.json(student);
            } else {
                res.status(404).json({ error: "Student not found" });
            }
        } catch (err) {
            res.status(500).json({ error: "An error occurred while retrieving the student." });
        }
    });

    app.put("/students/:studentId", async (req: Request, res: Response) => {
        try {
            const studentRepository = getRepository(Student);
            const student = await studentRepository.findOne({ 
                where: { id: Number(req.params.studentId) }
            });
    
            if (student) {
                studentRepository.merge(student, req.body); // merges the new values from req.body into the found student
                const results = await studentRepository.save(student);
                res.json(results);
            } else {
                res.status(404).json({ error: "Student not found" });
            }
        } catch (err) {
            res.status(500).json({ error: "An error occurred while updating the student." });
        }
    });

    app.delete("/students/:studentId", async (req: Request, res: Response) => {
        try {
            const studentRepository = getRepository(Student);
            const student = await studentRepository.findOne({ 
                where: { id: Number(req.params.studentId) }
            });   
            if (student) {
                await studentRepository.remove(student);
                res.json({ message: "Student removed" });
            } else {
                res.status(404).json({ error: "Student not found" });
            }
        } catch (err) {
            res.status(500).json({ error: "An error occurred while removing the student." });
        }
    });

    app.get("/teachers", async (req: Request, res: Response) => {
        try {
        const teacherRepository = getRepository(Teacher);
        const teachers = await teacherRepository.find({ relations: ["subjects"] });
        res.json(teachers);
        } catch (err) {
            res.status(500).json({ error: "An error occurred while retrieving teachers." });
        }
    });

    
    

    app.post("/teachers", async (req: Request, res: Response) => {
        const teacherRepository = getRepository(Teacher);
        const teacher = teacherRepository.create(req.body); // creates a new teacher instance
        const results = await teacherRepository.save(teacher); // saves the teacher instance
        res.json(results);
    });

    app.get("/teachers/:teacherId", async (req: Request, res: Response) => {
        const teacherRepository = getRepository(Teacher);
        const teacher = await teacherRepository.findOne({ 
            where: { id: Number(req.params.teacherId) }, 
            relations: ["subjects"]
        });

        
    
        if (teacher) {
            res.json(teacher);
        } else {
            res.status(404).json({ error: "Teacher not found" });
        }
    });

    app.put("/teachers/:teacherId", async (req: Request, res: Response) => {
        const teacherRepository = getRepository(Teacher);
        const teacher = await teacherRepository.findOne({ 
            where: { id: Number(req.params.teacherId) }
        });

    
        if (teacher) {
            teacherRepository.merge(teacher, req.body);
            const results = await teacherRepository.save(teacher);
            res.json(results);
        } else {
            res.status(404).json({ error: "Teacher not found" });
        }
    });

    app.delete("/teachers/:teacherId", async (req: Request, res: Response) => {
        const teacherRepository = getRepository(Teacher);
        const teacher = await await teacherRepository.findOne({ 
            where: { id: Number(req.params.teacherId) }
        });
    
        if (teacher) {
            await teacherRepository.remove(teacher);
            res.json({ message: "Teacher removed" });
        } else {
            res.status(404).json({ error: "Teacher not found" });
        }
    });

    app.get("/courses", async (req: Request, res: Response) => {
        const courseRepository = getRepository(Course);
        const courses = await courseRepository.find({ relations: ["students","subject"] });
        res.json(courses);
    });

    app.post("/courses", async (req: Request, res: Response) => {
        const courseRepository = getRepository(Course);
        const course = courseRepository.create(req.body);
        const results = await courseRepository.save(course);
        res.json(results);
    });  

    app.get("/courses/:courseId", async (req: Request, res: Response) => {
        const courseRepository = getRepository(Course);
        const course = await courseRepository.findOne({ 
            where: { id: Number(req.params.courseId) }, 
            relations: ["students","subject"]
        });
        
    
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ error: "Course not found" });
        }
    });

    app.put("/courses/:courseId", async (req: Request, res: Response) => {
        const courseRepository = getRepository(Course);
        const course = await courseRepository.findOne({ 
            where: { id: Number(req.params.courseId) }
        });
    
        if (course) {
            courseRepository.merge(course, req.body);
            const results = await courseRepository.save(course);
            res.json(results);
        } else {
            res.status(404).json({ error: "Course not found" });
        }
    });

    app.delete("/courses/:courseId", async (req: Request, res: Response) => {
        const courseRepository = getRepository(Course);
        const course = await courseRepository.findOne({ 
            where: { id: Number(req.params.courseId) }
        });
        if (course) {
            await courseRepository.remove(course);
            res.json({ message: "Course removed" });
        } else {
            res.status(404).json({ error: "Course not found" });
        }
    });
    
    app.post('/subjects/addcourse/:subjectId/:courseId', async (req: Request, res: Response) => {
        const { subjectId, courseId } = req.params;
      
        const subjectRepository = getRepository(Subject);
        const courseRepository = getRepository(Course);
      
        try {
          // Find the subject by ID
          const subject = await subjectRepository.findOne({ 
            where: { id: Number(req.params.subjectId) }, 
            relations: ["courses"]
        });
      
          if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
          }
      
          // Find the course by ID
          const course = await courseRepository.findOne({ 
            where: { id: Number(req.params.courseId) }, 
            relations: ["subject"]
        });
      
          if (!course) {
            return res.status(404).json({ error: 'Course not found' });
          }
      
          // Add the course to the subject if not already added
          const isCourseAdded = subject.courses.some((c) => c.id === course.id);
          if (!isCourseAdded) {
            subject.courses.push(course);
          }
      
          // Save the subject to the database
          await subjectRepository.save(subject);
      
          // Return a success response
          return res.status(200).json({ message: 'Course added to the subject' });
        } catch (error) {
          // Handle any errors that occur during the process
          console.error(error);
          return res.status(500).json({ error: 'An error occurred' });
        }
      });

      app.delete('/subjects/removecourse/:subjectId/:courseId', async (req: Request, res: Response) => {
        const { subjectId, courseId } = req.params;
      
        const subjectRepository = getRepository(Subject);
        const courseRepository = getRepository(Course);
      
        try {
          // Find the subject by ID
          const subject = await subjectRepository.findOne({ 
            where: { id: Number(req.params.subjectId) }, 
            relations: ["courses"]
        });
      
          if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
          }
      
          // Find the course by ID
          const course = await courseRepository.findOne({ 
            where: { id: Number(req.params.courseId) }, 
            relations: ["subject"]
        });
      
          if (!course) {
            return res.status(404).json({ error: 'Course not found' });
          }
      
          // Check if the course is already added to the subject
          const courseIndex = subject.courses.findIndex((c) => c.id === course.id);
          if (courseIndex === -1) {
            return res.status(404).json({ error: 'Course is not associated with the subject' });
          }
      
          // Remove the course from the subject
          subject.courses.splice(courseIndex, 1);
      
          // Save the subject to the database
          await subjectRepository.save(subject);
      
          // Return a success response
          return res.status(200).json({ message: 'Course removed from the subject' });
        } catch (error) {
          // Handle any errors that occur during the process
          console.error(error);
          return res.status(500).json({ error: 'An error occurred' });
        }
      });

      app.post('/courses/addstudent/:courseId/:studentId', async (req: Request, res: Response) => {
        const { courseId, studentId } = req.params;
      
        const courseRepository = getRepository(Course);
        const studentRepository = getRepository(Student);
      
        try {
          // Find the course by ID
          const course = await courseRepository.findOne({ 
            where: { id: Number(req.params.courseId) }, 
            relations: ["students"]
        });
      
          if (!course) {
            return res.status(404).json({ error: 'Course not found' });
          }
      
          // Find the student by ID
          const student = await studentRepository.findOne({ 
            where: { id: Number(req.params.studentId) }, 
            relations: ["courses"]
        });
      
          if (!student) {
            return res.status(404).json({ error: 'Student not found' });
          }
      
          // Check if the student has already taken the course
          const hasTakenCourse = student.courses.some((c) => c.id === course.id);
          if (hasTakenCourse) {
            return res.status(400).json({ error: 'Student has already taken the course' });
          }
      
          // Add the student to the course
          course.students.push(student);
      
          // Save the course to the database
          await courseRepository.save(course);
      
          // Return a success response
          return res.status(200).json({ message: 'Student added to the course' });
        } catch (error) {
          // Handle any errors that occur during the process
          console.error(error);
          return res.status(500).json({ error: 'An error occurred' });
        }
      });
      
      app.delete('/courses/removestudent/:courseId/:studentId', async (req: Request, res: Response) => {
        const { courseId, studentId } = req.params;
      
        const courseRepository = getRepository(Course);
        const studentRepository = getRepository(Student);
      
        try {
          // Find the course by ID
          const course = await courseRepository.findOne({ 
            where: { id: Number(req.params.courseId) }, 
            relations: ["students"]
        });
      
      
          if (!course) {
            return res.status(404).json({ error: 'Course not found' });
          }
      
          // Find the student by ID
          const student = await studentRepository.findOne({ 
            where: { id: Number(req.params.studentId) }, 
        });
      
      
          if (!student) {
            return res.status(404).json({ error: 'Student not found' });
          }
      
          // Check if the student is already added to the course
          const studentIndex = course.students.findIndex((s) => s.id === student.id);
          if (studentIndex === -1) {
            return res.status(404).json({ error: 'Student is not enrolled in the course' });
          }
      
          // Remove the student from the course
          course.students.splice(studentIndex, 1);
      
          // Save the course to the database
          await courseRepository.save(course);
      
          // Return a success response
          return res.status(200).json({ message: 'Student removed from the course' });
        } catch (error) {
          // Handle any errors that occur during the process
          console.error(error);
          return res.status(500).json({ error: 'An error occurred' });
        }
      });
      

    app.get("/subjects", async (req: Request, res: Response) => {
        const subjectRepository = getRepository(Subject);
        const subjects = await subjectRepository.find({ relations: ["courses"] });
        res.json(subjects);
    });

    app.post("/subjects", async (req: Request, res: Response) => {
        const subjectRepository = getRepository(Subject);
        const subject = subjectRepository.create(req.body);
        const results = await subjectRepository.save(subject);
        res.json(results);
    });

    app.get("/subjects/:subjectId", async (req: Request, res: Response) => {
        const subjectRepository = getRepository(Subject);
        const subject = await subjectRepository.findOne({ 
            where: { id: Number(req.params.subjectId) }, 
            relations: ["courses"]
        });
    
        if (subject) {
            res.json(subject);
        } else {
            res.status(404).json({ error: "Subject not found" });
        }
    });

    app.put("/subjects/:subjectId", async (req: Request, res: Response) => {
        const subjectRepository = getRepository(Subject);
        const subject = await subjectRepository.findOne({ 
            where: { id: Number(req.params.subjectId) }
        });
    
        if (subject) {
            subjectRepository.merge(subject, req.body);
            const results = await subjectRepository.save(subject);
            res.json(results);
        } else {
            res.status(404).json({ error: "Subject not found" });
        }
    });

    app.delete("/subjects/:subjectId", async (req: Request, res: Response) => {
        const subjectRepository = getRepository(Subject);
        const subject = await subjectRepository.findOne({ 
            where: { id: Number(req.params.subjectId) }
        });
    
        if (subject) {
            await subjectRepository.remove(subject);
            res.json({ message: "Subject removed" });
        } else {
            res.status(404).json({ error: "Subject not found" });
        }
    });

    app.post("/subjects/addteacher/:subjectId/:teacherId", async (req: Request, res: Response) => {
        const subjectRepository = getRepository(Subject);
        const teacherRepository = getRepository(Teacher);
        try {
          // Find the teacher by ID
          const teacher = await teacherRepository.findOne({ 
            where: { id: Number(req.params.teacherId) }
        });
      
          if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
          }
      
          // Find the course by ID
          const course = await subjectRepository.findOne({ 
            where: { id: Number(req.params.subjectId) }, 
            relations: ["teachers"]
        });
      
          if (!course) {
            return res.status(404).json({ error: 'Course not found' });
          }
      
          // Add the teacher to the course if not already added
          if (!course.teachers.includes(teacher)) {
            course.teachers.push(teacher);
          }
      
          // Save the course to the database
          await subjectRepository.save(course);
      
          // Return a success response
          return res.status(200).json({ message: 'Teacher added to the subject' });
        } catch (error) {
          // Handle any errors that occur during the process
          console.error(error);
          return res.status(500).json({ error: 'An error occurred' });
        }
      });

      app.delete("/subjects/removeteacher/:subjectId/:teacherId", async (req: Request, res: Response) => {
        const { subjectId, teacherId } = req.params;
      
        const subjectRepository = getRepository(Subject);
        const teacherRepository = getRepository(Teacher);
      
        try {
          // Find the teacher by ID
          const teacher = await teacherRepository.findOne({ 
            where: { id: Number(req.params.teacherId) }
        });
          if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
          }
      
          // Find the subject by ID
          const subject = await subjectRepository.findOne({ 
            where: { id: Number(req.params.subjectId) }, 
            relations: ["teachers"]
        });
      
          if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
          }
      
          // Remove the teacher from the subject's teachers array
          subject.teachers = subject.teachers.filter((t) => t.id !== teacher.id);
      
          // Save the subject to the database
          await subjectRepository.save(subject);
      
          // Return a success response
          return res.status(200).json({ message: 'Teacher removed from the subject' });
        } catch (error) {
          // Handle any errors that occur during the process
          console.error(error);
          return res.status(500).json({ error: 'An error occurred' });
        }
      });

      app.get('/grades', async (req: Request, res: Response) => {
        const gradeRepository = getRepository(Grade);
      
        try {
          // Retrieve all grades from the database
          const grades = await gradeRepository.find();
      
          // Return the grades as a response
          return res.status(200).json(grades);
        } catch (error) {
          // Handle any errors that occur during the process
          console.error(error);
          return res.status(500).json({ error: 'An error occurred' });
        }
      });
      
      

      app.post('/grades', async (req: Request, res: Response) => {
        const { studentId, courseId, subjectId, gradeValue } = req.body;

        if (!studentId || !courseId || !subjectId || !gradeValue) {
            return res.status(400).json({ error: 'Missing required parameters' });
          }
          
      
        const studentRepository = getRepository(Student);
        const courseRepository = getRepository(Course);
        const subjectRepository = getRepository(Subject);
        const gradeRepository = getRepository(Grade);
      
        try {
          // Find the student by ID
          const student = await studentRepository.findOne({ 
            where: { id: Number(studentId) }
          });
      
          if (!student) {
            return res.status(404).json({ error: 'Student not found' });
          }
      
          // Find the course by ID
          const course = await courseRepository.findOne({ 
            where: { id: Number(courseId) }
          });
      
          if (!course) {
            return res.status(404).json({ error: 'Course not found' });
          }
      
          // Find the subject by ID
          const subject = await subjectRepository.findOne({ 
            where: { id: Number(subjectId) }
          });
      
          if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
          }
      
          // Create a new grade instance
          const grade = new Grade();
          grade.grade = gradeValue;
          grade.student = student;
          grade.course = course;
          grade.subject = subject;
      
          // Save the grade to the database
          await gradeRepository.save(grade);
      
          // Return a success response
          return res.status(200).json({ message: 'Grade recorded' });
        } catch (error) {
          // Handle any errors that occur during the process
          console.error(error);
          return res.status(500).json({ error: 'An error occurred' });
        }
      });

    app.get('/average-grade/course/:courseId', async (req, res) => {
        const courseId = Number(req.params.courseId);

        const grades = await getRepository(Grade).find({
          where: { course: { id: courseId } },
          select: ['grade']
        });
    
        if (grades.length === 0) {
        return res.status(404).send(`No grades found for course ${courseId}`);
        }
    
        const sum = grades.reduce((a, b) => a + b.grade, 0);
        const average = sum / grades.length;
    
        res.json({ average });
    });
    
    app.get('/average-grade/student/:studentId', async (req, res) => {
        const studentId = Number(req.params.studentId);

        const grades = await getRepository(Grade).find({
          where: { student: { id: studentId } },
          select: ['grade']
        });
    
        if (grades.length === 0) {
        return res.status(404).send(`No grades found for student ${studentId}`);
        }
    
        const sum = grades.reduce((a, b) => a + b.grade, 0);
        const average = sum / grades.length;
    
        res.json({ average });
    });

    app.listen(3000,() => {
        console.log('Listening: 3000 ...');
    })

}).catch(error => console.log(error));
