import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

// * getLinks

export const getLinks = async (req, res) => {
    try {
        const links = await Link.findAll({where: {uid: req.uid}})
        
        return res.json({links});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: '伺服器錯誤'})
    }
};

// * getLink for CRUD
// ? exists() 可以用?


export const getLinkCRUD = async (req, res) => {
    try {
        const {Id} = req.params
        const link = await Link.findByPk(Id)
        
        if(!link) return res.status(404).json({error: "此連結不存在"})

        if(link.uid!=req.uid) return res.status(404).json({error: "不屬於此使用者"})
        
        return res.json({link});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: '伺服器錯誤'})
    }

}

//* getlink V2

export const getLink = async (req, res) => {
    try {
        const { nanoLink } = req.params
        const link = await Link.findOne({where:{ nanoLink }});
        
        if(!link) return res.status(404).json({error: "此連結不存在"})

        if(link.uid!=req.uid) return res.status(404).json({error: "不屬於此使用者"})
        
        return res.json({longLink: link.longLink});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: '伺服器錯誤'})
    }

}


// * createLink

export const createLink = async (req, res) => {
    try {
        
        let {longLink} = req.body;

        if(!longLink.startsWith('https://')){
            longLink = 'https://' + longLink
            }

        console.log(longLink);


        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid})
        const newlink = await link.save()
        return res.status(201).json({newlink});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: '伺服器錯誤'})
    }
};

// * remove link

export const removeLink = async (req, res) => {
    try {
        const {Id} = req.params
        const link = await Link.findByPk(Id)
        
        
        if(!link) return res.status(404).json({error: "此連結不存在"})

        if(link.uid!=req.uid) return res.status(404).json({error: "不屬於此使用者"})
        
        await link.destroy()

        return res.json({link});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: '伺服器錯誤'})
    }

}

export const updateLink = async (req, res) => {
    try {
        const { Id } = req.params;
        const { longLink } = req.body;

        console.log(longLink);

        if (!longLink.startsWith("https://")) {
            longLink = "https://" + longLink;
        }

        const link = await Link.findByPk(Id);

        if (!link) return res.status(404).json({ error: "連結不存在" });

        if (link.uid!=req.uid)
            return res.status(401).json({ error: "不屬於此使用者" });

        link.longLink = longLink;
        await link.save();

        return res.json({ link });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: '伺服器錯誤'})
    }

}