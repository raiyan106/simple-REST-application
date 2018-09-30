const bcrypt = require('bcryptjs');

async function show(){

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash('1234',salt);
    console.log(salt);
    console.log(hashedPass);

}

show();

