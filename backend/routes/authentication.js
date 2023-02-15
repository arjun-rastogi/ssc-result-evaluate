const express= require("express");
const connection = require("../connection");
const router = express.Router();

// 
router.post('/signup', async(req, res, next) => {
    let { name, email, password } = req.body;

    try {
        let hashedPassword = await bcrypt.hash(password, 10);
        let query =' INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)';
         connection.query(query, [name, email, hashedPassword], (err, results) => {
            if(err) {
                console.error(err);
                res.status(500).json({ message : "Unable to sign up." });
            } else {
                res.status(200).json({ message : "User created." });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message : "Unable to sign up." });
    }
});

router.get('/read', (req, res, next) => {
    try {
        let query = 'SELECT * FROM product';
        connection.query(query, (err, results) => {
            if(err){
                console.error(err);
                res.status(500).json({ message: "Unable to fetch products "});
            }
            else {
                res.status(200).json({product: results});
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to fetch products "});
    }
});

router.patch("/update/:id", (req, res, next) => {
    let productId = req.params.id;
    let { name, description, price } = req.body;
    try {
      let query = "UPDATE product SET name = ?, description = ?, price = ? WHERE id = ?";
      connection.query(query, [name, description, price, productId], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Unable to update product" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ message: "Product not found" });
        } else {
          res.status(200).json({ message: "Product updated successfully" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Unable to update product" });
    }
  });


  router.delete("/delete/:id", (req, res, next) => {
    let productId = req.params.id;
    try {
      let query = "DELETE FROM product WHERE id = ?";
      connection.query(query, [productId], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Unable to delete product" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ message: "Product not found" });
        } else {
          res.status(200).json({ message: "Product deleted successfully" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Unable to delete product" });
    }
  });

  



module.exports = router;