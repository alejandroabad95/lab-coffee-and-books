const router = require("express").Router()

const Place = require('./../models/Place.model')


// List places
router.get("/", (req, res, next) => {
    Place
        .find()
        .then(place => {
            // console.log("details: ", responseFromAPI.data)
            res.render("places/list-places", { place });
        })
        .catch(err => console.error(err))
});

// New place form (render)
router.get("/crear", (req, res, next) => res.render("places/new-place"))

// New place form (post)
router.post("/crear", (req, res, next) => {

    const { name, type, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Place
        .create({ name, type, location })
        .then(() => res.redirect('/lugares'))
        .catch(err => console.log(err))
})

router.get('/mapa', (req, res, next) => res.render('places/restaurants-map'))


// Details places

router.get("/:id", (req, res, next) => {

    const { id: place_id } = req.params

    Place
        .findById(place_id)
        .then(place => {
            // console.log("details: ", responseFromAPI.data)
            res.render("places/details-places", { place });
        })
        .catch(err => console.error(err))
});

// Edit places form (render)
router.get("/:id/editar", (req, res, next) => {

    const { id: place_id } = req.params

    Place
        .findById(place_id)
        .then(place => res.render('places/edit-places', { place }))
        .catch(err => console.log(err))
})


// Edit places form (handle)
router.post("/:id/editar", (req, res, next) => {

    const { id: place_id } = req.params
    const { name, type } = req.body

    Place
        .findByIdAndUpdate(place_id, { name, type })
        .then(() => res.redirect('/lugares/:id'))
        .catch(err => console.log(err))
})


router.get('/mapa', (req, res, next) => res.render('places/places-map'))


// Delete places

router.post("/:id/eliminar", (req, res, next) => {

    const { id: place_id } = req.params

    Place
        .findByIdAndDelete(place_id)
        .then(() => res.redirect('/lugares'))
        .catch(err => console.log(err))
})

module.exports = router