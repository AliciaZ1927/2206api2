import {Link} from "../models/Link.js"

export const redirectLink = async (req, res) => {
    try {
    const { nanoLink } = req.params;
    const link = await Link.findOne({where:{ nanoLink }});

    if (!link) return res.status(404).json({ error: "連結不存在" });

    return res.redirect(link.longLink);

    } catch (error) {
        console.log(error);
    }
}