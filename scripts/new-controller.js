const fs = require('fs-extra');
const path = require('path');
const args = process.argv.slice(2);
// Names could be: controller my-controller
const newControllerInputName = args[0];

// Copy the template folder
const newFolderOutput = 'src/' + newControllerInputName;
fs.copySync('scripts/controller-template', newFolderOutput);

// Replace the content with the new names
const controllerFileName = newControllerInputName + '.controller.ts';
const routeFileName = newControllerInputName + '.route.ts';

function main() {
  // Object/Classes names
  const serviceClassName = `${firstLetterUpperCase(newControllerInputName)}Service`;
  const serviceFileNameNoTs = newControllerInputName + '.service';
  const controllerClassName = `${firstLetterUpperCase(newControllerInputName)}Controller`;
  const controllerFileNameNoTs = `${newControllerInputName}.controller`;
  const routeClassName = `${firstLetterUpperCase(newControllerInputName)}Route`;
  const routeFileNameNoTs = `${newControllerInputName}.route`;

  // Controller
  let controllerFileContent = fs.readFileSync(path.join(newFolderOutput, 'test.controller.ts'), 'utf-8');

  controllerFileContent = controllerFileContent.replace(
    `import TestService from './test.service';`,
    `import ${serviceClassName} from './${serviceFileNameNoTs}';`,
  );
  controllerFileContent = controllerFileContent.replace(`class TestController`, `class ${controllerClassName}`);
  controllerFileContent = controllerFileContent.replace(
    `public testService = new TestService();`,
    `public ${newControllerInputName}Service = new ${serviceClassName}();`,
  );
  controllerFileContent = controllerFileContent.replace(`export default TestController;`, `export default ${controllerClassName};`);
  controllerFileContent = controllerFileContent.replace(`public test = async (`, `public ${newControllerInputName} = async (`);

  fs.writeFileSync(path.join(newFolderOutput, 'test.controller.ts'), controllerFileContent);

  // Service
  let serviceContent = fs.readFileSync(path.join(newFolderOutput, 'test.service.ts'), 'utf-8');

  serviceContent = serviceContent.replace(`class TestService {`, `class ${serviceClassName} {`);
  serviceContent = serviceContent.replace(`export default TestService;`, `export default ${serviceClassName}`);

  fs.writeFileSync(path.join(newFolderOutput, 'test.service.ts'), serviceContent);

  // Route
  let routeContent = fs.readFileSync(path.join(newFolderOutput, 'test.route.ts'), 'utf-8');

  routeContent = routeContent.replace(
    `import TestController from './test.controller';`,
    `import ${controllerClassName} from './${controllerFileNameNoTs}';`,
  );
  routeContent = routeContent.replace(`class TestRoute implements Routes`, `class ${routeClassName} implements Routes`);
  routeContent = routeContent.replace(
    `public testController = new TestController();`,
    `public ${newControllerInputName}Controller = new ${controllerClassName}();`,
  );
  routeContent = routeContent.replace(`export default TestRoute;`, `export default ${routeClassName};`);
  routeContent = routeContent.replace(
    `this.router.get('/test', this.testController.test);`,
    `this.router.get('/${newControllerInputName}', this.${newControllerInputName}Controller.${newControllerInputName});`,
  );

  fs.writeFileSync(path.join(newFolderOutput, 'test.route.ts'), routeContent);

  // Replace file locations
  fs.moveSync(path.join(newFolderOutput, 'test.route.ts'), path.join(newFolderOutput, `${newControllerInputName}.route.ts`));
  fs.moveSync(path.join(newFolderOutput, 'test.controller.ts'), path.join(newFolderOutput, `${newControllerInputName}.controller.ts`));
  fs.moveSync(path.join(newFolderOutput, 'test.service.ts'), path.join(newFolderOutput, `${newControllerInputName}.service.ts`));
}

// Utils
function firstLetterUpperCase(strToUppercase) {
  return strToUppercase[0].toUpperCase() + strToUppercase.substr(1);
}

// Init
main();
