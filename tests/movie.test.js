import app from "../app";
import supertest from "supertest";

test('should include correct movie title and http status 200', async () => { 
    const res = await supertest(app).get("/movies/1").expect(200);
    expect((res.text.includes("Isle Of Dogs")));
});

test('should return http status 404 for invalid movie ID', async () => { 
    const res = await supertest(app).get("/movies/10000000").expect(404);
 })