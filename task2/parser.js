const fs = require('fs');
 
function makeUserStruct(names) {
    var names = names.split(' ');
    var count = names.length;
    function constructor() {
        for (var i = 0; i < count; i++) {
        this[names[i]] = arguments[i];
        }
     }
    return constructor;
  }

  function main() {

    const User = makeUserStruct("requests hours total_sum data");
    let user_names = [];
    let users = new Map();

    const data = fs.readFileSync(__dirname + '/test.txt',
            {encoding:'utf8', flag:'r'});
    const lines = data.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
        let info = lines[i].split(" ");
        let  [ name, reqs, hours, sum, data ] = [ info[0], parseInt(info[1]), parseInt(info[2]), parseInt(info[1])*parseInt(info[2]), info[3]];
        if(user_names.indexOf(name) === -1) {
            let user = new User(reqs, hours,  sum, data);
            user_names.push(name);
            users.set(name,user);
        } else {
            let user_info = users.get(name);
            user_info.requests += reqs;
            user_info.hours += hours;
            user_info.total_sum += reqs*hours;
            users.set(name,user_info);
        }
    }
    user_names.sort();
    const message = fs.createWriteStream(__dirname + "/res.txt");

    for ( let i = 0; i < user_names.length; i++) {
        let user = users.get(user_names[i]);
        message.write(`${user_names[i]} ${user.requests} ${user.hours} ${user.total_sum} ${user.data}\n`);
    }
    message.close();   
  }

  main();
  