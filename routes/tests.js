const router = require("express").Router();
const Student = require("../db/models/student");
const Test = require("../db/models/test");

//GET /tests retrieves all tests
router.get("/", async (req, res, next) => {
  try {
    let tests = await Test.findAll();
    res.send(tests);
  } catch (err) {
    next(err);
  }
});

//GET tests by id
router.get("/:id", async (req, res, next) => {
  try {
    let exam = await Test.findByPk(req.params.id);
    // console.log(exam)
    res.send(exam);
  } catch (error) {
    next(error);
  }
});

//POST  creats a new Test instance /tests/student/:studentId'
router.post("/student/:studentId", async (req, res, next) => {
  try {
    //Find the student with student ID
    let student = await Student.findByPk(req.params.studentId);
    //creating a test.Contents of the test is req.body
    let test = await Test.create(req.body);
    //Set test to specific student
    let studentTest = await test.setStudent(student);

    res.status(201).send(studentTest);
  } catch (err) {
    next(err);
  }
});

//DELETE /tests/:id

router.delete("/:id", async (req, res, next) => {
  try {
    await Test.destroy({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
