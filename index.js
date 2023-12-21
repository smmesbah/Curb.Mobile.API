import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';



//config env
dotenv.config();

//database connection


//rest object
const app = express();
const prisma = new PrismaClient()


//middleware
app.use(cors());
app.use(express.json());



//routes





//test api
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/bookstores', async (req, res) => {
    try {
        const { name, address, link, subscribers } = req.body;
        const bookstore = await prisma.book_stores.create({
            data: {
                name,
                address,
                link,
                subscribers,
            }
        });

        res.json(bookstore);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating book store' });
    }

})
app.get('/bookstores', async (req, res) => {

    try {

        const bookstores = await prisma.book_stores.findMany();

        res.json(bookstores);

    } catch (error) {

        console.error(error);

        res.status(500).json({ error: 'Error fetching book stores' });

    }

});

app.get('/bookstores/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const bookstore = await prisma.book_stores.findUnique({

            where: { id: parseInt(id) },

        });

        if (!bookstore) {

            return res.status(404).json({ error: 'Book store not found' });

        }

        res.json(bookstore);

    } catch (error) {

        console.error(error);

        res.status(500).json({ error: 'Error fetching book store' });

    }

});

app.put('/bookstores/:id', async (req, res) => {

    const { id } = req.params;

    const { name, address, link, subscribers } = req.body;

    try {

        const updatedBookstore = await prisma.book_stores.update({

            where: { id: parseInt(id) },

            data: {

                name,

                address,

                link,

                subscribers,

            },

        });

        res.json(updatedBookstore);

    } catch (error) {

        console.error(error);

        res.status(500).json({ error: 'Error updating book store' });

    }

});

app.delete('/bookstores/:id', async (req, res) => {

    const { id } = req.params;

    try {

        await prisma.book_stores.delete({

            where: { id: parseInt(id) },

        });

        res.json({ message: 'Book store deleted successfully' });

    } catch (error) {

        console.error(error);

        res.status(500).json({ error: 'Error deleting book store' });

    }

});

//PORT
const PORT = process.env.PORT || 5000;


//run listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgGreen.white.bold);
});