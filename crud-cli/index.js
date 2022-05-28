const program = require('commander');
const {
    generateApi
} = require('./logic');

program
    .version('0.0.3')
    .description('Route and controller creation system. Generate specific API version (route and controller)')
    .option('-f, --file <name>', 'Model file name');

program
    .command('generate <model> <version>')
    .alias('g')
    .description('model - model name, version - api version')
    .action((model, version) => {
        generateApi({
            model,
            version,
            fileName: program.file
        });
        // console.log(model, version, program.file_name);
    });

program.parse(process.argv);