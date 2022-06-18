const URLMODEl = require('../models/URL_Model')
const { nanoid } = require('nanoid');

const getUrls = async (req, res) => {
    try {
        const urls = await URLMODEl.findAll({ raw: true })
        res.render('home', { urls })
    } catch (error) {

    }
}

const createUrl = async (req, res) => {
    const { origin } = req.body
    const test = new URLMODEl({ origin, shortURL: nanoid(6) })
    try {
        await test.save()
        res.redirect('/')
    } catch (error) {
        res.send('Algo falló.' + `<b>${error.message}</b>`)
    }
}

const deleteUrl = async (req, res) => {
    const { id } = req.params

    try {
        await URLMODEl.destroy({ where: { id } })
        res.redirect('/')
    } catch (error) {
        res.send('Something was wrong' + `<b>${error.message}</b>`)
    }
}

const getToUpdate = async (req, res) => {
    const { id } = req.params

    try {
        const url = await URLMODEl.findAll({ where: { id }, raw: true })
        res.render('home', { url: url[0] })
    } catch (error) {
        res.send('Something was wrong' + `<b>${error.message}</b>`)
    }
}

const updateUrl = async (req, res) => {
    const { id } = req.params
    const { origin } = req.body

    try {
        const url = await URLMODEl.update({ origin }, { where: { id } })
        res.redirect('/')
    } catch (error) {
        res.send('Something was wrong' + `<b>${error.message}</b>`)
    }
}

const redirectTo = async (req, res) => {
    const { shortURL } = req.params

    try {
        const url = await URLMODEl.findOne({where:{ shortURL }})
        res.redirect(url.origin)
    } catch (error) {
        res.send('Something was wrong' + `<b>${error.message}</b>`)
    }
}

module.exports = {
    getUrls,
    createUrl,
    deleteUrl,
    getToUpdate,
    updateUrl,
    redirectTo
} 