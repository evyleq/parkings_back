const mustache = require('mustache');
const pluralize = require('pluralize');
const fs = require('fs');
const path = require('path');

const routeTemplate = fs.readFileSync(path.join(__dirname, 'templates/route.tpl')).toString();
const controllerTemplate = fs.readFileSync(path.join(__dirname, 'templates/controller.tpl')).toString();
const apiTemplate = fs.readFileSync(path.join(__dirname, 'templates/api.tpl')).toString();

// let fileName;

let modelFileName;

function toLower(v) {
    return v.toLowerCase();
}

function toPlural(v){
    return pluralize(v);
}

function writeFile(url, data){
    fs.writeFileSync(path.resolve(__dirname, url), data, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function createRoute(model, version) {
    console.log('generate new route (version: ' + version + '; name: ' + model + ')...');

    let route = mustache.render(routeTemplate, {
        name: fileName,
        version: version
    });
    let url = '../routes/' + version + '/' + fileName + '.js';

    writeFile(url, route);

    console.log('route generated successfully');
}

function createController(model, version) {
    console.log('generate new controller (version: ' + version + '; name: ' + model + ')...');

    let controller = mustache.render(controllerTemplate, {
        model: model,
        modelFile: modelFileName
    });
    let url = '../controllers/' + version + '/' + fileName + '.js';

    writeFile(url, controller);

    console.log('controller generated successfully');
}

function createApiLink(version){
    let url = '../api/api_' + version + '.js';
    let apiFile = fs.readFileSync(path.resolve(__dirname, url)).toString();

    let api = mustache.render(apiTemplate, {
        version: version,
        fileName: fileName
    });

    apiFile = apiFile.substr(0, apiFile.length-2) + api + apiFile.substr(apiFile.length-3);
    // console.log(api);
    writeFile(url, apiFile);
    // console.log(apiFile);
}

const generateApi = (api) => {
    if(api.fileName) {
        modelFileName = api.fileName;
        fileName = toLower(toPlural(modelFileName));
    } else {
        modelFileName = toLower(api.model);
        fileName = toLower(toPlural(api.model));
    }

    createController(api.model, api.version);
    createRoute(api.model, api.version);

    createApiLink(api.version);
};

module.exports = {
    generateApi
};