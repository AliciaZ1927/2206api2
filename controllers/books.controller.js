import { book } from '../models/book.js'

export const getbooks = async (req, res) => {
    try {
        const books = await book.findAll()
        res.json(books)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const getbook = async (req, res) =>{
try {
    const { Id } = req.params
    const book = await book.findOne({
        where: {
            Id
        }
    });
    if(!book) 
        return res.status(404).json({message: "book does not exist"});
    
    res.json(book)

} catch (error) {
    return res.status(500).json({message: error.message});
}
};

export const createbook = async (req, res) => {
    const {Name, imgUrl, Description, Price} = req.body
    try {
        const newbook = await book.create({
        Name,
        imgUrl,
        Description,
        Price
    })
    res.json(newbook)
    } catch (error) {
        return res.status(500).json({message: error.message});
        
    }
};

export const updatebook = async (req, res) =>{
    try {
        const {Id} = req.params;
        const {Name, imgUrl, Description, Price} = req.body
    
        const book = await book.findByPk(Id);
        book.Name = Name;
        book.imgUrl = imgUrl;
        book.Description = Description;
        book.Price = Price;
        await book.save();
    
        res.json(book);
    
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const deletebook = async (req, res) =>{
    try {
        const { Id } = req.params;
        await book.destroy({
        where:{
            Id,
        }
    })
        res.sendStatus('204')
    } catch (error) {
        return res.status(500).json({message: error.message});
        
    }
};

