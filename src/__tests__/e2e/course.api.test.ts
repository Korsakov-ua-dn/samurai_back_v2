import request from "supertest";

import app from "../../app";

import { HTTP_STATUSES } from "../../HTTP_STATUSES";

import type { TCourseViewModel } from "../../models/CourseViewModel";

describe("/coureses", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("Should return 200 and empty array", async () => {
    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  it("Should return 404 for not existing course", async () => {
    await request(app).get("/courses/1").expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it("Should not create course with incorrect data", async () => {
    await request(app)
      .post("/courses")
      .send({ title: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);

    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  let course1: TCourseViewModel;
  it("Should create course with correct data", async () => {
    const response = await request(app)
      .post("/courses")
      .send({ title: "Front" })
      .expect(HTTP_STATUSES.CREATED_201);

    course1 = response.body;

    expect(course1).toEqual({
      id: expect.any(Number),
      title: "Front",
    });

    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, [course1]);
  });

  let course2: TCourseViewModel;
  it("Should create one more course", async () => {
    const response = await request(app)
      .post("/courses")
      .send({ title: "Front-end" })
      .expect(HTTP_STATUSES.CREATED_201);

    course2 = response.body;

    expect(course2).toEqual({
      id: expect.any(Number),
      title: "Front-end",
    });

    await request(app)
      .get("/courses")
      .expect(HTTP_STATUSES.OK_200, [course1, course2]);
  });

  it("Should not delete course with incorrect id", async () => {
    await request(app)
      .delete(`/courses/-100`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);

    await request(app)
      .get("/courses")
      .expect(HTTP_STATUSES.OK_200, [course1, course2]);
  });

  it("Should not update course with incorrect data", async () => {
    await request(app)
      .put(`/courses/${course1.id}`)
      .send({ title: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);

    await request(app)
      .get(`/courses/${course1.id}`)
      .expect(HTTP_STATUSES.OK_200, course1);
  });

  it("Should not update course that not exist", async () => {
    await request(app)
      .put("/courses/-100")
      .send({ title: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
  });

  it("Should update course with correct data", async () => {
    await request(app)
      .put(`/courses/${course1.id}`)
      .send({ title: "Back" })
      .expect(HTTP_STATUSES.OK_200);

    await request(app)
      .get(`/courses/${course1.id}`)
      .expect(HTTP_STATUSES.OK_200, {
        ...course1,
        title: "Back",
      });

    await request(app)
      .get(`/courses/${course2.id}`)
      .expect(HTTP_STATUSES.OK_200, course2);
  });

  it("Should delete both courses", async () => {
    await request(app)
      .delete(`/courses/${course1.id}`)
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    await request(app)
      .delete(`/courses/${course2.id}`)
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });
});
