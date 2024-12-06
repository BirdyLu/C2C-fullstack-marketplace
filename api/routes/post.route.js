import express from 'express';

const router = express.Router();

router.get("/test", (req, res) => {
    console.log("post router works."); 
    res.send("post router page");
});
router.post("/test", (req, res) => {
    console.log("post router works."); 
    res.send("post router page");
});
router.put("/test", (req, res) => { //put for updating a post
    console.log("post router works."); 
    res.send("post router page");
});
router.delete("/test", (req, res) => {
    console.log("post router works."); 
    res.send("post router page");
});

export default router;