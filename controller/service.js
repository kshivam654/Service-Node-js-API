const chalk = require("chalk");

const Service = require("../models/service");
exports.getCategory = (req, res, next) => {
    const Result = [];
    const Errors = [];
    const major = req.params.major;
    async function go() {
        await Service.findAll({ where: { isMajor: major } })
            .then((result) => {
                const res = chalk.yellow.bold.inverse(JSON.stringify(result));
                Result.push(result);
                res.status(200).json({
                    result: Result,
                    errors: Errors,
                });
            })
            .catch((error) => {
                Errors.push(error);
                res.status(200).json({
                    result: Result,
                    errors: Errors,
                });
            });
    }
    go();
};

exports.postCategory = (req, res, next) => {
    const Result = [];
    const Errors = [];
    const service = req.body.service;
    const major = req.body.isMajor;
    for (var i in service) {
        const name = service[i].name;
        const description = service[i].description;
        console.log(name, description);
        Service.findOrCreate({
            where: {
                name: name,
            },
            defaults: {
                name: name,
                description: description,
                isMajor: major,
            },
        })
            .then((result) => {
                Result.push(result);
                console.log(chalk.yellow.bold.inverse(JSON.stringify(result)));
            })
            .catch((error) => {
                console.log(chalk.yellow.bold.inverse(error));
                Errors.push(error);
                res.status(200).json({
                    errors: error,
                });
            });
        res.status(200).json({
            errors: Errors,
        });
    }
};

exports.deleteCategory = (req, res, next) => {
    const Result = [];
    const Errors = [];
    const ID = req.params.id;
    Service.destroy({ where: { serviceID: ID } })
        .then((result) => {
            Result.push(result);
            res.status(200).json({
                errors: Errors,
            });
        })
        .catch((error) => {
            console.log(chalk.blue.bold.inverse(error));
            Errors.push(error);
            res.status(200).json({
                errors: Errors,
            });
        });
};
