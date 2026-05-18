/* ====================== 
GET ALL PRODUCTS 
====================== 
app.get('/products', async (req, res) => { 
    try { 
        const [rows] = await db.query('SELECT * FROM products'); 
        res.json(rows); 
    } catch (err) { 
        res.status(500).json(err); 
    } 
}); 
/* ====================== 
GET SINGLE PRODUCT 
======================  
app.get('/products/:id', async (req, res) => { 
    try { 
        const [rows] = await db.query( 
            'SELECT * FROM products WHERE id = ?', 
            [req.params.id] 
        ); 
        if (rows.length === 0) { 
            return res.status(404).json({ message: 'Product not found' }); 
        } 
        res.json(rows[0]); 
    } catch (err) { 
        res.status(500).json(err); 
    } 
}); 
/* ====================== 
CREATE PRODUCT 
====================== 
app.post('/products', async (req, res) => { 
    try { 
        const { category, name, description, price, stock_quantity, image_url } = req.body; 
        const [result] = await db.query( 
            'INSERT INTO products (category, name, description, price, stock_quantity, image_url) VALUES (?, ?, ?, ?, ?, ?)', 
            [category, name, description, price, stock_quantity, image_url] 
        ); 
        const newProduct = { 
            id: result.insertId, 
            category, 
            name, 
            description, 
            price, 
            stock_quantity, 
            image_url 
        }; 
        res.status(201).json(newProduct); 
    } catch (err) { 
        res.status(500).json(err); 
    } 
}); 
/* ====================== 
UPDATE PRODUCT 
======================  
app.put('/products/:id', async (req, res) => { 
    try { 
        const { category, name, description, price, stock_quantity, image_url } = req.body; 
        const [result] = await db.query( 
            'UPDATE products SET category = ?, name = ?, description = ?, price = ?, stock_quantity = ?, image_url = ? WHERE id = ?', 
            [category, name, description, price, stock_quantity, image_url, req.params.id] 
        ); 
        if (result.affectedRows === 0) { 
            return res.status(404).json({ message: 'Product not found' }); 
        } 
        const updatedProduct = { 
            id: req.params.id, 
            category, 
            name, 
            description, 
            price, 
            stock_quantity, 
            image_url 
        }; 
        res.json({ product: updatedProduct }); 
    } catch (err) { 
        res.status(500).json(err); 
    } 
}); 
/* ====================== 
DELETE PRODUCT 
====================== 
app.delete('/products/:id', async (req, res) => { 
    try { 
        const [deletedRows] = await db.query( 
            'SELECT * FROM products WHERE id = ?', 
            [req.params.id] 
        ); 
        const [result] = await db.query( 
            'DELETE FROM products WHERE id = ?', 
            [req.params.id] 
        ); 
        if (result.affectedRows === 0) { 
            return res.status(404).json({ message: 'Product not found' }); 
        } 
        res.json({ message: 'Product deleted', product: deletedRows[0] }); 
    } catch (err) { 
        res.status(500).json(err); 
    } 
});
*/