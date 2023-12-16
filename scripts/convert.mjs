import fs from 'fs';

function convertFirstCharToUpperCase(file) {
    let content = fs.readFileSync(file);

    content = content.toString();
    content = content.replace(/(\n\s{4,}[a-z])/g, (match, p1) => {
        return p1.toUpperCase();
    });

    fs.writeFileSync(file, content);
}

convertFirstCharToUpperCase('./src/api/alibaba/typings/alidns.d.ts');
convertFirstCharToUpperCase('./src/api/alibaba/typings/ecs.d.ts');
convertFirstCharToUpperCase('./src/api/alibaba/typings/swas.d.ts');
